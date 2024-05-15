"use client"
import { AdminNavbar } from "@/components/adminNavbar";
import { getAxiosConfig } from "@/components/axiosConfig";
import { formToJSON } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Profile {
  id: number | "";
  name: string | "";
  email: string | "";
  subscriptionStatus: string | "";
}

export default function ProfileEditPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string>("Data Loading");
  const [profileData, setProfileData] = useState<Profile>();
  const [skillName, setSkillName] = useState<string>("");

  const loadProfileData = async () => {
    try {
      const res = await getAxiosConfig().get("users/profile");
      setProfileData(res.data);
      setMessage("");
    } catch (ex) {
      console.log(ex);
      setMessage("Data loading unsuccessful!");
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const jsonData = formToJSON(formData);
      const res = await getAxiosConfig().patch("users/profile", jsonData);
      console.log(res.data);
      router.push("/adminPages/profile");
    } catch (ex) {
      console.log(ex);
      setMessage("Edit profile failed");
    }
  };

  const addSkill = async () => {
    try {
      const res = await getAxiosConfig().post("http://localhost:8000/skill/add", {
        skillName: skillName,
      });
      console.log(res.data);
      // Optionally, you can reload the profile data after adding the skill
      loadProfileData();
      // Clear the skillName state
      setSkillName("");
    } catch (ex) {
      console.log(ex);
      setMessage("Failed to add skill");
    }
  };

  return (
    <><AdminNavbar/>
    <main className="flex min-h-screen flex-col justify-center items-center">
      <div className="max-w-md w-full py-8 px-4 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Profile</h1>
        {profileData && (
          <form onSubmit={handleForm}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                defaultValue={profileData.name}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                defaultValue={profileData.email}
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit
              </button>
            </div>
          </form>
        )}
        <div className="mt-6">
          <input
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder="Enter skill name"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          <button
            onClick={addSkill}
            className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Skill
          </button>
        </div>
        <span className="block text-red-500 text-sm mt-4">{message}</span>
      </div>
    </main></>
  );
}
