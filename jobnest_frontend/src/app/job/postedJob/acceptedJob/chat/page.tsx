"use client"
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Message {
  id: number;
  message: string;
}

export default function Chat() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    if (jobId) {
      fetchChatHistory();
    }
  }, [jobId]);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/chat/${jobId}/history`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      await axios.post(`http://localhost:8000/chat/${jobId}`, {
        message: messageContent,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // After sending message, fetch updated chat history
      fetchChatHistory();
      // Clear the message input
      setMessageContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <h1 className="text-2xl font-bold mb-8">Chat</h1>
      <div className="chat-container">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <p>{message.message}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input 
          type="text" 
          placeholder="Type your message..." 
          value={messageContent} 
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button 
          onClick={handleSendMessage} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </div>
    </main>
  );
}
