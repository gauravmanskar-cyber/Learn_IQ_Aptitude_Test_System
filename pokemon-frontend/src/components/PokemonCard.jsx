import React from "react";

const PokemonCard = ({ pokemon }) => {
  if (!pokemon) {
    return null;
  }
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
      <div className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div>
            <img
              src={pokemon?.sprites?.other?.["official-artwork"]?.front_default}
              alt={pokemon?.name}
            />
          </div>

          <div className="text-white flex-1">
            <h2 className="text-5xl font-bold capitalize text-yellow-400 mb-4">
              {pokemon.name}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-700 p-4 rounded-xl">
                <p className="text-slate-300">Height</p>
                <h3 className="text-2xl font-bold">{pokemon.height}</h3>
              </div>

              <div className="bg-slate-700 p-4 rounded-xl">
                <p className="text-slate-300">Weight</p>
                <h3 className="text-2xl font-bold">{pokemon.weight}</h3>
              </div>

              <div className="bg-slate-700 p-4 rounded-xl">
                <p className="text-slate-300">Base Experience</p>
                <h3 className="text-2xl font-bold">
                  {pokemon.base_experience}
                </h3>
              </div>

              <div className="bg-slate-700 p-4 rounded-xl">
                <p className="text-slate-300">Order</p>
                <h3 className="text-2xl font-bold">{pokemon.order}</h3>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-3 text-cyan-400">Types</h3>

              <div className="flex flex-wrap gap-3">
                {pokemon?.types?.map((typeItem, index) => (
                  <span
                    key={index}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold capitalize"
                  >
                    {typeItem?.type?.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-3 text-pink-400">
                Abilities
              </h3>

              <div className="flex flex-wrap gap-3">
                {pokemon?.abilities?.map((abilityItem, index) => (
                  <span
                    key={index}
                    className="bg-slate-600 px-4 py-2 rounded-full capitalize"
                  >
                    {abilityItem?.ability?.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-3xl text-green-400 font-bold mb-6 text-center">
            Stats
          </h3>

          <div className="space-y-5">
            {pokemon?.stats?.map((statItem, index) => (
              <div key={index}>
                <div className="flex justify-between text-white mb-2">
                  <span className="capitalize font-semibold">
                    {statItem?.stat?.name}
                  </span>

                  <span>{statItem?.base_stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
