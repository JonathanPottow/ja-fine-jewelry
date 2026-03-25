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
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {open ? (
        <div className="flex flex-col shadow-2xl rounded-2xl overflow-hidden border border-gray-200" style={{ width: '360px', height: '520px', background: '#fff' }}>
          <div style={{ background: '#111', color: '#fff' }} className="px-5 py-4 flex items-center justify-between">
            <div>
              <p className="font-semibold tracking-widest text-xs uppercase">Chat with Raegan</p>
              <p className="text-xs mt-0.5" style={{ color: '#aaa' }}>Jonathan Alistair Fine Jewelry</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white text-2xl leading-none hover:opacity-60 transition">x</button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: '#fafaf9' }}>
            {messages.map((m, i) => (
              <div key={i} className={"flex " + (m.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className="text-sm leading-relaxed px-4 py-2 rounded-2xl max-w-xs" style={m.role === 'user' ? { background: '#111', color: '#fff' } : { background: '#fff', color: '#222', border: '1px solid #e5e5e5' }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="text-sm px-4 py-2 rounded-2xl italic text-gray-400" style={{ background: '#fff', border: '1px solid #e5e5e5' }}>Raegan is typing...</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="px-4 py-3 border-t border-gray-100 flex gap-2 items-center" style={{ background: '#fff' }}>
            <input
              className="flex-1 text-sm outline-none border border-gray-200 rounded-xl px-3 py-2 focus:border-gray-400 transition"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} className="rounded-xl px-4 py-2 text-sm font-medium transition" style={{ background: input.trim() && !loading ? '#111' : '#ddd', color: input.trim() && !loading ? '#fff' : '#999' }}>
              Send
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="flex items-center gap-2 px-5 py-3 rounded-full shadow-lg text-sm font-medium transition hover:opacity-80" style={{ background: '#111', color: '#fff' }}>
          <span>Chat with Raegan</span>
        </button>
      )}
    </div>
  );
}
