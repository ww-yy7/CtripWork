// axios的封装处理
import axios from "axios"

// 1. 根域名配置
const request = axios.create({
  baseURL: 'http://localhost:3000/api',
  // baseURL: 'http://10.100.244.76:3000/api',
  timeout: 10000
})


export default request
