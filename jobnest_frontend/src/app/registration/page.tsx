'use client';
import { getAxiosConfig } from "@/components/axiosConfig";
import { formToJSON } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){
    const router = useRouter();
    const [message, setMessage]=useState<string>("");
    const handleForm = async (formData: FormData)=>{
        try{
            const jsonData = formToJSON(formData);
            const res = await getAxiosConfig().post('auth/register', jsonData)
            console.log(res.data)
            router.push('/login')
        }catch(ex){
            console.log(ex);
            setMessage('Registration Failed');
        }
    }
    return(
        <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
            <form action={handleForm}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" /><br />
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" /><br />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" /><br />
                <input type="submit" value="Submit" /><br />
                <span>{message}</span>
            </form>
        </main>
    )
}