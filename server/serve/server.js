const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

//链接mongo 并且使用task_manager这个集合
const DB_URL = "mongodb://localhost/trip_manager";
mongoose.connect(DB_URL);
mongoose.connection.on("connected", function () {
  console.log("mongo connect success");
});

// 定义 Article 的子 Schema
const articleSchema = new Schema(
  {
    articleId: String,
    user: String, // 用户的nickName(用来模糊搜索)
    Avatar: String, // 用户的头像(用来瀑布流上展示)
    title: String, //标题
    profile: String, //简介
    content: String, //内容
    picture: [String],
    position: String,
    see: String, // 浏览量
    state: String, // 审核状态
    rejectReason: String, // 拒绝理由
    tags: [String], // 标签
    time: String, // 发布时间
    playTime: String, // 游玩时间
    money: String, // 花费
    video: [String],
    likes: String, // 点赞量
    comment: [
      // 评论
      {
        id: String,
        nickName: String,
        commentAvatar: String,
        time: String,
        content: String,
      },
    ],
  },
  { _id: false } // 设置 _id 为 false，不生成默认的 _id
);

// 定义用户信息的Schema
const userInfoSchema = new Schema(
  {
    article: [articleSchema], // 嵌套 Article Schema
    username: String,
    password: String,
    Avatar: String,
    nickName: String,
    sex: String,
    age: String,
    email: String,
    address: String,
    phone: String,
    introduction: String,
  },
  { collection: "userInfo" }
); // 设置集合名称为 'userInfo'
const deleteArticleSchema = new Schema({
  articleId: String,
  comment: [
    {
      _id: String,
      nickName: String,
      time: String,
      content: String,
      Avatar: String,
    },
  ],
  content: String,
  picture: [String],
  position: String,
  see: String, // 浏览量
  state: String,
  tags: [String], // 标签
  time: String,
  video: [String],
});

const UserInfo = mongoose.model("UserInfo", userInfoSchema); // 用户信息
const deleteArticleList = mongoose.model(
  "deleteArticleList",
  deleteArticleSchema
); // 删除的游记

// ----------------------------用户信息处理----------------------------
// 密码加密
async function hashPassword(password) {
  const saltRounds = 10; // 定义加密的复杂度
  try {
    // 生成盐并加密
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash; // 返回加密后的密码
  } catch (error) {
    console.error("加密密码时出错:", error);
  }
  return null;
}
// 注册
async function createUserInfo(newInfoObj) {
  // console.log(newInfoObj, "newInfoObj1111111");
  // console.log(newInfoObj.password, "password");
  let newPassword = await hashPassword(newInfoObj.password).then(
    (result) => result
  ); // 加密密码
  // console.log(newPassword, "newPassword");

  return new Promise((resolve, reject) => {
    // 创建新的UserInfo
    UserInfo.create(
      { ...newInfoObj, password: newPassword },
      function (err, doc) {
        if (!err) {
          resolve(doc);
        } else {
          reject(err);
        }
      }
    );
  });
}
// 更新用户信息
function updateUserInfo(
  _id,
  { Avatar, nickName, sex, age, email, address, phone, introduction }
) {
  return new Promise((resolve, reject) => {
    UserInfo.updateOne(
      { _id: ObjectId(_id) }, // 根据用户的 _id 来查找用户
      {
        $set: {
          Avatar,
          nickName,
          sex,
          age,
          email,
          address,
          phone,
          introduction,
          "article.$[].user": nickName,
          "article.$[].Avatar": Avatar
        },
      }, // 使用 $set 操作符更新匹配的第一个元素
      function (err, doc) {
        if (!err) {
          resolve(doc);
        } else {
          reject(err);
        }
      }
    );
  });
}
// 更新用户个人签名
function updateIntroduction(_id, introduction) {
  return new Promise((resolve, reject) => {
    UserInfo.updateOne(
      { _id: ObjectId(_id) }, // 根据用户的 _id 来查找用户
      { $set: { introduction } }, // 使用 $set 操作符更新匹配的第一个元素
      function (err, doc) {
        if (!err) {
          resolve(doc);
        } else {
          reject(err);
        }
      }
    );
  });
}

