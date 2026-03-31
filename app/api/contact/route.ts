import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const data = JSON.parse(formData.get('data') as string)
    const { name, email, phone, message } = data
    const nameParts = (name || '').trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': process.env.WIX_API_KEY!,
      'wix-site-id': '35200a65-a6be-48d2-82dd-36f6a34d1923',
    }

    // Step 1: Create the contact
    const contactRes = await fetch('https://www.wixapis.com/contacts/v4/contacts', {
      method: 'POST',
      headers,
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
        headers,
        body: JSON.stringify({
          info: { content: `Commission Inquiry:\n\n${message}` }
        })
      })
    }

    // Step 3: Send notification email to Jonathan
    await fetch('https://www.wixapis.com/email-marketing/v1/send-email', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        plainText: `New commission inquiry from ${name}\n\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message || 'No message provided'}`,
        subject: `New Commission Inquiry — ${name}`,
        recipients: { contacts: [contactId] }
      })
    }).catch(() => {}) // Don't fail if notification fails

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
