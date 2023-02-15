import axios from "axios";
import { API_URL, ENDPOINT } from "config/constants";

const getHomeData = (headers, data, printConsole = false) => {
  const endpoint = ENDPOINT.get_home_data;
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    // .then((response) => {
    //   if (printConsole) console.log(`${endpoint}: ${JSON.stringify(response)}`);

    //   return response.data;
    // })
    // .catch((error) => {
    //   if (printConsole) console.log(`${endpoint}: ${error.message}`);
    //   return error.response.data;
    // });
};

const getProfileDetail = (headers, data, printConsole = false) => {
  const endpoint = ENDPOINT.get_profile_detail;
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      if (printConsole) console.log(`${endpoint}: ${JSON.stringify(response)}`);

      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);
      return error.response.data;
    });
};

const sendLike = (headers, data, printConsole = false) => {
  const endpoint = ENDPOINT.send_like;
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      if (printConsole) console.log(`${endpoint}: ${JSON.stringify(response)}`);

      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);

      return error.response.data;
    });
};

const sendUnMatch = (headers, data, printConsole = false) => {
  const endpoint = ENDPOINT.send_unmatch;
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      if (printConsole) console.log(`${endpoint}: ${JSON.stringify(response)}`);

      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);
      return error.response.data;
    });
};

const sendAppearFirst = (headers, data, printConsole = false) => {
  const endpoint = ENDPOINT.send_appear_first;
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      if (printConsole) console.log(`${endpoint}: ${JSON.stringify(response)}`);

      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);
      return error.response.data;
    });
};

const sendBlock = (headers, data, printConsole = false) => {
  const endpoint = ENDPOINT.send_block;
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      if (printConsole) console.log(`${endpoint}: ${JSON.stringify(response)}`);

      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);
      return error.response.data;
    });
};

const sendUnBlock = (headers, data, printConsole = false) => {
  const endpoint = ENDPOINT.send_unblock;
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      if (printConsole) console.log(`${endpoint}: ${JSON.stringify(response)}`);

      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);
      return error.response.data;
    });
};

const sendFavorite = (headers, data, printConsole = false) => {
  const endpoint = ENDPOINT.send_favorite;
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      if (printConsole) console.log(`${endpoint}: ${JSON.stringify(response)}`);

      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);
      return error.response.data;
    });
};

const sendGiftInvite = (headers, data, printConsole = false) => {
  const endpoint = ENDPOINT.send_gift_invite;
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      if (printConsole) console.log(`${endpoint}: ${JSON.stringify(response)}`);

      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);
      return error.response.data;
    });
};

const getRewind = (headers) => {
  return axios.get(ENDPOINT.get_rewind, {
    headers: headers,
  });
};

const getBlockList = (headers) => {
  return axios.get(ENDPOINT.get_blocklist, {
    headers: headers,
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getHomeData,
  getProfileDetail,
  sendLike,
  sendUnMatch,
  sendAppearFirst,
  sendBlock,
  sendUnBlock,
  sendFavorite,
  sendGiftInvite,
  getRewind,
  getBlockList,
};
