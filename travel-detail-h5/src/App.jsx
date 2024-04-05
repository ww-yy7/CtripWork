import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // 获取页面url，拿到传入的articleId
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const articleId = urlParams.get('articleId');
  const [travelsData, setTravelsData] = useState([]);
  const articleId = "660be7e74c1ddb862c27654c1712202177684"; // 替换为你的实际 articleId

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
  console.log("travelsData", travelsData);
  return (
    <div className="App">
      {/* 照片处 */}
      <div className="header"></div>

      {/* 游记标题 */}
    </div>
  );
}

export default App;
