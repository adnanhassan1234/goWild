import { combineReducers } from "redux";

import appReducer from "Containers/App/reducer";
// import appLocalReducer, { storedKey as storedAppLocalState } from "Containers/AppLocal/reducer";
import { mapWithPersistor } from "../persistence";

//Reducers
import auth from "./auth";
import message from "./message";
import app from "./app";

// * reducers that will stored to localStorage
const storedReducers = {
  // appLocal: { reducer: appLocalReducer, whitelist: storedAppLocalState },
};

const temporaryReducers = {
  app: appReducer,
};

export default function createReducer() {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
    auth,
    message,
    app,
  });

  /* eslint-disable no-param-reassign */
  const rootReducer = (state, action) => {
    return coreReducer(state, action);
  };

  return rootReducer;
}
