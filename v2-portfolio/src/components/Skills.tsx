import FallingLogos from "./ui/FallingText";

function Skills() {
  const myLogos = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png",
      alt: "react",
      width: 56,
      height: 50,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/960px-HTML5_logo_and_wordmark.svg.png",
      alt: "html",
      width: 45,
      height: 52,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/500px-CSS3_logo_and_wordmark.svg.png?_=20160530175649",
      alt: "css",
      width: 45,
      height: 52,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      alt: "js",
      width: 45,
      height: 42,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/3840px-Node.js_logo.svg.png",
      alt: "nodejs",
      width: 70,
      height: 45,
    },
    {
      src: "https://www.manektech.com/storage/developer/1646733543.webp",
      alt: "express",
      width: 50,
      height: 50,
    },
    {
      src: "https://cdn3d.iconscout.com/3d/free/thumb/free-java-3d-icon-png-download-7578017.png",
      alt: "java",
      width: 55,
      height: 55,
    },
    {
      src: "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png",
      alt: "redux",
      width: 55,
      height: 55,
    },
    {
      src: "https://static.vecteezy.com/system/resources/previews/067/565/433/non_2x/tailwind-css-logo-rounded-free-png.png",
      alt: "tailwind css",
      width: 60,
      height: 60,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1280px-ISO_C%2B%2B_Logo.svg.png",
      alt: "c++",
      width: 50,
      height: 50,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1280px-Python-logo-notext.svg.png",
      alt: "python",
      width: 50,
      height: 50,
    },
    {
      src: "https://vectorseek.com/wp-content/uploads/2023/10/Mongodb-Icon-Logo-Vector.svg-.png",
      alt: "mongo db",
      width: 50,
      height: 55,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/500px-C_Programming_Language.svg.png?_=20201031132917",
      alt: "c",
      width: 50,
      height: 55,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-max bg-zinc-950 px-4 py-20 selection:bg-zinc-800">
      <header className="mb-12 text-center">
        <h1 className="font-black text-4xl sm:text-5xl tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
          My Tech Stack
        </h1>
        <div className="mx-auto mt-3 h-[2px] w-16 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80" />
      </header>

      {/* Main Glass-Morphic Box Wrapper */}
      <section className="relative w-full max-w-3xl h-[380px] sm:h-[460px] bg-gradient-to-b from-zinc-900/40 to-zinc-950/20 backdrop-blur-md border border-zinc-800/60 rounded-3xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] group hover:border-zinc-700/40 transition-all duration-700 overflow-hidden">
        {/* Fine-lined Grid Background Layer */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {/* Subtle Ambient Radial Highlight Top-Center */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-32 bg-red-500/5 blur-[80px] pointer-events-none rounded-full" />

        <FallingLogos logos={myLogos} trigger="auto" gravity={1.1} />
      </section>
    </div>
  );
}

export default Skills;
