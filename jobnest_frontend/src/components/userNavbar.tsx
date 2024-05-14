"use client"
import axios from "axios";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAxiosConfig } from "./axiosConfig";

interface profile {
  id: number | "",
  name: string | "",
  email: string | "",
  subscriptionStatus: string | ""
}


export function UserNavbar() {

  const [data, setData] = useState<profile>()
    const loadData = async () => {
        try {
            const res = await getAxiosConfig().get('users/profile')
            console.log(res.data)
            setData(res.data);
        } catch (ex) {
            console.log(ex)
        }

    }
    useEffect(() => {
        loadData();
    }, [])
    
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8000/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleProfile = async ()=>
    {
      router.push("/profile");
    };
    const handleTransaction = async ()=>
      {
        router.push("/profile/transaction");
      };
      const handleSubscription = async ()=>
        {
          router.push("/profile/subscription");
        };
        const handleEditProfile = async ()=>
          {
            router.push("/profile/edit");
          };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <Navbar fluid rounded>
      <Link href="/home">
        <span className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Job<span className="text-red-700">Nest</span>
          </span>
        </span>
      </Link>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar className="border-solid border-2 rounded-full"
              alt="User settings"
              img=""
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">JobNest</span>
            <span className="block truncate text-sm font-medium">{data?.email}</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
          <Dropdown.Item onClick={handleEditProfile}>Edit profile</Dropdown.Item>
          <Dropdown.Item onClick={handleTransaction}>Transaction</Dropdown.Item>
          <Dropdown.Item onClick={handleSubscription}>Subscription</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link href="/home">
          <span className="cursor-pointer">
            <li>
              <span className="block py-2 px-3 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark:text-red-700" aria-current="page">
                Home
              </span>
            </li>
          </span>
        </Link>
        <Link href="/job">
          <span className="cursor-pointer">
            <li>
              <span className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Find Work
              </span>
            </li>
          </span>
        </Link>
        <Link href="/job/jobPost">
          <span className="cursor-pointer">
            <li>
              <span className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Post a Job
              </span>
            </li>
          </span>
        </Link>
        <Link href="/ai">
          <span className="cursor-pointer">
            <li>
              <span className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                AI
              </span>
            </li>
          </span>
        </Link>
      </Navbar.Collapse>
    </Navbar>
    </nav>
  );
}
