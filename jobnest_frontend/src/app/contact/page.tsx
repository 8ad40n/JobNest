import { UserNavbar } from "@/components/userNavbar";

const Contact = () => {
  return (
    <>
      <UserNavbar />
      <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
        <section className="bg-gray-100 py-20 px-4 lg:px-0">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              If you have any questions, feedback, or inquiries, please feel free to reach out to us using the contact information provided below:
            </p>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <ul className="text-lg text-gray-700">
                <li>Email: info@jobnest.com</li>
                <li>Phone: +1 (123) 456-7890</li>
                <li>Address: JobNest, Dhaka, Bangladesh</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
