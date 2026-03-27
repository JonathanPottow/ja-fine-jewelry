import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function extractLeadInfo(messages: {role: string, content: string}[]) {
  const fullConversation = messages.map(m => m.content).join(' ');
  const emailMatch = fullConversation.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/i);
  const phoneMatch = fullConversation.match(/(\+?1?\s?)?(\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/);
  const namePatterns = [
    /my name is ([a-zA-Z]+ ?[a-zA-Z]*)/i,
    /i['']?m ([A-Z][a-z]+ ?[A-Z]?[a-z]*)/i,
    /this is ([A-Z][a-z]+ ?[A-Z]?[a-z]*)/i,
    /([A-Z][a-z]+ [A-Z][a-z]+) here/i,
    /name['']?s? ([a-zA-Z]+ ?[a-zA-Z]*)/i,
  ];
  let name = null;
  for (const pattern of namePatterns) {
    const match = fullConversation.match(pattern);
    if (match) { name = match[1]; break; }
  }
  return {
    email: emailMatch ? emailMatch[0].toLowerCase() : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    name: name,
  };
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const leadInfo = extractLeadInfo(messages);

    if (!leadInfo.email && !leadInfo.phone) {
      return NextResponse.json({ skipped: true, reason: 'No contact info found' });
    }

    const conversation = messages
      .map((m: {role: string, content: string}) => `${m.role === 'user' ? 'Client' : 'Raegan'}: ${m.content}`)
      .join('\n\n');

    await resend.emails.send({
      from: 'Raegan at Jonathan Alistair Fine Jewelry <onboarding@resend.dev>',
      to: 'jonathan@jafinejewelry.com',
      subject: `New Lead — ${leadInfo.name || 'New Client'} | Jonathan Alistair Fine Jewelry`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #2c2416;">
          <div style="border-bottom: 2px solid #8a6e4b; padding-bottom: 20px; margin-bottom: 32px;">
            <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8a6e4b; margin: 0 0 8px;">Jonathan Alistair Fine Jewelry</p>
            <h2 style="font-size: 24px; font-weight: normal; margin: 0;">New Lead from Raegan</h2>
          </div>
          <div style="background: #f7f2eb; padding: 24px; border-radius: 8px; margin-bottom: 32px;">
            <h3 style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #8a6e4b; margin: 0 0 16px;">Client Details</h3>
            <p style="margin: 0 0 8px; font-size: 15px;"><strong>Name:</strong> ${leadInfo.name || 'Not captured'}</p>
            <p style="margin: 0 0 8px; font-size: 15px;"><strong>Email:</strong> ${leadInfo.email ? `<a href="mailto:${leadInfo.email}" style="color: #8a6e4b;">${leadInfo.email}</a>` : 'Not captured'}</p>
            <p style="margin: 0; font-size: 15px;"><strong>Phone:</strong> ${leadInfo.phone || 'Not captured'}</p>
          </div>
          <div style="margin-bottom: 32px;">
            <h3 style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #8a6e4b; margin: 0 0 16px;">Full Conversation</h3>
            <div style="background: #fff; border: 1px solid #e8ddd0; border-radius: 8px; padding: 24px; white-space: pre-wrap; font-size: 14px; line-height: 1.8; color: #2c2416;">
${conversation}
            </div>
          </div>
          <p style="font-size: 11px; color: #bbb; border-top: 1px solid #e8ddd0; padding-top: 16px; margin: 0;">
            Sent automatically by Raegan — Jonathan Alistair Fine Jewelry Concierge
          </p>
        </div>
      `,
    });

    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error('Send lead error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
