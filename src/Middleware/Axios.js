import axios from "axios";
import LocalStorageService from "./LocalStorageService";
import config from "../config";

// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    if (!localStorageService.isLoggedIn()) {
      window.location.href = "/login";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const httpClient = axios.create({
  baseURL: config.apiGateway.BASE_URL,
  timeout: 10000,
});

export default httpClient;

// //Add a response interceptor

// axios.interceptors.response.use((response) => {
//    return response
// }, function (error) {
//    const originalRequest = error.config;

//    if (error.response.status === 401 && originalRequest.url ===
// 'http://13.232.130.60:8081/v1/auth/token) {
//        router.push('/login');
//        return Promise.reject(error);
//    }

//    if (error.response.status === 401 && !originalRequest._retry) {

//        originalRequest._retry = true;
//        const refreshToken = localStorageService.getRefreshToken();
//        return axios.post('/auth/token',
//            {
//                "refresh_token": refreshToken
//            })
//            .then(res => {
//                if (res.status === 201) {
//                    localStorageService.setToken(res.data);
//                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
//                    return axios(originalRequest);
//                }
//            })
//    }
//    return Promise.reject(error);
// });
