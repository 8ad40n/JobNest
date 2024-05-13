'use client';
import { getAxiosConfig } from "@/components/axiosConfig";
import Link from "next/link";
import { useEffect, useState } from "react";

interface subscription {
    subscription_id: number | "",
    subscription_type: string | "",
    subscription_status: string | "",
    purchase_date: Date | "",
    expire_date: Date | "",
    package_id: number | "",
}

export default function SubscriptionPage() {
    const [subscriptionData, setSubscriptionData] = useState<Array<subscription>>()
    
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
        loadSubscriptionData();
    }, [])
    return (
        <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
            <div>
                <span>Subscription Data</span>
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
            </div>
        </main>
    )
}