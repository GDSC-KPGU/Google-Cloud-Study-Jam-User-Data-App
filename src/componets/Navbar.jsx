/** @format */

import React from "react";
import Logo from "../assets/Gdsclogo.png";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-white border-b-2 border-gray-200 dark:bg-gray-900  border-opacity-50 flex">
        <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://gdsc.community.dev/drs-kiran-pallavi-patel-global-university-kpgu-vadodara/"
            className="flex items-center"
          >
            <img src={Logo} className="h-8 mr-3" alt="GDSC Logo" />
            <span className="self-center sm:text-1xl lg:text-2xl font-semibold whitespace-nowrap dark:text-white">
              Google Cloud Study Jams - GDSC KPGU
            </span>
          </a>
        </div>
      </nav>
    </div>
  );
}
