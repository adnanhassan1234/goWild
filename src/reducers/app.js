import { SET_APP_DATA, CLEAR_APP_DATA } from "../actions/types";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_APP_DATA:
      return { appData: payload };

    case CLEAR_APP_DATA:
      return { appData: "" };

    default:
      return state;
  }
}
