"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Job() {

    const [myJobs, setMyJobs] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:8000/job")
        .then((res)=> setMyJobs(res.data));
    },[])
  return (
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
        <h1>All jobs:</h1>
        {myJobs.map((post:any)=>{
            const {jobID, title, description, budget, duration, date} = post;
            return(
                <div className="jobCard" key={jobID}>
                <p>{jobID}</p>
                <p>{title}</p>
                <p>{description}</p>
                <p>{budget}</p>
                <p>{duration}</p>
                <p>{date}</p>
                </div>
            )
        })}
    </main>
  );
}
