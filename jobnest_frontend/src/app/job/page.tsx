"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import jobImg from "../../assets/jobDetails.png";

export default function Job() {
  const [myJobs, setMyJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/job").then((res) => setMyJobs(res.data));
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <div className="flex justify-between items-center mb-12 bg-red-100 p-8 rounded-2xl">
        <div>
          <h1 className="text-7xl font-medium mb-8">
            Find the best <br />
            jobs
          </h1>
          <p className="text-xl mb-8">
            It takes just one job to develop a successful <br /> relationship that can 
            propel your <br /> career forward.
          </p>
          <Link className="bg-red-700 text-white text-xl px-16 py-3 mt-6 rounded-full hover:bg-black hover:text-white" href="/job/jobPost">Interested in hiring?</Link>
        </div>
        <div className="flex justify-center ">
          <Image src={jobImg} alt="create" className="jobImg text-center" />
        </div>
      </div>
      {/* search */}
      <h1 className="text-xl font-normal mb-2">Explore jobs</h1>
      <input
      className="rounded-full w-2/5 mb-6"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
        {myJobs
          .filter((post: any) => {
            if (search === "") {
              return post;
            } else if (
              post.title?.toLowerCase()?.includes(search.toLowerCase())
            ) {
              return post;
            }
          })
          .map((post: any) => {
            const { jobID, title, description, budget, duration, date } = post;
            return (
              <div
                className="jobCard border-solid border-2 py-7 px-7 rounded-2xl hover:bg-[#F2FEFA]"
                key={jobID}
              >
                <p className="text-2xl font-medium py-0">
                  {title}
                </p>
                <p className="text-gray-400 py-2">Posted on: {new Date(date).toLocaleDateString()}</p>
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
                <Link
                  className="text-white bg-red-700 px-3 py-1 rounded-xl hover:bg-black"
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
                >
                  See more
                </Link>
              </div>
            );
          })}
      </div>
    </main>
  );
}
