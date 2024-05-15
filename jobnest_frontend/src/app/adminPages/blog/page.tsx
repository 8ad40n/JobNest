"use client"
import { AdminNavbar } from "@/components/adminNavbar";
import { getAxiosConfig } from "@/components/axiosConfig";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog {
    id: number;
    AuthorID: number;
    title: string;
    description: string;
}

export default function AdminBlogPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const loadBlogs = async () => {
        try {
            const res = await getAxiosConfig().get('http://localhost:8000/blog/show');
            setBlogs(res.data);
        } catch (ex) {
            console.error('Error fetching blogs:', ex);
        }
    };

    useEffect(() => {
        loadBlogs();
    }, []);

    return (
        <><AdminNavbar/>
        <main className="flex min-h-screen flex-col justify-between p-8 sm:p-24 container mx-auto px-1 lg:px-20 md:px-10">
            <div className="bg-white rounded-lg shadow-md p-6">
           
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Explore Blogs</h2>
                    
                    <Link className="bg-blue-500 text-white px-4 py-2  hover:bg-blue-600 transition-colors duration-300 rounded-xl" href="/adminPages/blog/add">Add Blog</Link>
                </div>
                {blogs.map((blog, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                        <h2 className="text-lg font-semibold mb-2">Blog No: {blog.id}</h2>
                        <p className="text-gray-600"><strong>Author ID:</strong> {blog.AuthorID}</p>
                        <h3 className="text-lg font-semibold mt-2">Title: {blog.title}</h3>
                        <p className="mt-2">Description: {blog.description}</p>
                    </div>
                ))}
            </div>
        </main></>
    );
}
