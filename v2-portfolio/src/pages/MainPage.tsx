import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import React from "react";

function MainPage() {
  return (
    <div className="w-full overflow-hidden bg-zinc-950 text-slate-100">
      <Navbar />
      <main className="relative min-h-[85vh] overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/animeWP.jpg"
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/60 to-transparent" />

        <div className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-end px-6 pb-16 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-slate-400">
              Full Stack Web Developer • product-focused
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Suraj Thapa
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              I build clean, thoughtful web experiences with minimal design,
              subtle motion, and strong technical foundations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="transition-transform duration-500 ease-out hover:scale-105 inline-flex items-center rounded-full border border-slate-700 bg-white/5 px-4 py-2 text-sm text-slate-300">
                React • TypeScript • Tailwind
              </span>
              <span className=" transition-transform duration-500 ease-out hover:scale-105 inline-flex items-center gap-1 rounded-full border border-slate-700 bg-white/5 px-4 py-2 text-sm text-slate-300">
                <span className="text-green-500 text-xl font-bold text-shadow-[0_0_8px_currentColor] transition-all duration-300 hover:text-shadow-[0_0_20px_currentColor]">
                  •
                </span>
                Learning Node.js  
              </span>
            </div>
          </div>
        </div>
      </main>
      <Skills />
    </div>
  );
}

export default MainPage;
