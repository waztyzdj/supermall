import { request } from "./request";

// 该文件用于统一管理home组件所有的网络请求，便于维护。
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  });
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type, page
    }
  });
}
