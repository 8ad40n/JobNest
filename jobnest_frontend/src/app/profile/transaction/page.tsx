'use client';
import { getAxiosConfig } from "@/components/axiosConfig";
import Link from "next/link";
import { useEffect, useState } from "react";

interface transaction {
    billId: number | "";
    amount: number | "";
    status: string | "";
    sendUserId: number | "";
    recievedUserId: number | "";
    transaction: string | "";
}

export default function TransactionPage() {
    const [transactionData, setTransactionData] = useState<Array<transaction>>()
    
    const loadTransactionData = async () => {
        try {
            const res = await getAxiosConfig().get('users/transaction')
            console.log(res.data)
            setTransactionData(res.data);
        } catch (ex) {
            console.log(ex)
        }

    }
    useEffect(() => {
        loadTransactionData();
    }, [])
    return (
        <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
            <div>
                <span>transaction Data</span>
                <table className="border-collapse border border-slate-400">
                    <thead>
                        <tr>
                            <th className="border border-slate-300">Bill Id</th>
                            <th className="border border-slate-300">Amount</th>
                            <th className="border border-slate-300">Status</th>
                            <th className="border border-slate-300">Send User Id</th>
                            <th className="border border-slate-300">Recieved User Id</th>
                            <th className="border border-slate-300">Transaction Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionData?.map((sd) =>
                            <tr>
                                <td className="border border-slate-300">{sd?.billId}</td>
                                <td className="border border-slate-300">{sd?.amount}</td>
                                <td className="border border-slate-300">{sd?.status}</td>
                                <td className="border border-slate-300">{sd?.sendUserId}</td>
                                <td className="border border-slate-300">{sd?.recievedUserId}</td>
                                <td className="border border-slate-300">{sd?.transaction}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    )
}