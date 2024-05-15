import { UserNavbar } from "@/components/userNavbar";

const Policy = () => {
  return (
    <>
      <UserNavbar />
      <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
        <section className="bg-gray-100 py-20 px-4 lg:px-0">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              This Privacy Policy explains how and why JobNest collects, uses, and shares personal information when you interact with or use our Site or Service. It also includes any information JobNest collects offline in connection with the Service, which we may combine with information from the Site and Service. By reading this Privacy Policy, you will understand your privacy rights and choices.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              When we say “JobNest”, and any of its affiliates, including JobNest Payments, Inc. When we say “Site”, we mean www.JobNest.com, and when we say “Service”, we mean the Site plus any websites, features, applications, widgets, or online services owned or controlled by JobNest and that post a link to this Privacy Policy.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              As part of the Service, JobNest provides a marketplace which results in platform information pertaining to different parties to an interaction. Users of the Service may be Clients, Freelancers, or Agencies, or Site Visitors (as each is defined in the User Agreement). This Privacy Policy applies to JobNest's processing of personal information of Users where Upwork determines the purposes and means of processing. It does not apply to processing of information by Users themselves, who may be controllers of the personal information they access through the Service. For information about how Users process your personal information, please contact them directly.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Accessibility: This Privacy Policy uses industry-standard technologies and was developed in connection with the World Wide Web Consortium's Web Content Accessibility Guidelines, version 2.1. If you wish to print this policy, please do so from your web browser or by saving the page as a PDF.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Policy;
