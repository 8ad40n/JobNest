"use client";
import axios from "axios";
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
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <div>
        {myJobs.map((job:any) => (
          <div key={job.jobID} className="jobCard border-solid border-2 py-7 px-7 rounded-2xl">
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p>Budget: {job.budget} TK</p>
            <p>Duration: {job.duration}</p>
            <p>Date: {job.date}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
