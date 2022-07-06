import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";

//pass new generated access token here
const token = accessToken;

//apply base url for axios
const API_URL = "https://stgn.appsndevs.com/snapcident/users/";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export async function get(url,data) {
 let tokenData=JSON.parse(localStorage.getItem("authUser"))?.data.token
const headerstoken= {
  headers: {
  'Authorization': `Bearer ${tokenData}` 
}
}
   return await axiosApi.get(url, { ...headerstoken }).then(response => response.data);
}
export async function post(url, data) {
 let tokenData=JSON.parse(localStorage.getItem("authUser"))?.data.token
 console.log(data,"dataaaaaaaaaaaaaaaaaaaaaaaaaa")
  const headerstoken= {
    headers: {
      // "Content-Type": "application/json",
    'Authorization': `Bearer ${tokenData}` 
  }
  }
  console.log("get token",headerstoken)
  return axiosApi
    .post(url, { ...data },{ ...headerstoken } )
    .then(response => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}
