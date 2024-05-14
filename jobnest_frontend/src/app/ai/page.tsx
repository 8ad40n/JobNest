"use client"
import { UserNavbar } from '@/components/userNavbar';
import axios from 'axios';
import { useState } from 'react';

export default function Ai() {
  const [inputMessage, setInputMessage] = useState('');
  const [aiMessage, setAiMessage] = useState('');

  const handleChange = (e:any) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/chat-completion-api', {
        message: inputMessage,
      });
      setAiMessage(response.data.aiMessage);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  return (
    <>
    <UserNavbar/>
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <div>
        <h1>AI Chat</h1>
        <div>
          <p>User: {inputMessage}</p>
          <p>AI: <code>{aiMessage}</code></p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputMessage}
            onChange={handleChange}
            placeholder="Enter your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </main></>
  );
}
