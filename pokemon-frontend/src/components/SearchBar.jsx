import React from "react";

const SearchBar = ({
  pokemonName,
  setPokemonName,
  searchPokemon,
}) => {

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-10">

      <input
        type="text"
        placeholder="Search Pokemon..."
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchPokemon();
          }
        }}
        className="w-full md:w-[400px] px-5 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white outline-none focus:border-yellow-400"
      />
     <button
        onClick={searchPokemon}
        className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-xl transition duration-300"
      >
        Search
      </button>

    </div>
  );
};

export default SearchBar;