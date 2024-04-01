// 用户相关的所有请求
import request from "../utils/request";

// 登录
export function Login({ username, password }) {
  // console.log(1131);
  // console.log(data, "data");
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
// 新建游记
export function AddTravel(data) {
  return request({
    url: `/users/addTravelNote`,
    method: "POST",
    data,
  });
}
