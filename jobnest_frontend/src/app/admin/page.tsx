

'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function AdminLogin(){
    const router = useRouter();
    const [loginStatus, setLoginStatus] = useState<string>("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Hardcoded credentials for the admin
        const adminEmail = "admin@gmail.com";
        const adminPassword = "124";

        if (email === adminEmail && password === adminPassword) {
            console.log("Login successful");
            localStorage.setItem('adminToken', 'your-secret-token');
            router.push('/admin/dashboard');
        } else {
            console.log("Login failed");
            setLoginStatus('Login Failed');
        }
    }

    return (
        <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                /><br />
                <input 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                /><br />
                <input type="submit" value="Submit" /><br />
                <span>{loginStatus}</span>
            </form>
            <Link href="/register">Sign Up</Link>
        </main>
    );
}
