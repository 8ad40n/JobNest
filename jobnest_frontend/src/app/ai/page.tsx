"use client"
import { getAxiosConfig } from '@/components/axiosConfig';
import { UserNavbar } from '@/components/userNavbar';
import axios from 'axios';
import { useEffect, useState } from 'react';


interface profile {
  id: number | "",
  name: string | "",
  email: string | "",
  subscriptionStatus: string | ""
}


export default function Ai() {
  const [inputMessage, setInputMessage] = useState('');
  const [aiMessage, setAiMessage] = useState('');

  const [data, setData] = useState<profile>()
    const loadData = async () => {
        try {
            const res = await getAxiosConfig().get('users/profile')
            console.log(res.data)
            setData(res.data);
        } catch (ex) {
            console.log(ex)
        }

    }
    useEffect(() => {
        loadData();
    }, [])

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
      <UserNavbar/>
      <main className="flex min-h-screen flex-col justify-between p-8 sm:p-24 container mx-auto px-1 lg:px-20 md:px-10">
        <div className="bg-white shadow-md p-6 hover:bg-blue-200 rounded-xl">
          <h1 className="text-3xl text-center font-medium mb-4">JobNest's AI</h1>
          <div className="mb-6">
            <p className="text-gray-600 mb-2"><strong>{data?.name}:</strong> {inputMessage}</p>
            <p className="text-gray-600"><strong>AI:</strong> <code>{aiMessage}</code></p>
          </div>
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={handleChange}
              placeholder="Enter your message..."
              className="border border-gray-300 rounded-xl p-3 mr-2 flex-grow focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button type="submit" className="bg-black rounded-xl text-white px-6 py-3 hover:bg-blue-600 transition-colors duration-300">Send</button>
          </form>
        </div>
      </main>
    </>
  );
}
