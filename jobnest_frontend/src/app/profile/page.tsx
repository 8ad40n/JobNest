"use client";
import { getAxiosConfig } from "@/components/axiosConfig";
import { UserNavbar } from "@/components/userNavbar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Profile {
  id: number | "";
  name: string | "";
  email: string | "";
  subscriptionStatus: string | "";
}

interface Skill {
  id: number;
  name: string;
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<Profile>();
  const [skills, setSkills] = useState([]);

  const loadData = async () => {
    try {
      const profileRes = await getAxiosConfig().get("users/profile");
      setProfileData(profileRes.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get("http://localhost:8000/skill/show", config)
        .then((res) => {
          setSkills(res.data.skills);
        })
        .catch((error) => {
          console.error("Error fetching skills:", error);
        });
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <UserNavbar />
      <main className="flex min-h-screen flex-col justify-between p-8 sm:p-24 container mx-auto px-1 lg:px-20 md:px-10">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4">Profile Data</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold">Id:</span>
              <span className="text-gray-800">{profileData?.id}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold">Name:</span>
              <span className="text-gray-800">{profileData?.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold">Email:</span>
              <span className="text-gray-800">{profileData?.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold">
                Subscription Status:
              </span>
              <span className="text-gray-800">
                {profileData?.subscriptionStatus}
              </span>
            </div>
            <div>
              <h1 className="text-gray-600 font-semibold">Skills:</h1>
              <ul>
                {skills.map((skill, index) => (
                  <li className="border-solid border-2 p-4" key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href={"profile/edit"}
              className="text-blue-500 hover:underline"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
