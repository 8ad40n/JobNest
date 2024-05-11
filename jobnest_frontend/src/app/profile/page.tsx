'use client';
import { getAxiosConfig } from "@/components/axiosConfig";
import { useEffect, useState } from "react";

interface profile {
    id: number | "",
    name: string | "",
    email: string | "",
    subscriptionStatus: string | ""
}

export default function Login() {
    const [data, setData] = useState<profile>()
    const loadData = async () => {
        try{
            const res = await getAxiosConfig().get('users/profile')
            console.log(res.data)
            setData(res.data);
        }catch(ex){
            console.log(ex)
        }
        
    }
    useEffect(() => {
        loadData();
    }, [])
    return (
        <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
            <table className="border-collapse border border-slate-400">
                <thead>
                    <tr>
                        <th className="border border-slate-300">Id</th>
                        <th className="border border-slate-300">Name</th>
                        <th className="border border-slate-300">Email</th>
                        <th className="border border-slate-300">Subscription Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td className="border border-slate-300">
                            {data?.id}
                        </td>
                        <td className="border border-slate-300">
                            {data?.name}
                        </td>
                        <td className="border border-slate-300">
                            {data?.email}
                        </td>
                        <td className="border border-slate-300">
                            {data?.subscriptionStatus}
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}