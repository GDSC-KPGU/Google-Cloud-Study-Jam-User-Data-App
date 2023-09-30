import React from "react";
import Logo from "../assets/Gdsclogo.png";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Navbar() {
  return (
    <div>
      <nav className="bg-white border-b-2 border-gray-200 dark:bg-gray-900  border-opacity-50 flex">
        <div className="flex items-center justify-between   p-4 w-full">
          <Link to="/" className="flex items-center mx-[450px]"> {/* Link to the home page */}
            <img src={Logo} className="h-8 mr-3" alt="GDSC Logo" />
            <span className="sm:text-1xl lg:text-2xl font-semibold whitespace-nowrap dark:text-white text-center flex-grow">
              Google Cloud Study Jams - GDSC KPGU
            </span>
          </Link>
          <div className="flex items-center">
            <Link to="/contributors" className="text-blue-500 text-xl hover:underline mr-4">Contributors</Link> {/* Link to the Contributors page */}
            {/* Add more navigation links here if needed */}
          </div>
        </div>
      </nav>
    </div>
  );
}
