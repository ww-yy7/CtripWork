// 用户信息表（负责移动端的各项数据）
// /api/users
var express = require("express");
var router = express.Router();
let {
  createUserInfo,
  createArticle,
  deleteArticle,
  findArticle,
  updateArticle,
  searchArticle,
  updateUserInfo,
  commentArticle,
  updateIntroduction,
  UserInfo,
} = require("../serve/server");
const bcrypt = require("bcrypt");

// token校验
const tokenVerify = (token) => {
  // 验证 Token
  // 用于签名和验证 JWT 的密钥
  // const secretKey = "testkey";
  let flag;
  jwt.verify(token, (secretKey = "testkey"), (err, decoded) => {
    if (err) {
      // 如果 Token 验证失败，err 将包含错误信息
      // 错误信息可能是 Token 过期（expired），或者 Token 签名无效等
      console.log(err.message, "why wrong");
      // return false;
      flag = false;
      // return res.status(401).json({ message: "Token is invalid or expired" });
    } else {
      flag = true;
    }
  });
  return flag;
};

/* 注册请求 */
router.post("/register", function (req, res, next) {
  console.log(req.body, "注册信息");
  createUserInfo({
    ...req.body,
    article: [],
  })
    .then((result) => {
      res.json({
        code: 200,
        msg: "注册成功",
        // newUserInfo: req.body,
        message: result,
      });
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: "注册失败",
        newUserInfo: null,
        message: err,
      });
    });
});

/* 判断用户名是否重复 */
router.get("/checkUsername", function (req, res, next) {
  console.log(req.query, "checkUsername");
  let { username } = req.query;
  async function checkUsername(username) {
    try {
      let thisUserInfo = await UserInfo.findOne({ username });
      if (thisUserInfo) {
        return res.json({
          code: 400,
          msg: "用户名已存在",
        });
      } else {
        return res.json({
          code: 200,
          msg: "用户名可用",
        });
      }
    } catch (error) {
      res.json({
        code: 500,
        msg: "查询失败",
        info: error.message,
      });
    }
  }
  checkUsername(username);
});

/* 登录 */
let jwt = require("jsonwebtoken");
router.get("/login", function (req, res, next) {
  console.log(req.query, "登录query");
  let { username, password } = req.query;
  async function login(username, password) {
    try {
      // 查找用户信息
      let thisUserInfo = await UserInfo.findOne({ username }); // 假设用户名存储在 mobile 字段中
      // console.log(thisUserInfo, "找到了没呀");
      // 查找是否有该用户
      if (!thisUserInfo) {
        return res.json({
          code: 400,
          msg: "用户不存在",
          token: "",
        });
      }
      // 验证密码
      const isMatch = await bcrypt.compare(password, thisUserInfo.password);
      // console.log(isMatch,'isMatch');
      if (!isMatch) {
        return res.json({
          code: 400,
          msg: "账号或密码错误",
          token: "",
        });
      }
      // 验证通过，返回用户信息和token
      console.log(thisUserInfo, "验证通过,thisUserInfo");
      /* 
      登陆成功后，返回token
        1.第一个参数是一个对象，它是要编码到 JWT 中的 payload。在这个例子中，payload 是 { username: "admin" }，这意味着 JWT 将包含一个键为 username，值为 "admin" 的字段。
        2.第二个参数是用于签名 JWT 的密钥。在这个例子中，密钥是 "testkey"。这个密钥将在签名 JWT 时用于生成哈希值，并在验证 JWT 时用于验证哈希值的完整性。
        3.第三个参数是一个对象，用于指定 JWT 的选项。在这个例子中，你设置了 JWT 的过期时间为 "30d"，意味着 JWT 将在签发后的 30 天内过期。另外，你指定了签名算法为 "HS256"，这是 HMAC SHA-256 签名算法的缩写。
      */
      let token = jwt.sign({ username: "admin" }, "testkey", {
        expiresIn: "30d",
        algorithm: "HS256",
      });
      return res.json({
        code: 200,
        msg: "登录成功",
        token,
        userInfo: thisUserInfo,
      });
    } catch (error) {
      res.json({
        code: 500,
        msg: "登录失败",
        token: "",
        info: error.message,
      });
    }
  }
  login(username, password);
});

