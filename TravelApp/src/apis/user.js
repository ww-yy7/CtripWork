// 用户相关的所有请求
import request from "../utils/request";

// 登录
export function Login({username, password}) {
  return request({
    url: `/users/login`,
    method: "GET",
    params: {username,password},
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
// 更新游记
export function UpdateTravel(data) {
  return request({
    url: `/users/updateTravelNote`,
    method: "PUT",
    data,
  });
}

// 获取游记数据
export function getAllTravelNote(params = {}) {
  return request.get('/users/getAllTravelNote', { params })
    .then((response) => {
      if (response.data.code === 200) {
        return response.data.resultList;
      } else {
        throw new Error(response.data.reason);
      }
    })
    .catch((error) => {
      console.error('获取游记失败：', error.message || error.response?.data);
      throw error;
    });
}

// 搜索游记(模糊搜索)
export function searchTravelNote(searchInfo) {
  return request({
    url: '/users/searchTravelNote', // 你的后端接口路径
    method: 'GET', // 请求方法
    params: { searchInfo }, // 将搜索信息作为查询参数
  })
  .then((response) => {
    if (response.data.code === 200) {
      // 查询成功，返回结果列表
      return response.data.resultList;
    } else {
      // 查询失败，抛出错误
      throw new Error(response.data.msg);
    }
  })
  .catch((error) => {
    // 处理请求失败的情况
    console.error('查询游记失败:', error.message || error);
    throw error;
  });
}

// 删除游记
export function deleteTravelNote(articleId) {
  return request({
    url: '/users/deleteTravelNote', // 你的后端接口路径
    method: 'DELETE', // 请求方法（根据你的接口应为 DELETE）
    data: { articleId }, // 将文章ID作为请求体数据
  })
  .then((response) => {
    if (response.data.code === 200) {
      // 删除成功，返回结果
      return response.data.resultList;
    } else {
      // 删除失败，抛出错误
      throw new Error(response.data.msg);
    }
  })
  .catch((error) => {
    // 处理请求失败的情况
    console.error('删除游记失败:', error.message || error);
    throw error;
  });
}

// 更新用户个人信息
export function updateUserInfo(data) {
  // console.log(data, "data");
  return request({
    url: `/users/updateUserInfo`,
    method: "PUT",
    data,
  });
}

// 更新个人签名
export function updateSignature(data) {
  return request({
    url: `/users/updateIntroduction`,
    method: "PUT",
    data,
  });
}

// 提交评论
export function submitComment(data) {
  return request({
    url: `/users/commentTravelNote`,
    method: "PUT",
    data,
  });
}
