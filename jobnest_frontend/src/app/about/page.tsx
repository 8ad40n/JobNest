import { UserNavbar } from "@/components/userNavbar";

const AboutSection = () => {
  return (
    <><UserNavbar/>
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
    <section className="bg-gray-100 py-20 px-4 lg:px-0">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-3xl font-bold mb-4">Creating Economic Opportunities</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to create economic opportunities so people have better lives. At JobNest, we've become the world's work marketplace where businesses of all sizes and independent talent meet to accomplish incredible things.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              We see the passion and commitment that every user puts into their work on JobNest. Whether it's a quick presentation or a multi-year project, both talent and clients care about doing good work because they love what they do.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Our platform aligns the goals of clients with the goals of talent so that outcomes are better and everyone grows in the same direction. We provide tools to develop skills, evolve businesses, and gain control and freedom for success.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4">Workforce and Connections</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
            JobNest is your workforce. Clients use our platform to build faster and transform their businesses with the help of independent talent. Independent talent on Upwork is a valuable and instrumental part of someone's team.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              We aim to make work more rewarding by helping you make connections that turn vision into reality. By building your Virtual Talent Bench of trusted people, we strive to create economic and personal impact in the everyday and in the long run.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Our team at JobNest is driven by our mission to create economic opportunities for people around the world. Real opportunity emerges when you find the right people and work strategically.
            </p>
          </div>
        </div>
      </div>
    </section></main></>
  );
};

export default AboutSection;
