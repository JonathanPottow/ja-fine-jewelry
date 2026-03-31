import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const data = JSON.parse(formData.get('data') as string)
    const { name, email, phone, message } = data
    const nameParts = (name || '').trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    const wixHeaders = {
      'Content-Type': 'application/json',
      'Authorization': process.env.WIX_API_KEY!,
      'wix-site-id': '35200a65-a6be-48d2-82dd-36f6a34d1923',
    }

    // Step 1: Create contact in Wix CRM
    const contactRes = await fetch('https://www.wixapis.com/contacts/v4/contacts', {
      method: 'POST',
      headers: wixHeaders,
      body: JSON.stringify({
        info: {
          name: { first: firstName, last: lastName },
          emails: { items: [{ tag: 'MAIN', email }] },
          phones: phone ? { items: [{ tag: 'MOBILE', phone }] } : undefined,
        },
        allowDuplicates: true
      })
    })

    const contactResult = await contactRes.json()
    if (!contactRes.ok) {
      console.error('Wix contact error:', JSON.stringify(contactResult))
      return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
    }

    const contactId = contactResult?.contact?.id

    // Step 2: Add message as a note on the contact
    if (contactId && message) {
      await fetch(`https://www.wixapis.com/contacts/v4/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: wixHeaders,
        body: JSON.stringify({
          info: { content: `Commission Inquiry:\n\n${message}` }
        })
      }).catch(() => {})
    }

    // Step 3: Send notification email to Jonathan via Resend
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Jonathan Alistair Fine Jewelry <onboarding@resend.dev>',
        to: 'jonathan@jafinejewelry.com',
        subject: `New Commission Inquiry — ${name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #0f2240;">
            <h2 style="font-size: 24px; font-weight: 400; margin-bottom: 8px;">New Commission Inquiry</h2>
            <hr style="border: none; border-top: 1px solid #c8a84b; margin-bottom: 24px;" />
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p style="margin-top: 24px;"><strong>Message:</strong></p>
            <p style="background: #f5f0e8; padding: 16px; border-left: 3px solid #c8a84b; line-height: 1.7;">${message || 'No message provided'}</p>
            <hr style="border: none; border-top: 1px solid #e8e0d0; margin-top: 32px;" />
            <p style="font-size: 12px; color: #888;">Jonathan Alistair Fine Jewelry &mdash; jafinejewelry.com</p>
          </div>
        `
      })
    }).catch(() => {})

    // Step 4: Send branded confirmation email to client via Resend
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Jonathan Alistair Fine Jewelry <onboarding@resend.dev>',
        to: email,
        reply_to: 'jonathan@jafinejewelry.com',
        subject: `Thank you, ${firstName} — Jonathan will be in touch shortly.`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #0f2240; background: #f5f0e8;">
            <div style="text-align: center; padding-bottom: 32px; border-bottom: 1px solid #c8a84b;">
              <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #c8a84b; margin: 0 0 8px;">Jonathan Alistair Fine Jewelry</p>
              <h1 style="font-size: 32px; font-weight: 400; margin: 0; color: #0f2240;">Your jeweler. <em>For life.</em></h1>
            </div>
            <div style="padding: 40px 0;">
              <p style="font-size: 18px; font-weight: 400; margin-bottom: 16px;">Thank you, ${firstName}.</p>
              <p style="line-height: 1.8; color: #1e3a5f;">Jonathan has received your inquiry and will be in touch personally within 48 hours to begin your conversation.</p>
              <p style="line-height: 1.8; color: #1e3a5f;">Every piece begins with a conversation — and yours has just started.</p>
            </div>
            <div style="text-align: center; padding-top: 32px; border-top: 1px solid #c8a84b;">
              <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #c8a84b; margin: 0 0 8px;">Charlotte, North Carolina</p>
              <p style="font-size: 11px; color: #888; margin: 0;">
                <a href="https://www.jafinejewelry.com" style="color: #c8a84b; text-decoration: none;">jafinejewelry.com</a>
              </p>
            </div>
          </div>
        `
      })
    }).catch(() => {})

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
