import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // 你的副作用逻辑，比如获取数据、设置定时器等
    console.log('Component mounted');

    return () => {
      // 可选的清理逻辑
      console.log('Component unmounted');
    };
  }, []);

  return (
    <>
      <div>hello world</div>
    </>
  );
}

export default App;
