import { APP_GREETING, GET_POKEMON_LIST, SET_POKEMON_LIST } from "./constants";

export function greeting(greeting) {
  return {
    type: APP_GREETING,
    greeting,
  };
}

export function getPokemonList() {
  return {
    type: GET_POKEMON_LIST,
  };
}

export function setPokemonList(pokemonList) {
  return {
    type: SET_POKEMON_LIST,
    pokemonList,
  };
}
