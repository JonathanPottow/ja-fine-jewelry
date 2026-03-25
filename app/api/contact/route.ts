import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const data = JSON.parse(formData.get('data') as string)
    const { name, email, phone, piece, story, timeline } = data

    const nameParts = (name || '').trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    const response = await fetch('https://www.wixapis.com/contacts/v4/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.WIX_API_KEY!,
        'wix-site-id': 'a88b9a01-4d81-43a0-8a35-69be29ae56ea',
      },
      body: JSON.stringify({
        info: {
          name: { first: firstName, last: lastName },
          emails: { items: [{ tag: 'MAIN', email }] },
          phones: phone ? { items: [{ tag: 'MOBILE', phone }] } : undefined,
          extendedFields: {
            items: {
              'custom.piece-type': piece || '',
              'custom.timeline': timeline || '',
              'custom.story': story || '',
            }
          }
        },
        allowDuplicates: true
      })
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Wix API error:', JSON.stringify(result))
      return NextResponse.json({ error: 'Failed to create contact', details: result }, { status: 500 })
    }

    return NextResponse.json({ success: true, contactId: result.contact?.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
