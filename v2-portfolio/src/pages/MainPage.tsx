import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import React from "react";

function MainPage() {
  return (
    <div className="w-full overflow-hidden">
      <Navbar />
      <div className="w-screen relative h-170">
        <img
          className="w-screen h-full object-cover"
          src="/animeWP.jpg"
          alt="Background"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="text-center text-white px-4">
            <div className="flex justify-center gap-3 ">
              <h2 className="text-4xl font-bold font-serif sm:text-5xl">
                Suraj
              </h2>
              <h2 className="text-4xl text-amber-400 font-bold font-serif sm:text-5xl">
                Thapa
              </h2>
            </div>
            <p className="mt-3 text-sm sm:text-base text-gray-200">
              CS UnderGrad | Software Development Engineer 
            </p>
          </div>
        </div>
      </div>
      <Skills />
    </div>
  );
}

export default MainPage;
