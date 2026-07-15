import FallingLogos from "./ui/FallingText";

function Skills() {
  const myLogos = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png",
      alt: "react",
      width: 70,
      height: 60,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/960px-HTML5_logo_and_wordmark.svg.png",
      alt: "html",
      width: 55,
      height: 60,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/500px-CSS3_logo_and_wordmark.svg.png?_=20160530175649",
      alt: "css",
      width: 55,
      height: 60,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      alt: "js",
      width: 55,
      height: 50,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/3840px-Node.js_logo.svg.png",
      alt: "js",
      width: 80,
      height: 55,
    },
    {
      src: "https://www.manektech.com/storage/developer/1646733543.webp",
      alt: "expres",
      width: 60,
      height: 60,
    },
    {
      src: "https://cdn3d.iconscout.com/3d/free/thumb/free-java-3d-icon-png-download-7578017.png",
      alt: "java",
      width: 70,
      height: 70,
    },
    {
      src: "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png",
      alt: "redux",
      width: 70,
      height: 70,
    },
    {
      src: "https://static.vecteezy.com/system/resources/previews/067/565/433/non_2x/tailwind-css-logo-rounded-free-png.png",
      alt: "tailwind css",
      width: 80,
      height: 80,
    },
    {
      src: "https://static.vecteezy.com/system/resources/thumbnails/060/194/946/small_2x/typescript-programming-language-3d-icon-transparent-background-free-png.png",
      alt: "ts",
      width: 80,
      height: 80,
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center min-h-max bg-zinc-950 px-4 py-16">
      <header className="mb-10 text-center">
        <h1 className="font-extrabold text-4xl sm:text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500">
          Skills
        </h1>
        <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-red-500 blur-[1px]" />
      </header>

      <section className="relative w-full max-w-4xl h-[350px] sm:h-[450px] bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/80 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.7)] group hover:border-zinc-700/50 transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a12_1px,transparent_1px),linear-gradient(to_bottom,#27272a12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <FallingLogos logos={myLogos} trigger="auto" gravity={1.2} />
      </section>
    </div>
  );
}

export default Skills;
