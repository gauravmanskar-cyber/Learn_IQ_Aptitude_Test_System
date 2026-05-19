import React from "react";

const Navbar = () => {
  return (
    <div className="bg-slate-900 shadow-lg border-b border-slate-700">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-3xl font-bold text-yellow-400 tracking-wide">
          Pokemon Pokedex
        </h1>

        <p className="text-slate-300 text-sm">
          React + Spring Boot
        </p>

      </div>

    </div>
  );
};

export default Navbar;