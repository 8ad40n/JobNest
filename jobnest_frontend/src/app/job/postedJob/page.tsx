"use client";
import { UserNavbar } from "@/components/userNavbar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PostedJob() {
  const [myJobs, setMyJobs] = useState([]);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.get("http://localhost:8000/job/postedJobs", config)
        .then((res) => setMyJobs(res.data))
        .catch((error) => console.error("Error fetching posted jobs:", error));
    }
  }, []);

  return (
    <>
    <UserNavbar/>

    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <div>
        {myJobs.map((job:any) => (
          <div key={job.jobID} className="bg-white shadow-md rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-600 mb-2">{job.description}</p>
            <div className="flex justify-between mb-2">
              <p className="font-semibold">Budget: {job.budget} TK</p>
              <p className="font-semibold">Duration: {job.duration}</p>
            </div>
            <p className="text-gray-400">Date: {new Date(job.date).toLocaleDateString()}</p>
            <Link href={{
              pathname: "/job/postedJob/postedProposal", 
              query: {
                JobID: job.jobID,
              },
            }} className="text-blue-500 hover:underline">
              See Proposal
            </Link>
          </div>
        ))}
      </div>
    </main></>
  );
}
