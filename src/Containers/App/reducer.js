import produce from "immer";

import { APP_GREETING, SET_POKEMON_LIST } from "./constants";

export const initialState = {
  greeting: "Hi from web!",
  pokemonList: null,
};

export const storedKey = ["greeting"];

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case APP_GREETING:
        draft.greeting = action.greeting;
        break;
      case SET_POKEMON_LIST:
        draft.pokemonList = action.pokemonList;
        break;
    }
  });

export default appReducer;
