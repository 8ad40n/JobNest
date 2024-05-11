"use client"
import axios from "axios";
import { useState } from "react";

export default function Proposal({
  searchParams,
}: {
  searchParams: {
    JobID: any;
  };
}) {
  const [state, setState] = useState({
    jobID: searchParams.JobID,
    budget: "",
    duration: "",
    coverLetter: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.post("http://localhost:8000/job/proposal", state, config)
      .then((response) => {
        console.log(response.status, response.data);
      })
      .catch((error) => {
        console.error("Error submitting proposal:", error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <div>
        <h1>Proposal Form</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="jobID"
            value={state.jobID}
            onChange={handleChange}
            readOnly
          />
          <input
            type="number"
            name="budget"
            value={state.budget}
            onChange={handleChange}
            placeholder="Budget"
          />
          <input
            type="text"
            name="duration"
            value={state.duration}
            onChange={handleChange}
            placeholder="Duration"
          />
          <textarea
            name="coverLetter"
            value={state.coverLetter}
            onChange={handleChange}
            rows={10}
            cols={30}
            placeholder="Cover Letter"
          ></textarea>
          <button type="submit">Submit Proposal</button>
        </form>
      </div>
    </main>
  );
}
