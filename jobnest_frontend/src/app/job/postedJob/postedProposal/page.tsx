"use client"
import { UserNavbar } from '@/components/userNavbar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Proposal {
    id: number;
    jobID: number;
    userID: number;
    budget: number;
    duration: string;
    coverLetter: string;
}

export default function PostedProposal({
    searchParams,
}: {
    searchParams: {
        JobID: any;
    };
}) {
    const router = useRouter();
    const [proposals, setProposals] = useState<Proposal[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            axios.get(`http://localhost:8000/job/${searchParams.JobID}/proposals`, config)
                .then((response) => {
                    setProposals(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching proposals:', error);
                });
        }
    }, [searchParams.JobID]);

    const handleConfirm = async (proposalId: number) => {
        const token = localStorage.getItem('token');
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                await axios.post(`http://localhost:8000/job/${searchParams.JobID}/proposals/${proposalId}/accept`, null, config);
                router.push('/job/postedJob/acceptedJob');
                console.log('Proposal confirmed successfully');
            } catch (error) {
                console.error('Error confirming proposal:', error);
            }
        }
    };

    return (
        <>
        <UserNavbar/>
        <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
            <h1 className='text-2xl font-medium'>Proposals for Job ID: {searchParams.JobID}</h1>
            {proposals.length > 0 ? (
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2">Proposal ID</th>
                            <th className="border border-gray-200 px-4 py-2">User ID</th>
                            <th className="border border-gray-200 px-4 py-2">Budget</th>
                            <th className="border border-gray-200 px-4 py-2">Duration</th>
                            <th className="border border-gray-200 px-4 py-2">Cover Letter</th>
                            <th className="border border-gray-200 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proposals.map((proposal) => (
                            <tr key={proposal.id}>
                                <td className="border border-gray-200 px-4 py-2">{proposal.id}</td>
                                <td className="border border-gray-200 px-4 py-2">{proposal.userID}</td>
                                <td className="border border-gray-200 px-4 py-2">{proposal.budget}</td>
                                <td className="border border-gray-200 px-4 py-2">{proposal.duration}</td>
                                <td className="border border-gray-200 px-4 py-2">{proposal.coverLetter}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleConfirm(proposal.id)}>Confirm</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No proposals found for this job.</p>
            )}
        </main></>
    );
}
