import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 z-20 mx-auto flex w-full h-16 items-center justify-between gap-6 border-b border-white/10 bg-zinc-950/95 px-6 py-4 backdrop-blur-md text-slate-100">
      <div className="flex items-center gap-3">
        <div>
          <Link
            to="/"
            className="inline-block transition-transform duration-500 ease-out hover:scale-110 cursor-pointer text-base pt-1 pb-1 font-medium tracking-[0.18em] text-slate-400 uppercase"
          >
            Suraj Thapa
          </Link>
        </div>
      </div>

      <div className="hidden items-center gap-8 text-sm uppercase tracking-[0.18em] text-slate-400 md:flex">
        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}>
            <NavLink
              to="/skills"
              className={({ isActive }) =>
                `cursor-pointer transition-all duration-300 hover:underline hover:text-red-400 hover:drop-shadow-[0_0_8px_#f87171] ${
                  isActive
                    ? "text-red-400 underline drop-shadow-[0_0_8px_#f87171]"
                    : "text-slate-400"
                }`
              }
            >
              Skills
            </NavLink>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-red-400">Check my skills</p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}>
            <p className="cursor-pointer transition-all duration-300 hover:underline hover:text-yellow-500 hover:drop-shadow-[0_0_8px_#eab308]">
              Projects
            </p>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-yellow-500">Check my Projects</p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}>
            <p className="cursor-pointer transition-all duration-300 hover:underline hover:text-blue-400 hover:drop-shadow-[0_0_8px_#60a5fa]">
              Github
            </p>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-blue-400">Check my Github</p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}>
            <p className="cursor-pointer transition-all duration-300 hover:underline hover:text-green-400 hover:drop-shadow-[0_0_8px_#4ade80]">
              Linkedin
            </p>{" "}
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
