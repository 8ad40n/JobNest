"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import postJob from "../../../assets/postJob.png";

export default function AddJob() {
  const [alertMessage, setAlertMessage] = useState("");
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    budget: "",
    duration: "",
    skills: [],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e: any) => {
    const skills = e.target.value.split(",");
    setJobData((prevData) => ({
      ...prevData,
      skills: skills.map((skill: any) => skill.trim()),
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:8000/job/post", jobData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Job added successfully:", response.data);
          setAlertMessage("Job added successfully!");
        })
        .catch((error) => {
          console.error("Error adding job:", error);
          setAlertMessage("Error adding job. Please try again.");
        });
    } else {
      console.error("No token found in local storage");
      setAlertMessage("Error: No token found in local storage.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <div>
        <div className="flex justify-between items-center mb-16 bg-red-100 p-8 rounded-2xl">
          <div>
            <h1 className="text-6xl font-medium mb-8">
              Post a job today,
              <br />
              hire tomorrow
            </h1>
            <p className="text-xl mb-8">
              Connect with talent that gets you, and hire them to take your
              business to the next level.
            </p>
            <Link className="bg-red-700 text-white text-xl px-16 py-3 mt-6 rounded-full hover:bg-black hover:text-white" href="/job/postedJob">Want to see your posted jobs?</Link>
          </div>
          <div className="flex justify-center ">
            <Image src={postJob} alt="create" className="jobImg text-center" />
          </div>
        </div>
        <form className="flex-col text-center" onSubmit={handleSubmit}>
          <h1 className="mb-6 text-2xl font-medium">Post a Job</h1>
          <input
            className="w-1/2 rounded-xl px-5 py-2 mb-8"
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />{" "}
          <br />
          <input
            className="w-1/2 rounded-xl px-5 py-2 mb-8"
            type="number"
            name="budget"
            value={jobData.budget}
            onChange={handleChange}
            placeholder="Budget"
            required
          />
          <br />
          <input
            className="w-1/2 rounded-xl px-5 py-2 mb-8"
            type="text"
            name="duration"
            value={jobData.duration}
            onChange={handleChange}
            placeholder="Duration"
            required
          />
          <br />
          <input
            className="w-1/2 rounded-xl px-5 py-2 mb-8"
            type="text"
            name="skills"
            value={jobData.skills.join(",")}
            onChange={handleSkillsChange}
            placeholder="Skills (comma-separated)"
            required
          />
          <br />
          <textarea
            className="w-1/2 rounded-xl px-5 mb-8"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Description"
            required
          ></textarea>
          <br />
          <button
            className="w-1/2 px-5 bg-red-700 text-white py-2 text-xl rounded-xl hover:bg-black hover:text-white"
            type="submit"
          >
            Add Job
          </button>
          <br />
          <br />
          <div className="flex items-center justify-center">
          {alertMessage && (
            <div role="alert" className="alert alert-info w-1/2 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{alertMessage}</span>
              
            </div>
          )}
          </div>
        </form>
      </div>
    </main>
  );
}
