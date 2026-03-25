'use client';
import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function RaeganChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi, I'm Raegan! I'm here to help you begin your bespoke jewelry journey with Jonathan. What brings you in today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
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
      setMessages([...updated, { role: 'assistant', content: data.message || 'Sorry, something went wrong.' }]);
    } catch {
      setMessages([...updated, { role: 'assistant', content: "I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, fontFamily: 'sans-serif' }}>
      {open ? (
        <div style={{ width: '360px', height: '520px', background: '#fff', borderRadius: '16px', boxShadow: '0 8px 40px rgba(0,0,0,0.18)', border: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ background: '#111', color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ fontSize: '13px', padding: '10px 14px', borderRadius: '18px', background: '#fff', color: '#999', border: '1px solid #e5e5e5', fontStyle: 'italic' }}>Raegan is typing...</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0', background: '#fff', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              style={{ flex: 1, fontSize: '13px', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '10px 14px', outline: 'none', fontFamily: 'sans-serif' }}
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{ background: input.trim() && !loading ? '#111' : '#ddd', color: input.trim() && !loading ? '#fff' : '#999', border: 'none', borderRadius: '12px', padding: '10px 18px', fontSize: '13px', fontWeight: 500, cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', fontFamily: 'sans-serif' }}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '50px', padding: '14px 22px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          💎 Chat with Raegan
        </button>
      )}
    </div>
  );
}
