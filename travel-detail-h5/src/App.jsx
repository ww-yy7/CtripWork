import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css'; // 确保包含所有必要的样式

// 假设这是你的轮播图图片数组
const images = [
  '/logo192.png',
  '/logo512.png',
  '/welcome.png',
  // ...更多图片
];

function App() {
  // 获取页面url，拿到传入的articleId
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const articleId = urlParams.get('articleId');
  const [travelsData, setTravelsData] = useState([]);
  // const articleId = "660be7e74c1ddb862c27654c1712202177684"; // 替换为你的实际 articleId

  useEffect(() => {
    async function fetchTravelNotes() {
      try {
        const response = await axios.get(
          `http://10.100.173.187:3000/api/users/getAllTravelNote`,
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
  console.log("travelsData", travelsData);

  

  const settings = {
    dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* 轮播图组件 */}
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div key={idx}>
              <img className="image" src={img} alt={`Slide ${idx}`} />
            </div>
          ))}
        </Slider>
        
      </header>

      <footer className="App-footer">
        {/* 页面内容 */}
        <div className="page-content">
          <div className="tuucontainer">
            <h1 className="title">{travelsData.article.title}</h1>
            <div className="user-info">
              <span className="username">Zach1234</span>
              <span className="user-status">👤</span>
            </div>
          </div>
          <div className="location-info">
            <span className="location">Asd asd</span>
            <span className="location-icon">📍</span>
            <span className="time-info">游玩天数</span>
            <span className="time-icon">⏰</span>
            <span className="cost-info">花费</span>
            <span className="cost-icon">🔥</span>
          </div>
          <p className="description">Asd asd asd asd</p>
        </div>
        {/* 互动区 */}
        
        <div className="interaction-icons">
          <input className="comment-box" placeholder="说点什么..." />
          <span className="heart-icon">❤️</span>
          <span className="star-icon">⭐</span>
          <span className="edit-icon">✏️</span>
        </div>
        <button className="redirect-button">
          打开App查看
        </button>
      </footer>
    </div>
  );
}

export default App;
