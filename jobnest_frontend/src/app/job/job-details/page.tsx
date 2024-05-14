import { UserNavbar } from "@/components/userNavbar";
import Link from "next/link";

export default function JobDetails({
  searchParams,
}: {
  searchParams: {
    JobID: any;
    Title: any;
    Description: any;
    Budget: any;
    Duration: any;
    Date: any;
  };
}) {
  return (
    <>
    <UserNavbar/>
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-semibold mb-4">{searchParams.Title}</h1>
        <p className="text-lg mb-4">Description: <br /><br /><span className="text-gray-500 text-sm">{searchParams.Description}</span></p><br /><br /><br />
        <div className="">
          <div className="flex flex-col">
            <p className="text-lg mb-2">Budget: <br /><span className="text-gray-500 text-sm">${searchParams.Budget}</span> </p><br />
            <p className="text-lg mb-2">Duration: <br /><span className="text-gray-500 text-sm">{searchParams.Duration}</span> </p><br />
            <p className="text-lg">Posted Date: <br /> <span className="text-gray-500 text-sm">{new Date(searchParams.Date).toLocaleDateString()}</span> </p>
          </div>
          <div className="mt-4 md:mt-0"><br /><br />
            <Link className="text-white bg-red-700 px-6 py-3 rounded-xl hover:bg-black transition duration-300 ease-in-out"
              href={{
                pathname: "/job/job-details/proposal",
                query: {
                  JobID: searchParams.JobID,
                },
              }}
            >
                Send Proposal
            </Link>
          </div>
        </div>
      </div>
    </main></>
  );
}
