import { KEY } from "config/constants";
// eslint-disable-next-line import/no-anonymous-default-export
export default function authHeader(extraHeaders = {}) {
  let token = '';
  if(localStorage.hasOwnProperty('token')){
    token = localStorage.getItem('token');
  }
  if(localStorage.hasOwnProperty('socialUser')){
    token = JSON.parse(localStorage.getItem('socialUser')).token;
  }
  if(localStorage.hasOwnProperty('user')){
    token = JSON.parse(localStorage.getItem("user")).token
  }
  let authHeader = {
    Accept: "application/json",
    KEY: KEY,
    Authorization: "Bearer " + token,
  };
  return (authHeader = { ...authHeader, ...extraHeaders });
}
