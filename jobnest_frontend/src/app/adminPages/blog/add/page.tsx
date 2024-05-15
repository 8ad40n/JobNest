"use client"
import { AdminNavbar } from "@/components/adminNavbar";
import axios from "axios";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminAddBlogPage() {
    const router = useRouter();
    const [state, setState] = useState({
        title: "",
        description: "",
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                // Handle token not found scenario
                console.error("Token not found");
                return;
            }
    
            const response = await axios.post("http://localhost:8000/blog/add", state, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.status, response.data);
            router.push("/adminPages/blog");
        } catch (error) {
            console.error("Error adding blog:", error);
        }
    };

    return (
        <><AdminNavbar/>
        <main className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4">Add New Blog</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Enter title"
                        name="title"
                        value={state.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        placeholder="Enter description"
                        name="description"
                        value={state.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                <Button type="submit">Add Blog</Button>
                </div>
            </form>
        </main></>
    );
}
