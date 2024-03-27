//获取频道列表的数据
import {useEffect,useState} from 'react'
import { getChannelAPI } from "../apis/task";
function useChannel(){
 //获取频道列表
 const [channelList, setChannelList] = useState([]);

 useEffect(() => {
   //1.封装函数，在函数体内调用接口
   const getChannelList = async () => {
     const res = await getChannelAPI();
    //  console.log(res)
     setChannelList(res.channels);
   };
   //2.调用函数
   getChannelList();
 }, []);
 return {
    channelList
 }
}

export  {useChannel}