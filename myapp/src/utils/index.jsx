// axios 做二次封装的
import axios from "axios";
import { Button, Space, Toast } from 'antd-mobile';
// import { Toast } from "antd-mobile";
const instance = axios.create({
    baseURL: "http://localhost:3000/",
});
// let obj = "";
// 添加请求拦截器   添加loding的图标

// instance.interceptors.request.use(
//   function (config) {
//     obj = Toast.show({
//       icon: "loading",
//       content: "加载中。。。",
//     });
//     // 在发送请求之前做些什么
//     return config;
//   },
//   function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   }
// );
// 路由


// 添加响应拦截器
// instance.interceptors.response.use(
//   function (response) {
//     obj.close();
//     // 对响应数据做点什么
//     //console.log(response);
//     // if (response.status == 200) return response.data.data;
//     return response; // 我们想要的打他的数据
//   },
//   function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   }
// );

export default instance;
//  timeout  baseurl
//请求拦截 （ 记载中）
//相应拦截  (直接返回数据)