// 更新用户信息
router.put("/updateUserInfo", function (req, res, next) {
  console.log(req.body, "updateUserInfo");
  const { _id, userInfo } = req.body;
  updateUserInfo(_id, userInfo)
    .then((result) => {
      console.log(result, "更新成功");
      res.json({
        code: 200,
        msg: "更新成功",
        resultList: result,
      });
    })
    .catch((err) => {
      console.log(err.message, "更新失败");
      res.json({
        code: 400,
        msg: "更新失败",
        reason: err,
      });
    });
});
// 更新个性签名
router.put("/updateIntroduction", function (req, res, next) {
  console.log(req.body, "updateIntroduction");
  const { _id, introduction } = req.body;
  updateIntroduction(_id, introduction)
    .then((result) => {
      console.log(result, "更新成功");
      res.json({
        code: 200,
        msg: "更新成功",
        resultList: result,
      });
    })
    .catch((err) => {
      console.log(err.message, "更新失败");
      res.json({
        code: 400,
        msg: "更新失败",
        reason: err,
      });
    });
});

// 新建游记
router.post("/addTravelNote", function (req, res, next) {
  console.log(req.body, "addTravelNote");
  const time = Date.now();
  const state = "待审核";
  const comment = [];
  const likes = '0'
  const see = "0";
  const rejectReason = "";
  console.log({ ...req.body, time, state, comment,likes,see,rejectReason }, "要新增的游记信息");
  createArticle({ ...req.body, time, state, comment,likes,see,rejectReason })
    .then((result) => {
      res.json({
        code: 200,
        msg: "请求发送成功,具体是否添加上去请看resultList",
        resultList: result,
      });
    })
    .catch((err) => {
      res.json({
        code: 400,
        msg: "新增游记失败",
        reason: err,
      });
    });
});

// 删除游记(用户物理删除)
router.delete("/deleteTravelNote", function (req, res, next) {
  console.log(req.body, "deleteTravelNote");
  const { articleId } = req.body;
  deleteArticle(articleId)
    .then((result) => {
      res.json({
        code: 200,
        msg: "删除成功",
        resultList: result,
      });
    })
    .catch((err) => {
      res.json({
        code: 400,
        msg: "删除失败",
        reason: err,
      });
    });
});

// 获取游记,支持根据用户id和游记id查询，如果不传参数则查询所有游记
router.get("/getAllTravelNote", function (req, res, next) {
  console.log(req.query, "getAllTravelNote");
  const { _id, articleId } = req.query;
  findArticle(_id, articleId)
    .then((result) => {
      res.json({
        code: 200,
        msg: "查询成功",
        resultList: result,
      });
    })
    .catch((err) => {
      res.json({
        code: 400,
        msg: "查询失败",
        reason: err,
      });
    });
});

// 更新游记
router.put("/updateTravelNote", function (req, res, next) {
  console.log(req.body, "updateTravelNote");
  const { articleId,article } = req.body;
  const data = {articleId,article:{...article,likes:"0"}} // 添加用户ID
  updateArticle(data)
    .then((result) => {
      res.json({
        code: 200,
        msg: "更新成功",
        resultList: result,
      });
    })
    .catch((err) => {
      res.json({
        code: 400,
        msg: "更新失败",
        reason: err,
      });
    });
});

// 模糊查询游记
router.get("/searchTravelNote", function (req, res, next) {
  console.log(req.query, "searchTravelNote");
  const { searchInfo } = req.query;
  searchArticle(searchInfo)
    .then((result) => {
      res.json({
        code: 200,
        msg: "查询成功",
        resultList: result,
      });
    })
    .catch((err) => {
      res.json({
        code: 400,
        msg: "查询失败",
        reason: err,
      });
    });
});

// 评论游记
router.put("/commentTravelNote", function (req, res, next) {
  console.log(req.body, "commentTravelNote");
  const { articleId, comment } = req.body;
  commentArticle(articleId, comment)
    .then((result) => {
      res.json({
        code: 200,
        msg: "评论成功",
        resultList: result,
      });
    })
    .catch((err) => {
      res.json({
        code: 400,
        msg: "评论失败",
        reason: err,
      });
    });
});


module.exports = router;
