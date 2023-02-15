import axios from "axios";
import { ENDPOINT } from "config/constants";
import authHeader from "./headers/auth-header";

const getUserContent = () => {
  return axios.get(ENDPOINT.login + "admin", { headers: authHeader() });
};

const getUserProfile = (endpoint, headers, data, printConsole = false) => {
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
      return false;
    });
};

const getEmojiList = () => {
  return axios.get(ENDPOINT.get_emoji_list, { headers: authHeader() });
};

const setMood = (endpoint, headers, data, printConsole = false) => {
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);
      return false;
    });
};

const getBlocked = () => {
  return axios.get(ENDPOINT.get_blocklist, { headers: authHeader() });
}

const unBlock = (endpoint, headers, data, printConsole = false) => {
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);
      return false;
    });
};

const getWishlist = () => {
  return axios.get(ENDPOINT.get_emoji_list, { headers: authHeader() });
};

const getAllGifts = () => {
  return axios.get(ENDPOINT.get_gift_list, { headers: authHeader() });
};

const setMyGiftInvitation = (endpoint, headers, data, printConsole = false) => {
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);
      return false;
    });
};

const getLookings = () => {
  return axios.get(ENDPOINT.suggest_looking, { headers: authHeader() });
};

const getHobbies = (endpoint, headers, data, printConsole = false) => {
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);
      return false;
    });
};


const postLookings = (endpoint, headers, data, printConsole = false) => {
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);
      return false;
    });
};

const getCountries =  () => {
  return axios.get(ENDPOINT.get_countries, { headers: authHeader() });
};


const updateProfile = (endpoint, headers, data, printConsole = false) => {
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (printConsole) console.log(`${endpoint}: ${error.message}`);
      return false;
    });
};

const getSameLanguage =  () => {
  return axios.get(ENDPOINT.sameLang, { headers: authHeader() });
};

const boostProfile = (endpoint, headers, data, printConsole = false) => {
  return axios
      .post(endpoint, data, {
        headers: headers,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (printConsole) console.log(`${endpoint}: ${error.message}`);
        return false;
      });
};

const boostWorldWide =  () => {
  return axios.get(ENDPOINT.boostWorldWide, { headers: authHeader() });
};

const bigSpenderFirst =  () => {
  return axios.get(ENDPOINT.bigSpenderFirst, { headers: authHeader() });
};

const filter_ageRange = (endpoint, headers, data, printConsole = false) => {
  return axios
      .post(endpoint, data, {
        headers: headers,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (printConsole) console.log(`${endpoint}: ${error.message}`);
        return false;
      });
};

const filter_setDistance = (endpoint, headers, data, printConsole = false) => {
  return axios
      .post(endpoint, data, {
        headers: headers,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (printConsole) console.log(`${endpoint}: ${error.message}`);
        return false;
      });
};

const filter_sameReligion =  () => {
  return axios.get(ENDPOINT.sameReligion, { headers: authHeader() });
};

const getUserProfileDate = () => {
  return axios.get(ENDPOINT.get_profile, {headers: authHeader()})
};

const filter_sameCountry =  () => {
  return axios.get(ENDPOINT.sameCountry, { headers: authHeader() });
};

const filter_withChildren =  () => {
  return axios.get(ENDPOINT.withChildren, { headers: authHeader() });
};

const filter_withAnimals =  () => {
  return axios.get(ENDPOINT.withAnimals, { headers: authHeader() });
};

const filter_smokers =  () => {
  return axios.get(ENDPOINT.smokers, { headers: authHeader() });
};


const getWithdawlMethod =  () => {
  return axios.get(ENDPOINT.withdraw_get_payment_option, { headers: authHeader() });
};



const getAllInvitations = () => {
  return axios.get(ENDPOINT.get_invitation_list, {headers:authHeader()});
}


const visitGallery = (endpoint, headers, data, printConsole = false) => {
  return axios
    .post(endpoint, data, {
      headers: headers,
    })
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUserContent,
  getUserProfile,
  getEmojiList,
  setMood,
  getBlocked,
  unBlock,
  getWishlist,
  getAllGifts,
  setMyGiftInvitation,
  getLookings,
  postLookings,
  getCountries,
  updateProfile,
  getAllInvitations,
  getSameLanguage,
  boostProfile,
  boostWorldWide,
  bigSpenderFirst,
  filter_ageRange,
  filter_setDistance,
  filter_sameReligion,
  filter_sameCountry,
  filter_withChildren,
  filter_withAnimals,
  filter_smokers,
  getWithdawlMethod,
  getHobbies,
  visitGallery,
  getUserProfileDate
};
