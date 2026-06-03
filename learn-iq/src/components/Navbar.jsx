import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false); // click ke baad menu band
    }
  };

  return (
    <div className="">
      <div className="flex justify-between text-white py-5 items-center ">
        
        {/* Logo */}
        <div className="mx-5 font-bold text-2xl sm:text-3xl sm:ml-20">
          Learn<span className="text-amber-400">IQ</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex sm:space-x-8 md:pr-20 font-bold">
          <li className="hover:text-amber-400" onClick={() => scrollToSection("home")}>
            <Link>Home</Link>
          </li>
          <li className="hover:text-amber-400" onClick={() => scrollToSection("about")}>
            <Link>About</Link>
          </li>
          <li className="hover:text-amber-400">
            <Link to="/test">Test</Link>
          </li>
          <li className="hover:text-amber-400" onClick={() => scrollToSection("contact")}>
            <Link>Contact</Link>
          </li>
          <li className="hover:text-amber-400">
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden mx-5">
          <i
            className="fa-solid fa-bars text-2xl cursor-pointer"
            onClick={() => setOpen(!open)}
          ></i>
        </div>
      </div>

      {/* 🔽 Mobile Dropdown Menu (YAHI THA MISSING PART) */}
      {open && (
        <ul className="sm:hidden bg-amber-400 text-white mx-5 rounded p-4 space-y-3 font-bold ">
          <li onClick={() => scrollToSection("home")}>Home</li>
          <li onClick={() => scrollToSection("about")}>About</li>
          <li>
            <Link to="/test" onClick={() => setOpen(false)}>Test</Link>
          </li>
          <li onClick={() => scrollToSection("contact")}>Contact</li>
          <li>
            <Link to="/signin" onClick={() => setOpen(false)}>Sign In</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
