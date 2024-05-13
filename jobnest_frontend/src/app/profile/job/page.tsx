'use client';
import { getAxiosConfig } from "@/components/axiosConfig";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Job {
    jobID: number | "";
    title: string | "";
    description: string | "";
    postedBy:number | "";
    acceptedUserID: number | "";
    budget: number | "";
    duration: string | "";
    status: string | "";
    date: Date | "";
}

export default function JobPage() {
    const [JobData, setJobData] = useState<Array<Job>>()
    
    const loadJobData = async () => {
        try {
            const res = await getAxiosConfig().get('Job')
            console.log(res.data)
            setJobData(res.data);
        } catch (ex) {
            console.log(ex)
        }

    }
    useEffect(() => {
        loadJobData();
    }, [])
    return (
        <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
            <div>
                <span>Job Data</span>
                <table className="border-collapse border border-slate-400">
                    <thead>
                        <tr>
                            <th className="border border-slate-300">Job Id</th>
                            <th className="border border-slate-300">Titel</th>
                            <th className="border border-slate-300">Description</th>
                            <th className="border border-slate-300">Posted By</th>
                            <th className="border border-slate-300">Budget</th>
                            <th className="border border-slate-300">Duration</th>
                            <th className="border border-slate-300">Status</th>
                            <th className="border border-slate-300">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {JobData?.map((sd) =>
                            <tr>
                                <td className="border border-slate-300">{sd?.jobID}</td>
                                <td className="border border-slate-300">{sd?.title}</td>
                                <td className="border border-slate-300">{sd?.description}</td>
                                <td className="border border-slate-300">{sd?.postedBy}</td>
                                <td className="border border-slate-300">{sd?.budget}</td>
                                <td className="border border-slate-300">{sd?.duration}</td>
                                <td className="border border-slate-300">{sd?.status}</td>
                                <td className="border border-slate-300">{sd?.date.toLocaleString()}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    )
}