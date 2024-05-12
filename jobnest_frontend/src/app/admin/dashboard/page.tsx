import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
        <div className="container mx-auto px-4">
            <h1>Admin Dashboard</h1>
            <ul>
                <li><Link href="/admin/dashboard/postjob">Post a Job</Link></li>
                <li><Link href="/admin/dashboard/removejob">Remove a Job</Link></li>
                <li><Link href="/admin/dashboard/removeuser">Remove a User</Link></li>
            </ul>
        </div>
        </main>
    );
}
