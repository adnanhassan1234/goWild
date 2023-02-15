import { SET_APP_DATA, CLEAR_APP_DATA } from "./types";

export const setAppData = (appData) => ({
  type: SET_APP_DATA,
  payload: appData,
});

export const clearAppData = () => ({
  type: CLEAR_APP_DATA,
});
