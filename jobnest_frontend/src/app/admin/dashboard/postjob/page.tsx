"use client"
import axios from "axios";
import { useState } from "react";

export default function AddJob() {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    budget: "",
    duration: "",
    skills: [],
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e:any) => {
    const skills = e.target.value.split(",");
    setJobData((prevData) => ({
      ...prevData,
      skills: skills.map((skill:any) => skill.trim()),
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      axios.post("http://localhost:8000/admin/jobPost", jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("Job added successfully:", response.data);
          // Optionally, redirect to another page or update state
        })
        .catch((error) => {
          console.error("Error adding job:", error);
        });
    } else {
      console.error("No token found in local storage");
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <div>
        <h1>Add Job</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Description"
            required
          ></textarea>
          <input
            type="number"
            name="budget"
            value={jobData.budget}
            onChange={handleChange}
            placeholder="Budget"
            required
          />
          <input
            type="text"
            name="duration"
            value={jobData.duration}
            onChange={handleChange}
            placeholder="Duration"
            required
          />
          <input
            type="text"
            name="skills"
            value={jobData.skills.join(",")}
            onChange={handleSkillsChange}
            placeholder="Skills (comma-separated)"
            required
          />
          <button type="submit">Add Job</button>
        </form>
      </div>
    </main>
  );
}
