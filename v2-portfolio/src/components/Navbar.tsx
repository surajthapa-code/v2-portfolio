import React from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function Navbar() {
  return (
    <nav className="flex w-screen justify-between bg-amber-500 cursor-pointer hover:underline">
      <h2 className="font-xl ">Hey</h2>
      <div className="flex items-center w-xl justify-center justify-evenly">
        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}>
            Github
          </HoverCardTrigger>
          <HoverCardContent><p className="hover:underline">Check my Github</p></HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger delay={100} closeDelay={200}>
            Linkedin
          </HoverCardTrigger>
          <HoverCardContent><p className="hover:underline">Check my Linkedin</p></HoverCardContent>
        </HoverCard>
      </div>
    </nav>
  );
}

export default Navbar;
