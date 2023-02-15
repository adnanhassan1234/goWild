import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectStarterpackState = (state) => state.app || initialState;

const selectGreeting = createSelector(selectStarterpackState, (state) => state.greeting);
const selectPokemonList = createSelector(selectStarterpackState, (state) => state.pokemonList);

export { selectGreeting, selectPokemonList };
