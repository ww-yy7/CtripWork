// 用户相关的所有请求
import request from "../utils/request";

// 登录
export function Login({ username, password }) {
  return request({
    url: `/users/login`,
    method: "GET",
    params: { username, password },
  });
}

// 注册
export function Register(data) {
  return request({
    url: `/users/register`,
    method: "POST",
    data,
  });
}
//用户名重复校验
export function checkUsername(username) {
  return request({
    url: `/users/checkUsername`,
    method: "GET",
    params: { username },
  });
}
// 新建游记
export function AddTravel(data) {
  return request({
    url: `/users/addTravelNote`,
    method: "POST",
    data,
  });
}
