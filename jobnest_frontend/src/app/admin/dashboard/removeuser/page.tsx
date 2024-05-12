"use client";
import axios from "axios";
import { useState } from "react";

export default function RemoveUser() {
  const [userId, setUserId] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      axios.delete(`http://localhost:8000/admin/removeUsers/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("User removed successfully:", response.data);
          // Optionally, redirect to another page or update state
          setUserId(""); // Clear the input after successful operation
        })
        .catch((error) => {
          console.error("Error removing user:", error.response ? error.response.data : "No response from server");
        });
    } else {
      console.error("No token found in local storage");
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <div>
        <h1>Remove User</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            required
          />
          <button type="submit">Remove User</button>
        </form>
      </div>
    </main>
  );
}
