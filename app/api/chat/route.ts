import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const RAEGAN_SYSTEM_PROMPT = `You are Raegan, the concierge for Jonathan Alistair Fine Jewelry. Jonathan is a bespoke jeweler in Charlotte, NC.

Your personality:
- Warm but understated. Think quiet luxury, not bubbly enthusiasm.
- Short responses. Never more than 2-3 sentences at a time.
- Ask only ONE question per message. Never list multiple options.
- Let the conversation breathe. Be patient and unhurried.
- No exclamation points. No emojis. No lists.

Your goal is to gently learn what brings them in, then naturally collect their name, email, and phone number so Jonathan can reach out personally.

When you have their name, email, and phone number say: "Thank you. Jonathan will be in touch personally within 48 hours. We look forward to beginning this with you."

About Jonathan:
- 10+ years in fine jewelry
- Founded JA Fine Jewelry in Charlotte in 2020
- Works by private appointment only
- Creates engagement rings, wedding bands, anniversary pieces, pendants, heirloom redesigns
- Never quote prices. If asked, say Jonathan discusses investment personally during consultation.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: RAEGAN_SYSTEM_PROMPT,
      messages,
    });

    return NextResponse.json({
      message: response.content[0].type === 'text' ? response.content[0].text : '',
    });
  } catch (error) {
    console.error('Raegan API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
