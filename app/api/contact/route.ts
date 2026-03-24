import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const rawData = formData.get('data')
    const { name, email, phone, piece, story, timeline } = JSON.parse(rawData as string)

    // Split name into first/last
    const nameParts = (name || '').trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Handle uploaded files — convert to base64 URLs for the note
    const files = formData.getAll('files') as File[]
    const fileNames = files.map(f => f.name).filter(Boolean)

    // Build note content
    const noteLines = [
      `INQUIRY FROM WEBSITE`,
      `---`,
      piece ? `Piece: ${piece}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      story ? `\nClient's Story:\n${story}` : null,
      fileNames.length > 0 ? `\nAttachments submitted: ${fileNames.join(', ')}` : null,
    ].filter(Boolean).join('\n')

    // Create contact in Wix CRM
    const contactRes = await fetch('https://www.wixapis.com/contacts/v4/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WIX_API_KEY}`,
        'wix-site-id': process.env.WIX_SITE_ID || '',
      },
      body: JSON.stringify({
        allowDuplicates: false,
        info: {
          name: { first: firstName, last: lastName },
          emails: { items: [{ tag: 'MAIN', email }] },
          ...(phone ? { phones: { items: [{ tag: 'MOBILE', phone }] } } : {}),
          extendedFields: {
            items: {
              'custom.inquiryType': piece || 'General Inquiry',
              'custom.inquiryMessage': story || '',
              'custom.timeline': timeline || '',
              'custom.source': 'Website Contact Form',
            }
          },
          labelKeys: { items: ['custom.website-inquiry'] }
        }
      })
    })

    const contactData = await contactRes.json()
    const contactId = contactData?.contact?.id

    // Add note with full inquiry + file names
    if (contactId) {
      await fetch('https://www.wixapis.com/crm/notes/v2/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.WIX_API_KEY}`,
          'wix-site-id': process.env.WIX_SITE_ID || '',
        },
        body: JSON.stringify({
          note: { contactId, content: noteLines }
        })
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ success: true })
  }
}
