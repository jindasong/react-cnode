import axios from 'axios';

let http = axios.create({
  baseURL: '//cnodejs.org/api/v1'
});

http.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
  let { data } = response;
  let { success } = data;
  if (!success) return Promise.reject(data);
  return data;
}, function (error) {
  return Promise.reject(error);
});

export default http;