'use client';
import { getAxiosConfig } from "@/components/axiosConfig";
import { UserNavbar } from "@/components/userNavbar";
import { useEffect, useState } from "react";

interface Transaction {
    billId: number | "";
    amount: number | "";
    status: string | "";
    sendUserId: number | "";
    receivedUserId: number | "";
    transactionCode: string | "";
}

export default function TransactionPage() {
    const [transactionData, setTransactionData] = useState<Transaction[]>([]);
    
    const loadTransactionData = async () => {
        try {
            const res = await getAxiosConfig().get('users/transaction');
            setTransactionData(res.data);
        } catch (ex) {
            console.log(ex);
        }
    };

    useEffect(() => {
        loadTransactionData();
    }, []);

    return (
        <><UserNavbar/>
        <main className="flex min-h-screen flex-col justify-between p-8 sm:p-24 container mx-auto px-1 lg:px-20 md:px-10">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-4">Transaction Data</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bill Id
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Send User Id
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Received User Id
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Transaction Code
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transactionData.map((transaction, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.billId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.sendUserId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.receivedUserId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.transactionCode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main></>
    );
}
