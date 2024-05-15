"use client"
import { UserNavbar } from '@/components/userNavbar';
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
      const response = await axios.get(`http://localhost:8000/chat/${jobId}`, {
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
      // Clear message content after sending
      setMessageContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <UserNavbar />
      <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-96">
            <div className="flex flex-col space-y-4 overflow-y-auto h-80">
              {messages.map((message) => (
                <div key={message.id} className="flex justify-start">
                  <div className="bg-blue-100 p-3 rounded-lg shadow">
                    <p className="text-blue-800">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center mt-4">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-grow p-2 outline-none focus:ring-2 focus:ring-blue-500 rounded-full mr-2"
                value={messageContent} 
                onChange={(e) => setMessageContent(e.target.value)}
              />
              <button 
                onClick={handleSendMessage} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
