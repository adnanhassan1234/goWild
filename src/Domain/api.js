import axios from "axios";

const urls = {
  pokemon: "https://pokeapi.co/api/v2/pokemon",
};

export const callAPI = (
    endpoint,
    method,
    headers = {},
    params = {},
    data = {}
) => {
  const options = {
    url: endpoint,
    method,
    headers,
    data,
    params,
  };

  return axios(options).then((response) => {
    // console.log(response);
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const getPokemonList = () => callAPI(urls.pokemon, "get");
