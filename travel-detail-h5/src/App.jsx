import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css"; // 确保包含所有必要的样式
import "./App.css"; // 确保包含所有必要的样式

// 假设这是你的轮播图图片数组

function App() {
  // 获取页面url，拿到传入的articleId
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const articleId = urlParams.get("articleId");

  const [travelsData, setTravelsData] = useState([]);

  // const articleId = "66125ba14473ff8205c32d611712479214007"; // 替换为你的实际 articleId

  useEffect(() => {
    async function fetchTravelNotes() {
      try {
        const response = await axios.get(
          `http://10.100.197.143:3000/api/users/getAllTravelNote`,
          {
            params: { articleId },
          }
        );
        setTravelsData(response.data.resultList);
        return response.data.resultList;
      } catch (error) {
        console.error("Error fetching travel notes:", error);
      }
    }
    fetchTravelNotes();
  }, [articleId]); // 仅在 articleId 发生变化时触发 effect

  // console.log(travelsData.length === 0 ? [] : travelsData, "title1111111111")

  const images = travelsData.length === 0 ? [] : travelsData.article[0].picture;
  // console.log(images, "img");
  const settings = {
    dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1
  };

  if (travelsData.length === 0) return null;
  else {
    return (
      <div className="App">
        {/* <img src={`data:image/jpeg;base64,${img[0]}`} alt=""/> */}
        {/* 轮播图组件 */}
        <div className="App-header">
          {images.length === 1 && (
            <img
              src={`data:image/jpeg;base64,${images[0]}`}
              alt=""
              className="image"
            />
          )}
          {images.length > 1 && (
            <Slider {...settings}>
              {images.map((img, idx) => (
                <div key={idx}>
                  <img
                    className="image"
                    src={`data:image/jpeg;base64,${img}`}
                    alt={`Slide ${idx}`}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>

        <footer className="App-footer">
          {/* 页面内容 */}
          <div className="page-content">
            <div className="tuucontainer">
              <h1 className="title">{travelsData.article[0].title}</h1>
              <div className="user-info">
                <span className="username">{travelsData.article[0].user}</span>
                <span className="user-status">👤</span>
              </div>
            </div>
            <div className="location-info">
              {travelsData.article[0].position !== "" && (
                <div>
                  <span className="location">
                    {travelsData.article[0].position}
                  </span>
                  <span className="location-icon">📍</span>
                </div>
              )}
              {travelsData.article[0].position !== "" && (
                <div>
                  <span className="time-info">游玩天数</span>
                  <span className="time-icon">⏰</span>
                </div>
              )}
              {travelsData.article[0].position !== "" && (
                <div>
                  <span className="cost-info">花费</span>
                  <span className="cost-icon">🔥</span>
                </div>
              )}
            </div>
            <p className="description">{travelsData.article[0].content}</p>
          </div>
          {/* 互动区 */}

          <div className="interaction-icons">
            <input className="comment-box" placeholder="说点什么..." />
            <span className="heart-icon">❤️</span>
            <span className="star-icon">⭐</span>
            <span className="edit-icon">✏️</span>
          </div>
          <button className="redirect-button">打开App查看</button>
        </footer>
      </div>
    );
  }
}

export default App;
