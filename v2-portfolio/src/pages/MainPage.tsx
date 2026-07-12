import Navbar from "@/components/Navbar";
import React from "react";

function MainPage() {
  return (
    <div className="w-full overflow-hidden">
      <Navbar />
      <div className="w-screen">
        {/* <h2 className="">Suraj</h2> */}
        <img className="w-full h-full object-cover" src="/animeWP.jpg" alt="" />
      </div>
    </div>
  );
}

export default MainPage;
