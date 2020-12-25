import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8080/timestatistics"
export function request(config) {
  const instance1 = axios.create({
    // baseURL: 'http://m.kugou.com',
    baseURL: 'http://localhost:8080/timestatistics',
    timeout: 20000
  })
  //请求拦截和响应拦截
  instance1.interceptors.request.use(config => {
    // console.log(config);
    if (window.localStorage.getItem("token")) {
      config.headers.common['Authorization'] = window.localStorage.getItem("token");
    }
    return config;
  }, err => {
    // console.log(err);
  })
  instance1.interceptors.response.use(res => {
    // console.log(res.data);
    return res.data;
  }, err => {
    console.log(err);
  })
  //axios.create的返回值是一个promise对象！
  return instance1(config);
}
