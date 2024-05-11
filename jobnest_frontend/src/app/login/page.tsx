'use client';
import { getAxiosConfig } from "@/components/axiosConfig";
import { formToJSON } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){
    const router = useRouter();
    const [loginStatus, setLoginStatus]=useState<string>("");
    const handleForm = async (formData: FormData)=>{
        try{
            const jsonData = formToJSON(formData);
            const res = await getAxiosConfig().post('auth/login', jsonData)
            const resData : {jwt:string}=res.data;
            console.log(resData)
            localStorage.setItem('token', resData.jwt);
            router.push('/profile')
        }catch(ex){
            console.log(ex);
            setLoginStatus('Login Failed');
        }
    }
    return(
        <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
            <form action={handleForm}>
                <input type="text" name="email" /><br />
                <input type="password" name="password" /><br />
                <input type="submit" value="Submit" /><br />
                <span>{loginStatus}</span>
            </form>
        </main>
    )
}