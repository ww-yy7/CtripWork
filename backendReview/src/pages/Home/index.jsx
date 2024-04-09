import { Card } from "antd";

const Home = () => {
  const name = localStorage.getItem('name');
  return (
    <div style={{margin:'auto'}}>
      <Card  style={{ width:'80vw',height:'80vh',justifyContent:'center',}}>
        <div style={{color:'orange',textAlign:'center',fontSize:'30px',fontWeight:'bold',marginTop:'5rem'}}>
        生活不易，搬砖努力！
        </div>
        <div style={{color:'orange',textAlign:'center',fontSize:'30px',fontWeight:'bold'}}>
        欢迎 {name}！
        </div>
      </Card>

    </div>
  );
};

export default Home;
