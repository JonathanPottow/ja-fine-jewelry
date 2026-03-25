'use client';
import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

function getTypingDelay(text: string): number {
  const words = text.split(' ').length;
  const chars = text.length;
  // Simulate roughly 40 words per minute typing speed
  const typingTime = (words / 40) * 60 * 1000;
  // Add a natural "thinking" pause at the start
  const thinkingPause = chars < 100 ? 1500 : chars < 200 ? 2500 : 3500;
  // Cap at 8 seconds so it never feels broken
  return Math.min(thinkingPause + typingTime, 8000);
}

export default function RaeganChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi, I'm Raegan. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim() || loading || isTyping) return;
    const userMessage: Message = { role: 'user', content: input };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      const replyText = data.message || 'Sorry, something went wrong.';
      const delay = getTypingDelay(replyText);

      setLoading(false);
      setIsTyping(true);

      await new Promise(resolve => setTimeout(resolve, delay));

      setIsTyping(false);
      setMessages([...updated, { role: 'assistant', content: replyText }]);
    } catch {
      setLoading(false);
      setIsTyping(false);
      setMessages([...updated, { role: 'assistant', content: "I'm having trouble connecting right now. Please try again." }]);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      {open && (
        <div style={{ width: '360px', height: '520px', background: '#fff', borderRadius: '16px', boxShadow: '0 8px 40px rgba(0,0,0,0.18)', border: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', overflow: 'hidden', marginBottom: '12px' }}>
          <div style={{ background: '#111', color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div>
              <p style={{ fontWeight: 600, letterSpacing: '0.1em', fontSize: '11px', textTransform: 'uppercase', margin: 0 }}>Chat with Raegan</p>
              <p style={{ fontSize: '11px', color: '#aaa', margin: '2px 0 0' }}>Jonathan Alistair Fine Jewelry</p>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer', lineHeight: 1, padding: 0 }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: '#fafaf9', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ fontSize: '13px', lineHeight: '1.5', padding: '10px 14px', borderRadius: '18px', maxWidth: '85%', background: m.role === 'user' ? '#111' : '#fff', color: m.role === 'user' ? '#fff' : '#222', border: m.role === 'user' ? 'none' : '1px solid #e5e5e5' }}>
                  {m.content}
                </div>
              </div>
            ))}
            {(loading || isTyping) && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ fontSize: '13px', padding: '10px 14px', borderRadius: '18px', background: '#fff', border: '1px solid #e5e5e5', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#bbb', display: 'inline-block', animation: 'bounce 1.4s infinite', animationDelay: '0s' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#bbb', display: 'inline-block', animation: 'bounce 1.4s infinite', animationDelay: '0.25s' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#bbb', display: 'inline-block', animation: 'bounce 1.4s infinite', animationDelay: '0.5s' }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <style>{`
            @keyframes bounce {
              0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
              30% { transform: translateY(-6px); opacity: 1; }
            }
          `}</style>
          <div style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0', background: '#fff', display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
            <input
              style={{ flex: 1, fontSize: '13px', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '10px 14px', outline: 'none', fontFamily: 'sans-serif' }}
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading || isTyping}
            />
            <button
              onClick={sendMessage}
              disabled={loading || isTyping || !input.trim()}
              style={{ background: input.trim() && !loading && !isTyping ? '#111' : '#ddd', color: input.trim() && !loading && !isTyping ? '#fff' : '#999', border: 'none', borderRadius: '12px', padding: '10px 18px', fontSize: '13px', fontWeight: 500, cursor: input.trim() && !loading && !isTyping ? 'pointer' : 'not-allowed', fontFamily: 'sans-serif' }}
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '50px', padding: '14px 22px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
      >
        💎 Chat with Raegan
      </button>
    </div>
  );
}
