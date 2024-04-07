// axios的封装处理
import axios from "axios"

// 1. 根域名配置
const request = axios.create({
  baseURL: 'http://10.100.197.143:3000/api',
  timeout: 5000
})


export default request
