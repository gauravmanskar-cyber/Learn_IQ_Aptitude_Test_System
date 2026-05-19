import React, { useState } from "react";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

import { getPokemon } from "./services/pokemonService";

function App() {
  const [pokemonName, setPokemonName] = useState("");

  const [pokemonData, setPokemonData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const searchPokemon = async () => {
    if (!pokemonName.trim()) {
      setError("Please enter pokemon name");

      setPokemonData(null);

      return;
    }

    try {
      setLoading(true);

      setError("");

      const data = await getPokemon(pokemonName.toLowerCase());

      setPokemonData(data);
    } catch (error) {
      setError("Pokemon not found");

      setPokemonData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            Search Your Favorite Pokemon
          </h1>

          <p className="text-slate-400 text-lg">
            Powered by React + Spring Boot + PokeAPI
          </p>
        </div>

        <SearchBar
          pokemonName={pokemonName}
          setPokemonName={setPokemonName}
          searchPokemon={searchPokemon}
        />

        {loading && <Loader />}

        {error && <ErrorMessage error={error} />}

        {pokemonData && <PokemonCard pokemon={pokemonData} />}
      </div>
    </div>
  );
}

export default App;
