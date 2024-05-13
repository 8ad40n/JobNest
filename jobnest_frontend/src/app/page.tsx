import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import banner from "../assets/banner2.gif";
import create from "../assets/createHomePage.png";
import apply from "../assets/saveHomePage.png";
import search from "../assets/searchHomePage.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
      {/* banner */}
      <div className="sm:flex-col-reverse sm:justify-center md:flex md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between mb-2">
        <div className="text-center md:text-left lg:text-left">
          <p className="font-extrabold text-4xl md:text-5xl lg:text-6xl ">
            How work <br />
            should work
          </p>
          <br />
          <p className="font-light text-xl lg:text-2xl">
            Forget the old rules. You can have the best people. <br />
            Right now. Right here.
          </p>
          <br />
          <Link href="/job" className="text-white bg-red-700 px-4 py-2 hover:bg-black rounded-full">Browse now</Link>
        </div>
        <div className="rounded-md banner-image">
          <Image src={banner} alt="banner" className="rounded" />
        </div>
      </div>



      {/* create, search, apply */}

      <div className="sm:flex-col md:flex lg:flex-row justify-around items-center p-5 shadowCSA">
        <div className="p-3">
          <div className="flex justify-center ">
            <Image src={create} alt="create" className="rounded text-center" />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-xl">Create Account</h1>
            <p className="font-light text-gray-500">
              First you have to create a <br />
              account here
            </p>
          </div>
        </div>
        <div className="p-3">
          <div className="flex justify-center ">
            <Image src={search} alt="create" className="rounded text-center" />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-xl">Search work</h1>
            <p className="font-light text-gray-500">
              Search the best <br />
              work here
            </p>
          </div>
        </div>
        <div className="p-3">
          <div className="flex justify-center ">
            <Image src={apply} alt="create" className="rounded text-center" />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-xl">Save and apply</h1>
            <p className="font-light text-gray-500">
              Apply or save and <br />
              start your work
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-20">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1><br />
        <Accordion>
          <AccordionPanel>
            <AccordionTitle>What is JobNest?</AccordionTitle>
            <AccordionContent>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
              JobNest is an online platform that connects sellers with tasks and buyers seeking freelance work. It provides a dynamic marketplace for earning and outsourcing opportunities.
              </p>
              
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>How does JobNest work for sellers?</AccordionTitle>
            <AccordionContent>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
              Sellers can post tasks on JobNest by providing task descriptions, requirements, and pricing. They can then review applications from buyers, communicate with applicants, and award tasks to the most suitable candidates.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>
            What kind of tasks can be posted on JobNest?
            </AccordionTitle>
            <AccordionContent>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
              JobNest supports a diverse range of tasks across various categories, including graphic design, writing, programming, marketing, and more. Sellers have the flexibility to post tasks related to their specific needs and requirements.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>
            How do buyers apply for tasks on JobNest?
            </AccordionTitle>
            <AccordionContent>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
              Buyers can browse available tasks on JobNest and submit proposals for tasks they are interested in. They can provide details about their skills, experience, and why they are a good fit for the task. Sellers then review these applications and select the most suitable candidates.
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </main>
  );
}
