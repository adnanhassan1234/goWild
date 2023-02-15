import { all } from "redux-saga/effects";

import appSaga from "Containers/App/saga";

export default function* rootSaga() {
  yield all([appSaga()]);
}
