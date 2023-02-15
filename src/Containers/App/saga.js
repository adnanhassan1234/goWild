import { takeLatest, call, put } from "redux-saga/effects";
import { GET_POKEMON_LIST } from "./constants";
import { setPokemonList } from "./actions";
import { getPokemonList } from "Domain/api";

export function* doGetPokemon() {
  try {
    const pokemon = yield call(getPokemonList);
    if (pokemon) {
      yield put(setPokemonList(pokemon));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* appSaga() {
  yield takeLatest(GET_POKEMON_LIST, doGetPokemon);
}
