"use client"
import axios from "axios";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem("token");

      // Make request to logout API endpoint with token included in headers
      await axios.post("http://localhost:8000/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Redirect user to login page
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
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
                Jobs
              </span>
            </li>
          </span>
        </Link>
      </Navbar.Collapse>
    </Navbar>
    </nav>
  );
}
