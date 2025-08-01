import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi Jayden! Ready to build something awesome? 🔧🧠' }
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.continuous = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
      };

      recognitionRef.current.onend = () => setListening(false);
    }
  }, []);

  const handleMic = () => {
    if (recognitionRef.current && !listening) {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updatedMessages = [...messages, { role: 'user', text: input }];
    setMessages(updatedMessages);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      const reply = data.reply || 'No response from AI 🤷‍♂️';
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: '❌ Could not reach AI server' }]);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: 600, margin: '0 auto' }}>
      <h2>🧠 Digicore Chat Assistant</h2>
      <div style={{ border: '1px solid #ccc', borderRadius: 10, padding: '10px', minHeight: '250px' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 10, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <strong>{msg.role === 'user' ? 'You' : 'Copilot'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', marginTop: 15 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type here..."
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={sendMessage} style={{ marginLeft: 10 }}>Send</button>
        <button onClick={handleMic} style={{ marginLeft: 10 }}>{listening ? '🎙️ Listening...' : '🎙️ Voice'}</button>
      </div>
    </div>
  );
};

export default App;
