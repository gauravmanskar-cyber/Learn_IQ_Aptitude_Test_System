import axios from "axios";

const API_BASE_URL = "http://localhost:9090/api/pokemon";

export const getPokemon = async (pokemonName) => {

  const response = await axios.get(
    `${API_BASE_URL}/${pokemonName}`
  );

  return response.data;
};