import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function Navbar() {
  return (
    <nav className="font-sans h-15 flex w-screen justify-between bg-zinc-950 text-white items-center cursor-pointer">
      <h2 className="ml-10 font-bold text-2xl font-serif ">Welcome</h2>
      <div className="flex items-center w-xl justify-center justify-evenly">
        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}>
            <p className="hover:underline hover:text-red-400">Skills</p>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-red-400">Check my skills</p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}>
            <p className="hover:underline hover:text-yellow-500">Projects</p>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-yellow-500">Check my Projects</p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}>
            <p className="hover:underline hover:text-blue-400">Github</p>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-blue-400">Check my Github</p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}>
            <p className="hover:underline hover:text-green-400">Linkedin</p>
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
