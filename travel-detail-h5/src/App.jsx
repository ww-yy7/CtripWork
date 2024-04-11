import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css"; // 确保包含所有必要的样式
import {
  Input,
  Image,
  Tag,
  Toast,
} from "antd-mobile";


function App() {
  // 获取页面url，拿到传入的articleId
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const articleId = urlParams.get("articleId");

  const [travelsData, setTravelsData] = useState([]);

  // const articleId = "66138dd35abeab9ea97739c71712557934850"; // 替换为你的实际 articleId

  useEffect(() => {
    async function fetchTravelNotes() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/getAllTravelNote`,
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

  console.log(travelsData.length === 0 ? [] : travelsData, "title1111111111");

  const images = travelsData.length === 0 ? [] : travelsData.article[0].picture;
  const settings = {
    dots: true,
  };

  if (travelsData.length === 0) return null;
  else {
    return (
      <div className="App">
        {/* 轮播图组件 */}
        <div className="App-header">
          {images.length === 1 && (
            <Image
              src={`data:image/jpeg;base64,${images[0]}`}
              alt=""
              className="image"
            />
          )}
          {images.length > 1 && (
            <Slider {...settings}>
              {images.map((img, idx) => (
                <div key={idx}>
                  <Image
                    className="image"
                    src={`data:image/jpeg;base64,${img}`}
                    alt={`Slide ${idx}`}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
        {/* 中间部分 */}
        <div>
          {/* 标签和头像 */}
          <div className="tags">
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg
                t="1712543099511"
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4269"
                width="15"
                height="15">
                <path
                  d="M920.528912 444.49616l-340.111125-340.114737a135.932464 135.932464 0 0 0-96.155899-39.758503L200.418112 64.662657h-0.018063C125.275769 64.662657 64.301413 125.40943 64.301413 200.548159v283.673992a136.091412 136.091412 0 0 0 39.881326 96.199248l340.230335 340.241173a136.022775 136.022775 0 0 0 192.369598 0l283.74624-283.76069c53.128139-53.131752 53.128139-139.277583 0-192.405722z m-45.209673 147.192436l-283.746241 283.760691a72.064544 72.064544 0 0 1-101.924964 0l-340.212273-340.241173A72.187367 72.187367 0 0 1 128.241582 484.218538V200.548159A72.021195 72.021195 0 0 1 200.396437 128.602826l283.843776-0.039737a71.887535 71.887535 0 0 1 50.935389 21.053294l340.114737 340.1039a72.104281 72.104281 0 0 1 0.0289 101.968313z"
                  fill="#87d068"
                  p-id="4270"></path>
                <path
                  d="M384.002258 255.999097c-70.69543 0-128.003161 57.307731-128.003161 128.003161S313.306828 511.998194 384.002258 511.998194s127.999548-57.307731 127.999548-127.999549S454.690463 255.999097 384.002258 255.999097z m45.296371 173.29592a64.059379 64.059379 0 1 1 18.759396-45.292759 63.640337 63.640337 0 0 1-18.763008 45.292759z"
                  fill="#87d068"
                  p-id="4271"></path>
              </svg>
              <Tag
                color="rgba(255,255,255,0)"
                style={{ "--text-color": "#87d068" }}>
                {travelsData.article[0].tags}
              </Tag>
            </div>

            <div className="user-info">
              <span style={{ fontWeight: "bold" }}>
                {travelsData.article[0].user}
              </span>
              <Image
                src={`data:image/jpeg;base64,${travelsData.article[0].Avatar}`}
                alt=""
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginLeft: 10,
                }}
              />
            </div>
          </div>
          {/* 几个小图标 */}
          <div className="location-info">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}>
              <svg
                t="1712546752398"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5388"
                data-spm-anchor-id="a313x.search_index.0.i5.7bc23a81bLOEAD"
                width="20"
                height="20">
                <path
                  d="M611.374545 337.92A69.818182 69.818182 0 0 1 509.207273 279.272727a370.501818 370.501818 0 0 0-118.225455-25.6 197.585455 197.585455 0 0 0-3.258182 34.210909c0 84.712727 130.094545 242.501818 197.818182 315.345455a1495.738182 1495.738182 0 0 0 120.087273-147.316364 373.76 373.76 0 0 0-94.254546-117.992727z"
                  fill="#EDF6FF"
                  p-id="5389"></path>
                <path
                  d="M236.450909 634.181818c0-49.105455 46.545455-91.927273 130.327273-120.087273a23.272727 23.272727 0 0 1 7.447273 0v46.778182c-56.32 20.247273-91.229091 48.174545-91.229091 73.309091 0 49.803636 129.396364 105.658182 302.545454 105.658182a721.454545 721.454545 0 0 0 147.083637-14.429091 366.778182 366.778182 0 0 0-5.585455-218.996364 1563.927273 1563.927273 0 0 1-124.741818 146.85091 23.272727 23.272727 0 0 1-33.28 0c-23.272727-23.272727-227.607273-237.381818-227.607273-365.381819a244.130909 244.130909 0 0 1 2.56-33.512727A372.363636 372.363636 0 1 0 714.472727 775.912727a798.254545 798.254545 0 0 1-128.930909 10.472728c-169.192727 0-349.090909-53.294545-349.090909-152.203637z"
                  fill="#EDF6FF"
                  p-id="5390"></path>
                <path
                  d="M568.785455 653.265455a23.272727 23.272727 0 0 0 33.28 0 1563.927273 1563.927273 0 0 0 124.741818-146.85091c53.061818-71.68 102.865455-155.461818 102.865454-218.530909a244.363636 244.363636 0 0 0-488.727272 0c0.232727 127.767273 204.567273 340.48 227.84 365.381819z m16.756363-563.2a198.050909 198.050909 0 0 1 197.818182 197.818181c0 43.752727-34.909091 106.821818-77.730909 167.796364a1495.738182 1495.738182 0 0 1-120.087273 147.316364c-67.723636-72.843636-197.818182-230.632727-197.818182-315.345455a198.981818 198.981818 0 0 1 197.818182-197.818182z"
                  fill="#1296db"
                  p-id="5391"
                  data-spm-anchor-id="a313x.search_index.0.i4.7bc23a81bLOEAD"></path>
                <path
                  d="M578.792727 346.298182a69.818182 69.818182 0 0 0 69.818182-69.818182 69.818182 69.818182 0 1 0-139.636364 0v1.861818a69.818182 69.818182 0 0 0 69.818182 67.956364z"
                  fill="#1296db"
                  p-id="5392"
                  data-spm-anchor-id="a313x.search_index.0.i9.7bc23a81bLOEAD"></path>
                <path
                  d="M934.632727 634.181818c0-49.338182-46.545455-93.090909-131.258182-120.552727a23.272727 23.272727 0 0 0-11.636363 0v46.545454c59.578182 20.48 96.349091 49.105455 96.349091 75.17091 0 34.210909-60.974545 71.447273-155.461818 91.22909a721.454545 721.454545 0 0 1-147.083637 14.429091c-173.149091 0-302.545455-55.854545-302.545454-105.658181 0-25.367273 34.909091-53.061818 91.229091-73.309091V512a23.272727 23.272727 0 0 0-7.447273 0c-84.014545 28.392727-130.327273 70.981818-130.327273 120.087273 0 98.909091 179.898182 152.203636 349.090909 152.203636a798.254545 798.254545 0 0 0 128.930909-10.472727c120.552727-17.687273 220.16-66.094545 220.16-139.636364z"
                  fill="#1296db"
                  p-id="5393"
                  data-spm-anchor-id="a313x.search_index.0.i6.7bc23a81bLOEAD"></path>
              </svg>
              <div style={{ paddingLeft: "5px", lineHeight: "20px" }}>
                位置：
              </div>
              <div style={{ lineHeight: "20px" }}>
                {travelsData.article[0].position}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}>
              <svg
                t="1712547557711"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="7515"
                width="20"
                height="20">
                <path
                  d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z"
                  fill="#444444"
                  p-id="7516"></path>
                <path
                  d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z"
                  fill="#FEE632"
                  p-id="7517"></path>
                <path
                  d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z"
                  fill="#444444"
                  p-id="7518"></path>
                <path
                  d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z"
                  fill="#444444"
                  p-id="7519"></path>
              </svg>
              <div style={{ paddingLeft: "5px", lineHeight: "20px" }}>
                游玩时间：
              </div>
              <div style={{ lineHeight: "20px" }}>
                {travelsData.article[0].playTime}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}>
              <svg
                t="1712547699656"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9470"
                width="20"
                height="20">
                <path
                  d="M85.333333 512a426.666667 426.666667 0 1 0 853.333334 0c0-235.648-191.018667-426.666667-426.666667-426.666667S85.333333 276.352 85.333333 512z"
                  fill="#FFE5CF"
                  p-id="9471"></path>
                <path
                  d="M289.578667 533.546667l28.373333 209.941333c5.674667 22.698667 17.024 28.373333 28.373333 5.674667l68.096-102.122667-124.842666-113.493333z m442.56-45.376l-51.050667-209.92c-5.674667-22.698667-17.024-22.698667-28.373333-5.674667l-51.072 102.122667 130.496 113.472z"
                  fill="#FF9D68"
                  p-id="9472"></path>
                <path
                  d="M278.250667 510.869333c0 128.469333 104.149333 232.618667 232.618666 232.618667S743.466667 639.36 743.466667 510.869333a232.618667 232.618667 0 1 0-465.237334 0z"
                  fill="#FF8746"
                  p-id="9473"></path>
                <path
                  d="M425.749333 539.242667v34.026666h68.096v51.072h28.373334v-51.072h68.074666v-34.026666H522.24v-22.698667h68.074667v-34.048h-51.050667l51.050667-51.072-22.698667-28.373333-62.4 62.421333-56.746667-62.4-22.698666 28.373333 51.072 51.050667h-51.072v34.048h68.096v22.698667z"
                  fill="#FFFFFF"
                  p-id="9474"></path>
              </svg>
              <div style={{ paddingLeft: "5px", lineHeight: "20px" }}>
                花费：
              </div>
              <div style={{ lineHeight: "20px" }}>
                {travelsData.article[0].money}
              </div>
            </div>
          </div>
          {/* 页面内容 */}
          <div className="page-content">
            <div
              style={{ color: "#000", fontSize: "24px", fontWeight: "bold" }}>
              {travelsData.article[0].title}
            </div>
            <div className="description">{travelsData.article[0].content}</div>
            <div style={{ color: "grey", fontSize: "12px", marginTop: "10px" }}>
              发布时间：
              {new Date(travelsData.article[0].time * 1).toLocaleString(
                "zh-cN",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }
              )}
            </div>
            <div>
              <div style={{marginTop: 25, marginBottom:15, fontWeight:'bold'}}>评论区</div>
              {travelsData.article[0]?.comment?.map((comment,index)=> (
              <div key={index} style={{display:'flex', flexDirection: 'row',marginTop:5}}>
                <Image
                src={`data:image/jpeg;base64,${comment.commentAvatar}`}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                  marginRight:10,
                  marginBottom:10,
                  
                }}
                ></Image>
                <div>
                  <div style={{fontWeight:'bold'}}>
                  {comment.nickName}

                  </div>
                  <div >
                  {comment.content}
                  </div>
                </div>

              </div>))}
            </div>
          </div>
        </div>
        {/* 互动区 */}
        <footer  className="footer">
          <div style={{width: '80%',height:'80%',borderRadius:30, backgroundColor:'rgba(71, 69, 69, 0.1)'}} onClick={()=>{Toast.show({
              content: '请打开app进行评论',
              duration: 2000
            })}}> 
          <Input style={{ color: "gray",paddingLeft:6,paddingTop:3 }} placeholder="说点什么..."          
          /></div>   
          <span>❤️</span>
          <span>⭐</span>
          <span>💬</span>
        </footer>
      </div>
      
    );
  }
}

export default App;
