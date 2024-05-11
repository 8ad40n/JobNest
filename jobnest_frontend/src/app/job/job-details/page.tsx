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
      <div>
        <p>{searchParams.JobID}</p>
        <p>{searchParams.Title}</p>
        <p>{searchParams.Description}</p>
        <p>{searchParams.Budget}</p>
        <p>{searchParams.Duration}</p>
        <p>{searchParams.Date}</p>
        <Link
          className="text-white bg-red-700 px-3 py-1 rounded-xl hover:bg-black"
          href={{
            pathname: "/",
          }}
        >
          Send proposal
        </Link>
      </div>
    </main>
  );
}
