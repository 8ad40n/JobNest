import Image from "next/image";
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
          <button className="text-white bg-red-700 px-4 py-2 hover:bg-black rounded-full">
            Browse now
          </button>
        </div>
        <div className="rounded-md banner-image">
          <Image src={banner} alt="banner" className="rounded" />
        </div>
      </div>
      {/* create, search, apply */}

      <div className="flex justify-between p-3 shadowCSA">
        <div className="p-3">
          <div className="flex justify-center ">
            <Image src={create} alt="create" className="rounded text-center" />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-xl">Create Account</h1>
            <p className="font-light">
              First you have to create a <br />account here
            </p>
          </div>
        </div>
        <div className="p-3">
          <div className="flex justify-center ">
            <Image src={search} alt="create" className="rounded text-center" />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-xl">Search work</h1>
            <p className="font-light">
              Search the best <br />work here
            </p>
          </div>
        </div>
        <div className="p-3">
          <div className="flex justify-center ">
            <Image src={apply} alt="create" className="rounded text-center" />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-xl">Save and apply</h1>
            <p className="font-light">
              Apply or save and <br />start your work
            </p>
          </div>
        </div>
      </div>
    </main>
    
  );
}
