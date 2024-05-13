'use client';
import { getAxiosConfig } from "@/components/axiosConfig";
import { useEffect, useState } from "react";

interface profile {
    id: number | "",
    name: string | "",
    email: string | "",
    subscriptionStatus: string | ""
}
interface subscription {
    subscription_id: number | "",
    subscription_type: string | "",
    subscription_status: string | "",
    purchase_date: Date | "",
    expire_date: Date | "",
    package_id: number | "",
}

export default function Login() {
    const [data, setData] = useState<profile>()
    const [subscriptionData, setSubscriptionData] = useState<Array<subscription>>()
    const loadData = async () => {
        try {
            const res = await getAxiosConfig().get('users/profile')
            console.log(res.data)
            setData(res.data);
        } catch (ex) {
            console.log(ex)
        }

    }
    const loadSubscriptionData = async () => {
        try {
            const res = await getAxiosConfig().get('subscription')
            console.log(res.data)
            setSubscriptionData(res.data);
        } catch (ex) {
            console.log(ex)
        }

    }
    useEffect(() => {
        loadData();
        loadSubscriptionData();
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
            {/* <br /> */}
            <table className="border-collapse border border-slate-400">
                <thead>
                    <tr>
                        <th className="border border-slate-300">Subscription Id</th>
                        <th className="border border-slate-300">Subscription Type</th>
                        <th className="border border-slate-300">Subscription Status</th>
                        <th className="border border-slate-300">Purchase Date</th>
                        <th className="border border-slate-300">Expire Date</th>
                        <th className="border border-slate-300">Package Id</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptionData?.map((sd) =>
                        <tr>
                            <td className="border border-slate-300">{sd?.subscription_id}</td>
                            <td className="border border-slate-300">{sd?.subscription_type}</td>
                            <td className="border border-slate-300">{sd?.subscription_status}</td>
                            <td className="border border-slate-300">{sd?.purchase_date.toLocaleString()}</td>
                            <td className="border border-slate-300">{sd?.expire_date.toLocaleString()}</td>
                            <td className="border border-slate-300">{sd?.package_id}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </main>
    )
}