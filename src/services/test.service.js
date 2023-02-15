import axios from "axios";
import { ENDPOINT } from "config/constants";

const testAPI = (endpoint, headers, data, printConsole = false) => {
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      if (printConsole) console.log(`${endpoint}: ${JSON.stringify(response)}`);

      if (endpoint === ENDPOINT.login) {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      }

      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);
      return error.response.data;
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  testAPI,
};
