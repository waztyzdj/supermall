import axios from 'axios'

/**
 * 此处封装axios组件，供项目中调用，如果后面不再使用axios组件，使用其他组件，直接修改改文件即可，不用修改项目中的代码
 */

export function request(config) {
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66",
    timeout: 5000
  });

  // 2. 拦截器的使用
  // 2.1 使用request拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  });

  // 2.1 使用response拦截器
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  });

  // 3. 发送真正的网络请求并返回Promise。可以拿到结果后调用resolve, rejected
  return instance(config);
}
