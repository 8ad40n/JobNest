"use client"
import { getAxiosConfig } from "@/components/axiosConfig";
import { formToJSON } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface profile {
    id: number | "",
    name: string | "",
    email: string | "",
    subscriptionStatus: string | ""
}

export default function profileEditPage() {
    const router = useRouter();
    const [message, setMessage] = useState<string>("Data Loading");
    const [proflieData, setProfileData] = useState<profile>();
    const loadProfileData = async () => {
        try {
            const res = await getAxiosConfig().get('users/profile');
            setProfileData(res.data);
            setMessage('');
        } catch (ex) {
            console.log(ex);
            setMessage("Data loading unsuccessful!")
        }
    }
    useEffect(() => {
        loadProfileData();
    })
    const handleForm = async (formData: FormData) => {
        try {
            const jsonData = formToJSON(formData);
            const res = await getAxiosConfig().patch('users/profile ', jsonData);
            console.log(res.data)
            router.push('/profile');
        } catch (ex) {
            console.log(ex);
            setMessage('Edit profile Failed');
        }
    }
    return (
        <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
            <div>
                {
                    proflieData !== undefined
                        ?
                        <form action={handleForm}>
                            <input type="text" name="name" defaultValue={proflieData.name} /><br />
                            <input type="text" name="email" defaultValue={proflieData.email} /><br />
                            <input type="submit" value="Edit" /><br />
                        </form>
                        : <></>
                }
                <span>{message}</span>
            </div>
        </main>
    )
}