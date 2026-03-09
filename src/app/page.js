"use client";
import { useState } from 'react';
import { Send } from 'lucide-react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const aiMessage = data.choices[0].message;
      setMessages([...newMessages, aiMessage]);
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif', backgroundColor: '#111', color: '#fff', padding: '20px', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Uncensored AI Chat</h2>
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #333', padding: '10px', marginBottom: '10px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: '10px', textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <span style={{ background: m.role === 'user' ? '#0070f3' : '#333', padding: '8px 12px', borderRadius: '15px', display: 'inline-block' }}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && <p>Thinking...</p>}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: 'none' }}
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Apna sawaal likhein..."
        />
        <button onClick={sendMessage} style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