// ----------------------------游记处理----------------------------

// 新增游记
function createArticle(newNoteObj) {
  console.log(newNoteObj, "newNoteObj");
  const articleId = newNoteObj._id + Date.now();
  return new Promise((resolve, reject) => {
    UserInfo.updateOne(
      { _id: ObjectId(newNoteObj._id) }, // 根据用户的 _id 来查找用户
      { $push: { article: { ...newNoteObj, articleId } } }, // push操作往 article 数组里添加新的游记
      function (err, doc) {
        if (!err) {
          resolve({ ...doc, articleId });
        } else {
          reject(err);
        }
      }
    );
  });
}
// 删除游记
function deleteArticle(ArticleId) {
  return new Promise((resolve, reject) => {
    UserInfo.updateOne(
      { "article.articleId": ArticleId }, // 查询条件：查找包含指定 articleId 的元素
      { $pull: { article: { articleId: ArticleId } } }, // 使用 $pull 操作符删除匹配的 article 元素
      function (err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
}
// 查询游记
function findArticle(_id, articleId) {
  console.log(_id, articleId, "infoObj");
  return new Promise((resolve, reject) => {
    if (articleId) {
      // 如果有 articleId，则查询指定的游记
      UserInfo.findOne(
        { "article.articleId": articleId }, // 查询条件：查找包含指定 articleId 的元素
        { "article.$": 1 }, // 使用投影操作符 $ 来返回匹配的第一个元素
        function (err, doc) {
          if (!err) {
            resolve(doc);
          } else {
            reject(err);
          }
        }
      );
    } else if (_id) {
      // 如果有 _id，则查询用户的所有游记
      UserInfo.findOne({ _id: ObjectId(_id) }, function (err, doc) {
        if (!err) {
          resolve(doc);
        } else {
          reject(err);
        }
      });
    } else {
      // 查询所有用户的所有游记
      UserInfo.find({}, function (err, doc) {
        if (!err) {
          resolve(doc);
        } else {
          reject(err);
        }
      });
    }
  });
}
// 更新某个用户的某篇游记 (只能在待审核的时候更新)
function updateArticle(infoObj) {
  const { articleId, article } = infoObj;
  let oldArticle = {};
  let comment = [];
  let see = "0";
  const state = "待审核";
  const time = Date.now();
  const rejectReason = "";
  return new Promise((resolve, reject) => {
    // let user = "";
    // 获取之前游记里面的数据
    UserInfo.findOne(
      { "article.articleId": articleId }, // 查询条件：查找指定用户的指定游记
      { "article.$": 1 }, // 使用投影操作符 $ 来返回匹配的第一个元素
      function (err, doc) {
        if (!err) {
          oldArticle = doc.article[0];
          user = oldArticle.user;
          console.log(user, "user");
          console.log(oldArticle, "oldArticle");
          // console.log(article, "article");
          // console.log({ ...oldArticle, ...article }, "newArticle");
        } else {
          reject(err);
        }
      }
    );
    // console.log(user, "user"); // 这个user是undefined

    UserInfo.updateOne(
      { "article.articleId": articleId }, // 查询条件：查找指定用户的指定游记
      {
        $set: {
          "article.$": {
            ...oldArticle,
            ...article,
            user,
            articleId,
            comment,
            see,
            state,
            rejectReason,
            time,
          },
        },
      }, // 使用 $set 操作符更新匹配的第一个元素
      function (err, doc) {
        if (!err) {
          resolve(doc);
        } else {
          reject(err);
        }
      }
    );
  });
}
// 根据文章title，部分内容或者用户昵称来模糊搜索游记
function searchArticle(search) {
  return new Promise((resolve, reject) => {
    UserInfo.find({}, function (err, docs) {
      if (err) {
        reject(err);
        return;
      }

      // 从所有文章中筛选出已通过的文章
      const approvedArticles = docs.reduce((approved, user) => {
        user.article.forEach((article) => {
          if (article.state === "已通过") {
            approved.push(article);
          }
        });
        return approved;
      }, []);

      // 从已通过的文章中筛选出符合搜索条件的文章
      const searchResult = approvedArticles.filter((article) => {
        if (
          article.title.includes(search) ||
          article.content.includes(search) ||
          article.user.includes(search) 
        ) {
          return true;
        }
        return false;
      });

      resolve(searchResult);
    });
  });
}

// 评论游记
function commentArticle(articleId, comment) {
  console.log(comment);
  return new Promise((resolve, reject) => {
    UserInfo.updateOne(
      { "article.articleId": articleId }, // 查询条件：查找指定游记
      { $push: { "article.$.comment": comment } }, // 使用 $push 操作符往匹配的第一个元素的 comment 数组里添加新的评论
      function (err, doc) {
        if (!err) {
          resolve(doc);
        } else {
          reject(err);
        }
      }
    );
  });
}



// ----------------------------后台管理部分----------------------------
// 通过不同的游记状态作筛选
function getArticleByState(state) {
  return new Promise((resolve, reject) => {
    UserInfo.find({}, function (err, docs) {
      if (err) {
        reject(err);
        return;
      }

      let approvedArticles = [];
      // 从所有文章中筛选出已通过的文章
      if (state === "全部") {
        approvedArticles = docs.reduce((approved, user) => {
          user.article.forEach((article) => {
            approved.push(article);
          });
          return approved;
        }, []);
      } else {
        approvedArticles = docs.reduce((approved, user) => {
          user.article.forEach((article) => {
            if (article.state === state) {
              approved.push(article);
            }
          });
          return approved;
        }, []);
      }

      resolve(approvedArticles);
    });
  });
}
// 更新游记状态
function updateArticleState(articleId, state, rejectReason) {
  return new Promise((resolve, reject) => {
    UserInfo.updateOne(
      { "article.articleId": articleId }, // 查询条件：查找指定游记
      {
        $set: {
          "article.$.state": state,
          "article.$.rejectReason": rejectReason,
        },
      }, // 使用 $set 操作符更新匹配的第一个元素
      function (err, doc) {
        if (!err) {
          resolve(doc);
        } else {
          reject(err);
        }
      }
    );
  });
}

// 管理员删除游记，删除的游记放进deleteArticleList集合 暂时不能用
function deleteArticle_manage(articleId) {
  return new Promise((resolve, reject) => {
    let oldArticle = {};
    // 获取之前游记里面的数据
    UserInfo.findOne(
      { "article.articleId": articleId }, // 查询条件：查找指定用户的指定游记
      { "article.$": 1 }, // 使用投影操作符 $ 来返回匹配的第一个元素
      function (err, doc) {
        if (!err) {
          oldArticle = doc.article[0];
          // console.log(oldArticle, "oldArticle");
          // console.log(article, "article");
        } else {
          reject(err);
        }
      }
    );
    // 删除游记
    UserInfo.updateOne(
      { "article.articleId": articleId }, // 查询条件：查找包含指定 articleId 的元素
      { $pull: { article: { articleId: articleId } } }, // 使用 $pull 操作符删除匹配的 article 元素
      function (err, result) {
        if (!err) {
          resolve(oldArticle);
        } else {
          reject(err);
        }
      }
    );
  });
}
// 往deleteArticleList集合添加游记
function addDeleteArticleList(newNoteObj) {
  // console.log(newNoteObj, "newNoteObj要新加的游记");
  return new Promise((resolve, reject) => {
    deleteArticleList.create(newNoteObj, function (err, doc) {
      if (!err) {
        resolve(doc);
      } else {
        reject(err);
      }
    });
  });
}

module.exports = {
  createUserInfo,
  createArticle,
  deleteArticle,
  findArticle,
  updateArticle,
  getArticleByState,
  updateArticleState,
  deleteArticle_manage,
  addDeleteArticleList,
  searchArticle,
  updateUserInfo,
  commentArticle,
  updateIntroduction,
  UserInfo,
  deleteArticleList,
};
