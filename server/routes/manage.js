var express = require("express");
var router = express.Router();
let {
  getArticleByState,
  updateArticleState,
  deleteArticle_manage,
  addDeleteArticleList,
} = require("../serve/server");

// /api/manage

// 通过不同的游记状态作筛选
router.get("/getTravelListByStatus", function (req, res, next) {
  const { state } = req.query;
  getArticleByState(state).then(
    (result) => {
      res.json({
        code: 200,
        data: result,
        msg: "获取成功",
      });
    },
    (err) => {
      res.json({
        code: 400,
        msg: err,
      });
    }
  );
});
// 管理员登录后台，账号密码固定，如果都是admin则为超级管理员，否则为普通管理员
let jwt = require("jsonwebtoken");
router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  console.log(username, password, "username, password");
  let token = ''
  // 审核人员：user/user
  // 管理员：admin/admin
  if (username === "admin" && password === "admin") {
     token = jwt.sign({ username: "admin" }, "testkey", {
      expiresIn: "30d",
      algorithm: "HS256",
    });
    res.json({
      code: 200,
      data: {
        role: "admin", // 后面根据这个字段判断是管理员还是审核员
      },
      token,
      msg: "管理员欢迎您",
    });
  } else if (username === "user" && password === "user") {
    token = jwt.sign({ username: "admin" }, "testkey", {
      expiresIn: "30d",
      algorithm: "HS256",
    });
    res.json({
      code: 200,
      data: {
        role: "user",
      },
      token,
      msg: "审核员欢迎您",
    });
  } else {
    res.json({
      code: 400,
      msg: "用户名或密码错误",
    });
  }
});
// 更新游记状态
router.put("/updateTravelStatus", function (req, res, next) {
  const { articleId, state, rejectReason } = req.body;
  console.log(articleId, state,rejectReason, "articleId, state,rejectReason");
  updateArticleState(articleId, state, rejectReason).then(
    (result) => {
      res.json({
        code: 200,
        data: result,
        msg: "更新成功",
      });
    },
    (err) => {
      res.json({
        code: 400,
        msg: err,
      });
    }
  );
});
// 删除游记
router.delete("/deleteTravelNote", function (req, res, next) {
  const { articleId } = req.body;
  deleteArticle_manage(articleId).then(
    (result) => {
      // 直接放result会报错,result里面还有其他自己添加的东西
      const {
        articleId,
        comment,
        content,
        picture,
        position,
        see,
        state,
        tags,
        time,
        video,
      } = result;
      addDeleteArticleList({
        articleId,
        comment,
        content,
        picture,
        position,
        see,
        state,
        tags,
        time,
        video,
      }).then(
        (result) => {
          res.json({
            code: 200,
            data: result,
            msg: "删除成功",
          });
        },
        (err) => {
          res.json({
            code: 400,
            msg: "删除失败",
            data: err,
          });
        }
      );
    },
    (err) => {
      res.json({
        code: 400,
        msg: err,
      });
    }
  );
});

module.exports = router;
