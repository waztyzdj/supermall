/**
 * TODO 防抖函数，用于减少函数的频繁调用
 * @param func
 * @param delay
 */
export default function (func, delay) {
  let timer = null
  return function(...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
