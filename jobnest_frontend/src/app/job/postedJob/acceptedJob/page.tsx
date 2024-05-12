"use client"
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
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <h1 className="text-2xl font-bold mb-8">Accepted Jobs</h1>
      {acceptedJobs.map((job) => (
        <div key={job.jobID} className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">{job.title}</h2>
          <p className="mb-2">Description: {job.description || 'N/A'}</p>
          <p className="mb-2">Budget: ${job.budget}</p>
          <p className="mb-2">Duration: {job.duration}</p>
          <p className="mb-2">Posted By: {job.postedBy}</p>
          <p className="mb-2">Accepted User ID: {job.acceptedUserID}</p>
          <p className="mb-2">Status: {job.status || 'N/A'}</p>
          <p className="mb-2">Date: {new Date(job.date).toLocaleDateString()}</p>
          <Link href={`/job/postedJob/acceptedJob/chat?jobId=${job.jobID}&postedBy=${job.postedBy}&acceptedUserID=${job.acceptedUserID}`}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Chat
          </Link>
        </div>
      ))}
    </main>
  );
}
