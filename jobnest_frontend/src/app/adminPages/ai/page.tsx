"use client"
import { AdminNavbar } from '@/components/adminNavbar';
import axios from 'axios';
import { useState } from 'react';

export default function AdminAi() {
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
      setInputMessage(''); // Clear input field after submission
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  return (
    <>
      <AdminNavbar/>
      <main className="flex min-h-screen flex-col justify-between p-8 sm:p-24 container mx-auto px-1 lg:px-20 md:px-10">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4">AI Chat</h1>
          <div className="mb-6">
            <p className="text-gray-600 mb-2"><strong>User:</strong> {inputMessage}</p>
            <p className="text-gray-600"><strong>AI:</strong> <code>{aiMessage}</code></p>
          </div>
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={handleChange}
              placeholder="Enter your message..."
              className="border border-gray-300 rounded-md p-3 mr-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300">Send</button>
          </form>
        </div>
      </main>
    </>
  );
}
