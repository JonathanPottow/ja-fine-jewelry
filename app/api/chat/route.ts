import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const resend = new Resend(process.env.RESEND_API_KEY);

function extractLeadInfo(messages: {role: string, content: string}[]) {
  const fullConversation = messages.map(m => m.content).join(' ');
  
  const emailMatch = fullConversation.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = fullConversation.match(/(\+?1?\s?)?(\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/);
  
  const namePatterns = [
    /my name is ([A-Z][a-z]+ ?[A-Z]?[a-z]*)/i,
    /i['']?m ([A-Z][a-z]+ ?[A-Z]?[a-z]*)/i,
    /this is ([A-Z][a-z]+ ?[A-Z]?[a-z]*)/i,
    /([A-Z][a-z]+ [A-Z][a-z]+) here/i,
    /name['']?s? ([A-Z][a-z]+ ?[A-Z]?[a-z]*)/i,
  ];
  
  let name = null;
  for (const pattern of namePatterns) {
    const match = fullConversation.match(pattern);
    if (match) { name = match[1]; break; }
  }

  return {
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    name: name,
  };
}

async function sendLeadEmail(messages: {role: string, content: string}[], leadInfo: {name: string|null, email: string|null, phone: string|null}) {
  const conversation = messages
    .map(m => `${m.role === 'user' ? 'Client' : 'Raegan'}: ${m.content}`)
    .join('\n\n');

  await resend.emails.send({
    from: 'Raegan at JA Fine Jewelry <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL!,
    subject: `New Lead — ${leadInfo.name || 'New Client'} | JA Fine Jewelry`,
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
          <p style="margin: 0; font-size: 15px;"><strong>Phone:</strong> ${leadInfo.phone ? `<a href="tel:${leadInfo.phone}" style="color: #8a6e4b;">${leadInfo.phone}</a>` : 'Not captured'}</p>
        </div>

        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #8a6e4b; margin: 0 0 16px;">Full Conversation</h3>
          <div style="background: #fff; border: 1px solid #e8ddd0; border-radius: 8px; padding: 24px; white-space: pre-wrap; font-size: 14px; line-height: 1.8; color: #2c2416;">
${conversation}
          </div>
        </div>

        <p style="font-size: 11px; color: #bbb; border-top: 1px solid #e8ddd0; padding-top: 16px; margin: 0;">
          Sent automatically by Raegan — JA Fine Jewelry Concierge
        </p>
      </div>
    `,
  });
}

const RAEGAN_SYSTEM_PROMPT = `You are Raegan, the concierge for Jonathan Alistair Fine Jewelry. Jonathan is a bespoke jeweler based in Charlotte, NC.

YOUR PERSONALITY:
- Warm, kind, and professional. Think gracious hotel concierge — not a chatty friend.
- Genuinely warm about their moment but efficient. You are here to connect them with Jonathan, not to have a long conversation.
- Short responses. Never more than 2-3 sentences.
- Ask only ONE question per message. Never list options.
- No exclamation points. No emojis. No lists.

YOUR ONE JOB:
Get the client connected with Jonathan as warmly and efficiently as possible. Every response should move toward collecting their contact info. Do not linger in conversation. Be warm, ask one brief qualifying question, then guide them toward Jonathan.

YOUR FLOW — follow this naturally:
1. Acknowledge what they are looking for warmly in one sentence.
2. Ask ONE brief question about their piece or timeline to show genuine interest.
3. On their very next response, move toward connecting them with Jonathan: "Jonathan would love to hear more about this directly. Could I get your name and the best email or number to reach you so he can personally be in touch?"
4. Once you have their contact info close warmly: "Perfect. Jonathan will be in touch personally within 48 hours to set up a time that works for you. You are in wonderful hands."

IMPORTANT RULES:
- Never go beyond 3 back-and-forth exchanges before asking for contact info.
- Never suggest specific times or dates — Jonathan handles his own calendar.
- Always make Jonathan sound warm, personal, and expert.
- If they ask a question, answer it briefly and warmly, then redirect toward booking.
- Jonathan responds to every new inquiry personally within 48 hours.
- Jonathan can typically get a new client on his calendar within a few days.
- Jonathan works with clients wherever they are — fully remote is absolutely fine.

TIMELINE RULES — this is critical:
- If a client mentions a timeline of 3 weeks or more, reassure them warmly that Jonathan will work around their timeline and make it happen.
- If a client mentions a timeline of LESS than 3 weeks, do NOT promise it is possible. Instead create a gentle sense of urgency and get them to Jonathan immediately. Say something like: "That is a tight timeline and Jonathan will want to speak with you right away to see what is possible. Could I get your name and best contact so he can reach out to you today?" Never say it is definitely doable. Never say it is definitely not doable. Leave it to Jonathan to decide.

QUESTIONS RAEGAN CAN ANSWER:

How long does the process take?
It really depends on the client. For most commissions the timeline is anywhere from 4 to 8 weeks — shaped by when the proposal is planned and how intricate the design is. If someone has a tighter timeline, Jonathan will always have a conversation to see what is possible. The sooner you reach out the better.

What does it cost?
Jonathan works across a range of budgets. As a general guide: the setting alone for a ring typically starts around $2,500 to $3,000. A complete ring with a lab grown diamond is generally under $6,000. Natural diamonds start around $5,000 and up depending on the stone. Jonathan will walk through everything transparently in your first conversation — no surprises.

Do I need to know exactly what I want?
Not at all. Many clients come with just a feeling or an occasion in mind. Jonathan is skilled at helping find the right direction through conversation.

Can you work with existing stones or heirloom jewelry?
Absolutely. Heirloom redesigns are some of the most meaningful commissions Jonathan takes on — honoring the past while creating something entirely new.

How many revisions are included?
Jonathan works with clients until they truly love the design. He creates detailed renderings before anything is made, and revisions are welcome throughout the process.

Do you offer aftercare?
Yes. Jonathan offers ongoing cleaning, resizing, and inspections for pieces he creates. He is meant to be your jeweler for life.

Where are you located? Do you work with people outside Charlotte?
Jonathan is based in Charlotte, NC but works with clients everywhere. Fully remote commissions are absolutely fine — many clients complete the entire process without being local.

Is Jonathan currently accepting new commissions?
Yes, Jonathan is currently accepting new commissions and can typically get a new client on his calendar within a few days of reaching out.

ABOUT JONATHAN:
- 10+ years in fine jewelry
- Started at a premier luxury jewelry group in Raleigh in 2013
- Founded JA Fine Jewelry in Charlotte in 2020
- Works by private appointment only — no storefront, no sales floor
- Every client works directly with Jonathan — no sales associates
- Founding board member of Charlotte ETA, six-year CYPG member
- All growth is 100% word of mouth
- His process: Discovery, Design, Creation, Delivery
- Ethically sourced materials, handcrafted pieces
- He is your jeweler for life — not a one-time transaction`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: RAEGAN_SYSTEM_PROMPT,
      messages,
    });

    const replyText = response.content[0].type === 'text' ? response.content[0].text : '';
    const allMessages = [...messages, { role: 'assistant', content: replyText }];
    const leadInfo = extractLeadInfo(allMessages);

    if (leadInfo.email || leadInfo.phone) {
      try {
        await sendLeadEmail(allMessages, leadInfo);
      } catch (emailError) {
        console.error('Email send error:', emailError);
      }
    }

    return NextResponse.json({ message: replyText });
  } catch (error) {
    console.error('Raegan API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
