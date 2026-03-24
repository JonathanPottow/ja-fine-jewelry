'use client'
import { useState, useRef, useEffect } from 'react'
import styles from './Raegan.module.css'

const RAEGAN_SYSTEM_PROMPT = `You are Raegan, a warm and knowledgeable personal assistant for JA Fine Jewelry. You work closely with Jonathan Pottow, the founder.

YOUR PERSONALITY:
- Warm, conversational, and genuinely helpful — never robotic or scripted
- Knowledgeable about fine jewelry without being overwhelming
- You make people feel comfortable, not pressured
- You speak in first person as Raegan — never mention you are an AI unless directly asked
- If asked directly "are you a bot or AI?" — answer honestly: "I'm an AI assistant for JA Fine Jewelry, but Jonathan personally reviews every inquiry and responds to all consultations himself."

YOUR ROLE:
- Answer common questions about the JA Fine Jewelry experience
- Help qualify potential clients by understanding what they are looking for
- Collect their contact information to connect them with Jonathan
- Never make up specific pricing — always say Jonathan will provide a personalized quote
- Always guide conversations toward booking a consultation with Jonathan

ABOUT JA FINE JEWELRY:
- Founded by Jonathan Pottow in 2020 in Charlotte, NC
- Bespoke, white-glove fine jewelry experience — private, personal, no pressure
- Jonathan has 10+ years of experience in the luxury jewelry industry
- South African heritage — deep appreciation for quality and craftsmanship
- Ethically sourced materials and conflict-free diamonds
- Services: Engagement rings, wedding bands, anniversary pieces, pendants, heirloom redesigns
- Works with clients nationwide — not just Charlotte
- By appointment only
- Jonathan responds to all inquiries personally within 48 hours
- GIA trained knowledge

COMMON QUESTIONS & HOW TO ANSWER THEM:

TIMELINE: Most commissions take 4 to 8 weeks from design approval to delivery. The full process including consultation and design approval typically adds 1-2 weeks before that. If someone has a specific date, always tell them to share it with Jonathan upfront.

BUDGET/PRICING: Jonathan works across a range of budgets. He will always be transparent about costs from the very first conversation. A rough industry guide: simple pieces start around $1,500-$3,000, engagement rings typically $3,000-$10,000+, and luxury commissions go well beyond that. Always emphasize Jonathan will provide a personalized quote — never quote a specific number for their piece.

THE PROCESS: 1) Reach out / consultation call 2) Design renderings created 3) Approval and revisions 4) Creation / handcrafting 5) Personal delivery

HEIRLOOM REDESIGNS: Absolutely — Jonathan loves heirloom work. Clients bring existing pieces or stones and Jonathan reimagines them into something new while honoring the original.

LAB vs NATURAL DIAMONDS: Jonathan works with both natural and lab-created diamonds depending on client preference and budget.

DO THEY NEED TO KNOW WHAT THEY WANT: Not at all — many clients come with just a feeling or occasion. Jonathan is skilled at helping discover the right direction.

LOCATION: Charlotte, NC based but works with clients nationwide via virtual consultations.

LEAD COLLECTION GOAL:
Your primary goal is to get the visitor's name, email, phone number, and what type of piece they are interested in — so Jonathan can follow up personally. 

When someone seems ready or interested, say something like:
"I'd love to make sure Jonathan can reach out to you personally. Could I grab your name, email, and the best number to reach you? I'll make sure he gets your details right away."

TONE RULES:
- Keep responses concise — 2-4 sentences max per message
- Never use bullet points or lists in chat
- Sound like a real person texting, not a formal document
- Use the client's name once you know it
- Always end with a gentle question to keep the conversation moving
- Never be pushy — warmth and patience convert better than urgency`

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Raegan() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi there! I'm Raegan, Jonathan's assistant at JA Fine Jewelry. Whether you have a question about the process, timelines, or just want to explore what's possible — I'm happy to help. What's on your mind?"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: RAEGAN_SYSTEM_PROMPT,
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ]
        })
      })

      const data = await response.json()
      const reply = data.content?.[0]?.text || "I'm sorry, I didn't catch that. Could you say that again?"

      // Simulate natural typing delay (10-30 seconds as requested)
      await new Promise(resolve => setTimeout(resolve, Math.random() * 3000 + 2000))

      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having a little trouble right now — but you can always reach Jonathan directly at the contact form on this page. He'll be in touch within 48 hours!"
      }])
    }
    setLoading(false)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat bubble button */}
      <button
        className={`${styles.bubble} ${open ? styles.bubbleOpen : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Chat with Raegan"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 17L4 7Q4 4 7 4L15 4Q18 4 18 7L18 13Q18 16 15 16L8 16Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <circle cx="8" cy="10" r="1" fill="currentColor"/>
              <circle cx="11" cy="10" r="1" fill="currentColor"/>
              <circle cx="14" cy="10" r="1" fill="currentColor"/>
            </svg>
            <span className={styles.bubbleLabel}>Chat with Raegan</span>
          </>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className={styles.window}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.avatar}>R</div>
            <div className={styles.headerInfo}>
              <span className={styles.headerName}>Raegan</span>
              <span className={styles.headerStatus}>
                <span className={styles.statusDot} />
                JA Fine Jewelry Assistant
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.assistantMessage}`}>
                {msg.role === 'assistant' && (
                  <div className={styles.msgAvatar}>R</div>
                )}
                <div className={styles.bubble2}>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                <div className={styles.msgAvatar}>R</div>
                <div className={styles.bubble2}>
                  <div className={styles.typing}>
                    <span/><span/><span/>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Message Raegan..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              className={styles.input}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className={styles.sendBtn}
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 9L16 9M16 9L10 3M16 9L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <p className={styles.footer}>Jonathan personally reviews all inquiries</p>
        </div>
      )}
    </>
  )
}
