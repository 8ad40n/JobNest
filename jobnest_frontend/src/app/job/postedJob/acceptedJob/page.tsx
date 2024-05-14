"use client"
import { UserNavbar } from '@/components/userNavbar';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Job {
  jobID: number;
  title: string;
  description: string | null;
  postedBy: number;
  acceptedUserID: number;
  budget: number;
  duration: string;
  status: string | null;
  date: string;
}

export default function AcceptedJob() {
  const [acceptedJobs, setAcceptedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchAcceptedJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/job/jobs-with-accepted-proposals', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAcceptedJobs(response.data);
      } catch (error) {
        console.error('Error fetching accepted jobs:', error);
      }
    };

    fetchAcceptedJobs();
  }, []);

  return (
    <>
      <UserNavbar />
      <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
        <h1 className="text-2xl font-bold mb-8">Accepted Proposal's Jobs</h1>
        {acceptedJobs.map((job) => (
          <div key={job.jobID} className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{job.title}</h2>
            <p className="mb-2">Description: <span className='text-gray-400'> {job.description || 'N/A'}</span></p>
            <p className="mb-2">Budget: <span className='text-gray-400'>${job.budget}</span></p>
            <p className="mb-2">Duration: <span className='text-gray-400'>{job.duration}</span></p>
            <p className="mb-2">Posted By: <span className='text-gray-400'>{job.postedBy}</span></p>
            <p className="mb-2">Accepted User ID: <span className='text-gray-400'>{job.acceptedUserID}</span></p>
            <p className="mb-2">Status: <span className='text-gray-400'>{job.status || 'N/A'}</span></p>
            <p className="mb-2">Date: <span className='text-gray-400'>{new Date(job.date).toLocaleDateString()}</span></p><br />
            <div className="flex space-x-4">
              <Link href={`/job/postedJob/acceptedJob/chat?jobId=${job.jobID}&postedBy=${job.postedBy}&acceptedUserID=${job.acceptedUserID}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Go to Chat
              </Link>
              
              <Link 
              href={{
                pathname: "/job/postedJob/acceptedJob/payment",
                query: {
                  JobID: job.jobID,
                },
              }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Make a Payment
              </Link>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
