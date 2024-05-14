'use client';
import { getAxiosConfig } from "@/components/axiosConfig";
import { UserNavbar } from "@/components/userNavbar";
import { useEffect, useState } from "react";

interface Subscription {
    subscription_id: number | "";
    subscription_type: string | "";
    subscription_status: string | "";
    purchase_date: string | "";
    expire_date: string | "";
    package_id: number | "";
}

export default function SubscriptionPage() {
    const [subscriptionData, setSubscriptionData] = useState<Subscription[]>([]);
    
    const loadSubscriptionData = async () => {
        try {
            const res = await getAxiosConfig().get('subscription');
            setSubscriptionData(res.data);
        } catch (ex) {
            console.log(ex);
        }
    };

    useEffect(() => {
        loadSubscriptionData();
    }, []);

    return (
        <><UserNavbar/>
        <main className="flex min-h-screen flex-col justify-between p-8 sm:p-24 container mx-auto px-1 lg:px-20 md:px-10">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-4">Subscription Data</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subscription Id
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subscription Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subscription Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Purchase Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Expire Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Package Id
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {subscriptionData.map((subscription, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.subscription_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.subscription_type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.subscription_status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.purchase_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.expire_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.package_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main></>
    );
}
