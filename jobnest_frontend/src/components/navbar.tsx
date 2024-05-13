"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAxiosConfig } from "./axiosConfig";

interface profile {
  id: number | "",
  name: string | "",
  email: string | "",
  subscriptionStatus: string | ""
}

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userStatus, setUserStatus] = useState<boolean>(false);
  const [proflieData, setProfileData] = useState<profile>();
  const loadProfileData = async ()=>{
    try{
      const res = await getAxiosConfig().get('users/profile');
      setProfileData(res.data);
    }catch(ex){
      console.log(ex);
      setUserStatus(false);
    }
  }
  useEffect(() => {
    const interval = setInterval(()=>{
      const token: string | null = localStorage.getItem('token');
      setUserStatus(token !== null);
      // console.log(token != null)
    },1000);
    // return () => clearInterval(interval);
  },[])
  useEffect(()=>{
    loadProfileData();
  })
  const doLogOut = () => {
    localStorage.removeItem('token');
    setUserStatus(false);
  }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <span className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Job<span className="text-red-700">Nest</span>
            </span>
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {
            userStatus ?
              <div>
                <Link href={'/profile'}>
                  {proflieData?.name} | {proflieData?.email}
                </Link>
                <button onClick={doLogOut}
                  type="button"
                  className="text-white bg-red-700 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Logout
                </button>
              </div>
              
              :
              <Link href={"/login"}
                type="button"
                className="text-white bg-red-700 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </Link>
          }
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <Link href="/">
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
            <Link href="#">
              <span className="cursor-pointer">
                <li>
                  <span className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    Post Job
                  </span>
                </li>
              </span>
            </Link>
            <Link href="/">
              <span className="cursor-pointer">
                <li>
                  <span className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    Contact
                  </span>
                </li>
              </span>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
