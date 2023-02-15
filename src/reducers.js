import { combineReducers } from "redux";

import appReducer from "Containers/App/reducer";
// import appLocalReducer, { storedKey as storedAppLocalState } from "Containers/AppLocal/reducer";
import { mapWithPersistor } from "./persistence";

// * reducers that will stored to localStorage
const storedReducers = {
  // appLocal: { reducer: appLocalReducer, whitelist: storedAppLocalState },
};

const temporaryReducers = {
  app: appReducer,
};

export default function createRecuer() {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });

  /* eslint-disable no-param-reassign */
  const rootReducer = (state, action) => {
    return coreReducer(state, action);
  };

  return rootReducer;
}
