import { useState } from 'react'
import { getDemiResponse } from '../utils/api'

const Chat = () => {
  const [messages, setMessages] = useState([{ sender: 'DemiVeemon', text: 'Hi Jayden! Ready to digivolve together?' }])
  const [input, setInput] = useState('')

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage = { sender: 'Jayden', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    const demiReply = await getDemiResponse(input)
    setMessages(prev => [...prev, { sender: 'DemiVeemon', text: demiReply }])

    // Play voice after reply
    const audio = new Audio(`https://api.elevenlabs.io/v1/text-to-speech/qikY4xtXp1XqAltPCj7X/stream?text=${encodeURIComponent(demiReply)}`)
    audio.play()
  }

  return (
    <div>
      <div style={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10 }}>
        {messages.map((msg, idx) => (
          <p key={idx}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} />
      <button onClick={handleSend}>Send</button>
    </div>
  )
}

export default Chat