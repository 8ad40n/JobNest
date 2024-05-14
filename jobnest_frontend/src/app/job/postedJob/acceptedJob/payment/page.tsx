"use client";
import { UserNavbar } from '@/components/userNavbar';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Payment({ searchParams }: { searchParams: { JobID: any } }) {
  const [paymentSessionURL, setPaymentSessionURL] = useState<string>('');

  useEffect(() => {
    const fetchPaymentSession = async () => {
      try {
        const response = await axios.get('http://localhost:8000/pay/create-checkout-session');
        setPaymentSessionURL(response.data.url);
      } catch (error) {
        console.error('Error fetching payment session:', error);
      }
    };

    fetchPaymentSession();
  }, []);

  return (
    <>
      <UserNavbar />
      <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Make a Payment</h1>
          <p className="mb-4">You are about to make a payment for Job ID: {searchParams.JobID}</p>
          <div className="flex justify-center">
            <a href={paymentSessionURL} target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Proceed to Payment
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
