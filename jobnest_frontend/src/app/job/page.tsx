"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Job() {
  const [myJobs, setMyJobs] = useState([]);
  

  useEffect(() => {
    axios.get("http://localhost:8000/job").then((res) => setMyJobs(res.data));
  }, []);
  return (
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <div>
        <h1>
          Find the best <br />
          jobs
        </h1>
        <p>
          It takes just one job to develop a successful relationship that can
          propel your career forward.
        </p>
        <button>Interested in hiring?</button>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
        {myJobs.map((post: any) => {
          const { jobID, title, description, budget, duration, date } = post;
          return (
            <div
              className="jobCard border-solid border-2 py-7 px-7 rounded-2xl"
              key={jobID}
            >
              <p className="text-2xl font-medium hover:text-red-700 py-0">
                {title}
              </p>
              <p className="text-gray-400 py-2">Posted on: {date}</p>
              <div className="py-6 flex justify-between">
                <p>
                  Budget: <span className="text-gray-400">{budget} TK</span>
                </p>
                <p>
                  Duration: <span className="text-gray-400">{duration}</span>
                </p>
              </div>
              {/* <button className="text-white bg-red-700 px-3 py-1 rounded-xl hover:bg-black">
                See more
              </button> */}
              <Link className="text-white bg-red-700 px-3 py-1 rounded-xl hover:bg-black"
                href={{
                  pathname: "/job/job-details",
                  query: {
                    JobID: jobID,
                    Title: title,
                    Description: description,
                    Budget: budget,
                    Duration: duration,
                    Date: date,
                  },
                }}
              >See more</Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
