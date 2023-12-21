import axios from "axios";

const AxiosReq = axios.create({
  // baseURL: "http://172.28.26.146:1715/",
  // baseURL: "http://172.28.26.187:1715/",
  baseURL: "https://apicentral.laotel.com/",
});

export const AxiosCheck = axios.create({
  // baseURL: "http://172.28.26.146:1715/",
  // baseURL: "http://172.28.26.187:1715/",
  baseURL: "http://172.28.26.146:4001/",
});
export default AxiosReq;
