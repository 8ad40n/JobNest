"use client";
import axios from "axios";
import { useState } from "react";

export default function RemoveJob() {
  const [jobId, setJobId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication error: No token found.");
      return;
    }

    axios.delete(`http://localhost:8000/admin/removeJobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Job removed successfully:", response.data);
      setJobId(""); // Clear the input after successful operation
      setError(""); // Clear any existing errors
    })
    .catch((error) => {
      console.error("Error removing job:", error.response ? error.response.data : "No response from server");
      setError(`Error removing job: ${error.response ? error.response.data.message : "No response from server"}`);
    });
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <div>
        <h1>Remove Job</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="jobId"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            placeholder="Enter Job ID"
            required
          />
          <button type="submit">Remove Job</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </main>
  );
}
