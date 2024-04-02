import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Select,
  Space,
  Table,
  Tag,
  Modal,
  Input,
} from "antd";
// 引入汉化包 时间选择器显示中文
import { useEffect, useState } from "react";
import {
  getAllTravelNote,
  changeArticleState,
  deleteTravelNote,
  getArticleByState,
  getTravelNoteById,
} from "../../apis/user";
import dayjs from "dayjs";
import { unescapeHtml } from "../../apis/HtmlHandler";
import PropTypes from "prop-types";

const PreviewModel = ({ article }) => {
  // 预览框子组件
  const { title, profile, content, picture, position,tags } = article;
  return (
    <div>
      {picture.length > 0 && (picture.map((item) => <img src={item} key={item} alt="图片" />))}
      <p>文章标题: {title}</p>
      <p>文章简介: {profile}</p>
      <p>文章内容: {content}</p>
      <p>地址:{position}</p>
      <p>标签：{tags.length>0 && tags.map((item)=>item)}</p>
      <p>
        文章创建时间:{" "}
        {dayjs.unix(article.time / 1000).format("YYYY-MM-DD HH:mm:ss")}
      </p>
    </div>
  );
};
// 预览框子组件的类型检查
PreviewModel.propTypes = {
  article: PropTypes.object,
};

const Task = () => {
  const [noteList, setNoteList] = useState([]);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [articleId, setArticleId] = useState(null); // 用来存储当前操作的游记id
  const [article, setArticle] = useState({}); // 用来存储当前操作的游记
  const [inputInfo, setInputInfo] = useState(""); // 用来存储拒绝理由
  const name = localStorage.getItem("name");
  const { Option } = Select;
  const stateList = [
    { id: "0", value: "全部" },
    { id: "1", value: "待审核" },
    { id: "2", value: "已通过" },
    { id: "3", value: "未通过" },
  ];

  // 获取游记列表
  async function getTravelNote() {
    let { resultList } = await getAllTravelNote();
    let list = resultList.map((item) => item.article);
    list = list.flat(); // 展平数组，里面存放的是每一篇游记
    // console.log(list, "list");

    // 对数据进行反转义
    list.forEach((item) => {
      item.title = unescapeHtml(item.title);
      item.profile = unescapeHtml(item.profile);
      item.content = unescapeHtml(item.content);
      item.position = unescapeHtml(item.position);
      item.playTime = unescapeHtml(item.playTime);
      item.money = unescapeHtml(item.money);
    });

    setNoteList(list); // 用setstate更新数据后会重新渲染页面
  }
  useEffect(() => {
    getTravelNote();
    // console.log("useEffect");
  }, []);
  // 筛选确认回调
  const filterHandler = async (state) => {
    // console.log(state);
    let list = await getArticleByState(state);
    // console.log(list.data, "list");
    setNoteList(list.data);
  };
  // 预览
  const seeHandler = async ({ key: articleId }) => {
    // key 为 articleId
    console.log(articleId, "articleId");
    const {
      resultList: { article },
    } = await getTravelNoteById(articleId); //array
    console.log(article[0], "res");
    setArticle(article[0]);
    showPreviewModal();
  };
  // 通过回调
  const passHandler = async ({ key: articleId }, isPassed) => {
    console.log(articleId, isPassed);
    const state = "已通过";
    await changeArticleState({ articleId, state });
    getTravelNote(); // 重新获取游记列表，刷新页面
  };
  // 拒绝回调
  const rejectHandler = async (articleId, rejectReason) => {
    // console.log(articleId);
    const state = "未通过";
    await changeArticleState({ articleId, state, rejectReason });
    getTravelNote(); // 重新获取游记列表，刷新页面
  };
  // 删除
  const deleteHandler = async ({ key: articleId }) => {
    // console.log("deleteHandler");
    await deleteTravelNote({ articleId });
    getTravelNote(); // 重新获取游记列表，刷新页面
  };
  // 删除弹出框
  const showRejectModal = ({ key: articleId }) => {
    console.log(articleId, "record");
    setArticleId(articleId);

    setIsRejectModalOpen(true);
  };
  const handleRejectOk = () => {
    setIsRejectModalOpen(false);
    // setInputInfo('') // 清除选择框
    rejectHandler(articleId, inputInfo);
  };
  const handleRejectCancel = () => {
    setIsRejectModalOpen(false);
    setInputInfo(""); // 清除选择框
  };
  // 预览弹出框
  const showPreviewModal = () => {
    setIsPreviewModalOpen(true);
  };
  const handlePreviewOk = () => {
    setIsPreviewModalOpen(false);
  };
  const handlePreviewCancel = () => {
    setIsPreviewModalOpen(false);
  };

  const columns = [
    {
      title: "游记名称",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "创建时间",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "游记状态",
      key: "state",
      dataIndex: "state",
      render: (_, { state }) => (
        <>
          {state.map((state) => {
            let color;
            if (state === "待审核") {
              color = "blue";
            } else if (state === "已通过") {
              color = "green";
            } else if (state === "未通过") {
              color = "red";
            }
            return (
              <Tag color={color} key={state}>
                {state.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => seeHandler(record)}>预览</a>
          <a onClick={() => passHandler(record)}>通过</a>
          <a onClick={() => showRejectModal(record)}>拒绝</a>
          {name === "admin" && (
            <a onClick={() => deleteHandler(record)}>删除</a>
          )}
        </Space>
      ),
    },
  ];

  const data = noteList.map((item) => {
    return {
      key: item.articleId,
      title: item.title,
      time: dayjs.unix(item.time / 1000).format("YYYY-MM-DD HH:mm:ss"),
      state: [item.state],
    };
  });

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "游记审核" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}>
        {/* 筛选区域 */}
        <Form onFinish={filterHandler}>
          <Form.Item label="状态" name="state" initialValue={"全部"}>
            <Select placeholder="请选择状态" style={{ width: 120 }}>
              {stateList.map((item) => (
                <Option key={item.id} value={item.value}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* <Form.Item label="日期" name="date">
            <RangePicker locale={locale}></RangePicker>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card>
        <Table columns={columns} dataSource={data} />
        <Modal
          title="请输入拒绝理由"
          open={isRejectModalOpen}
          onOk={handleRejectOk}
          onCancel={handleRejectCancel}
          cancelText={"取消"}
          okText={"更新"}>
          <Input
            placeholder="拒绝理由"
            value={inputInfo}
            onChange={(e) => setInputInfo(e.target.value)}
            style={{ marginTop: "10px", height: "40px" }}
          />
        </Modal>
        <Modal
          title="预览"
          open={isPreviewModalOpen}
          onOk={handlePreviewOk}
          onCancel={handlePreviewCancel}
          width={800}
          okText='确认'
          cancelText='取消'
          footer={[
            <Button key="back" onClick={handlePreviewCancel}>
              关闭
            </Button>
          ]}
          >
          <PreviewModel article={article}></PreviewModel>
        </Modal>
      </Card>
    </div>
  );
};

export default Task;
