import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function Navbar() {
  return (
    <nav className="sticky top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between gap-6 border-b border-white/10 bg-zinc-950/95 px-6 py-4 backdrop-blur-md text-slate-100">
      <div className="flex items-center gap-3">
        <div>
          <p className=" transition-transform duration-500 ease-out hover:scale-110 cursor-pointer text-ml pt-1 pb-1 font-medium tracking-[0.18em] text-slate-400 uppercase">
            Suraj Thapa
          </p>
        </div>
      </div>

      <div className="hidden items-center gap-8 text-sm uppercase tracking-[0.18em] text-slate-400 md:flex">

        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}>
            <p className="hover:underline hover:text-red-400 cursor-pointer ">Skills</p>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-red-400">Check my skills</p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}>
            <p className="hover:underline hover:text-yellow-500 cursor-pointer">Projects</p>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-yellow-500">Check my Projects</p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}>
            <p className="hover:underline hover:text-blue-400 cursor-pointer">Github</p>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-blue-400">Check my Github</p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}>
            <p className="hover:underline hover:text-green-400 cursor-pointer">Linkedin</p>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-green-400">Check my Linkedin</p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </nav>
  );
}

export default Navbar;
