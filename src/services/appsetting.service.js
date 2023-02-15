import axios from "axios";
import { API_URL, ENDPOINT } from "config/constants";

const getConvertCoins = (headers) => {
  return axios.get(ENDPOINT.convert_coin, {
    headers: headers,
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getConvertCoins,
};
