// 用户相关的所有请求
import { request } from "../utils";

/* ----------------------------------------------new_for_trip_plat-------------------------------------------------------------------------------- */
// 登录
export function getLogin(data) {
  return request({
    url: `/manage/login`,
    method: "POST",
    data,
  });
}

// 获取游记列表(ALL)
export function getAllTravelNote() {
  return request({
    url: `/users/getAllTravelNote`,
    method: "GET",
  });
}
// 根据articleId获取游记
export function getTravelNoteById(articleId) {
  return request({
    url: `/users/getAllTravelNote`,
    method: "GET",
    params: {articleId},
  });
}

// 修改游记状态
export function changeArticleState(data) {
  return request({
    url: `/manage/updateTravelStatus`,
    method: "PUT",
    data,
  });
}

// 删除游记
export function deleteTravelNote(data) {
  return request({
    url: `/manage/deleteTravelNote`,
    method: "DELETE",
    data
  });
}

// 通过游记状态获取游记
export function getArticleByState(state) {
  return request({
    url: `/manage/getTravelListByStatus`,
    method: "GET",
    params: state,
  });
}