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
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-semibold mb-4">{searchParams.Title}</h1>
        <p className="text-lg mb-4">{searchParams.Description}</p>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col">
            <p className="text-lg mb-2">Budget: ${searchParams.Budget}</p>
            <p className="text-lg mb-2">Duration: {searchParams.Duration}</p>
            <p className="text-lg">Posted Date: {new Date(searchParams.Date).toLocaleDateString()}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link className="text-white bg-red-700 px-6 py-3 rounded-lg hover:bg-black transition duration-300 ease-in-out"
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
    </main>
  );
}
