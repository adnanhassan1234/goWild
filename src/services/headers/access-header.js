import { KEY } from "config/constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default function accessHeader(extraHeaders = {}) {
  const defaultHeaders = {
    Accept: "application/json",
    KEY: KEY,
  };

  const accessHeader = { ...defaultHeaders, ...extraHeaders };

  return accessHeader;
}
