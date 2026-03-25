import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const formData = await req.formData()
    const data = JSON.parse(formData.get('data') as string)
    const { name, email, phone, piece, story, timeline } = data

    await resend.emails.send({
      from: 'Jonathan Alistair Website <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `New Commission Inquiry — ${piece || 'General'} from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #2c2416;">
          <h1 style="font-size: 28px; font-weight: 400; margin-bottom: 8px;">New Commission Inquiry</h1>
          <p style="color: #8a6e4b; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 40px;">Jonathan Alistair Fine Jewelry</p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e8ddd0;">
              <td style="padding: 16px 0; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8a6e4b; width: 140px;">Name</td>
              <td style="padding: 16px 0; font-size: 16px;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e8ddd0;">
              <td style="padding: 16px 0; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8a6e4b;">Email</td>
              <td style="padding: 16px 0; font-size: 16px;"><a href="mailto:${email}" style="color: #8a6e4b;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e8ddd0;">
              <td style="padding: 16px 0; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8a6e4b;">Phone</td>
              <td style="padding: 16px 0; font-size: 16px;">${phone || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e8ddd0;">
              <td style="padding: 16px 0; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8a6e4b;">Piece Type</td>
              <td style="padding: 16px 0; font-size: 16px;">${piece || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e8ddd0;">
              <td style="padding: 16px 0; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8a6e4b;">Timeline</td>
              <td style="padding: 16px 0; font-size: 16px;">${timeline || '—'}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding: 24px; background: #f7f2eb; border-left: 3px solid #8a6e4b;">
            <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8a6e4b; margin-bottom: 12px;">Their Story</p>
            <p style="font-size: 16px; line-height: 1.8; margin: 0;">${story || '—'}</p>
          </div>

          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e8ddd0; text-align: center;">
            <a href="mailto:${email}" style="display: inline-block; background: #2c2416; color: #f7f2eb; padding: 14px 32px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none;">Reply to ${name}</a>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
