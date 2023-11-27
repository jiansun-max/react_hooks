import React, { useState, useContext } from "react";

// Context 的数据类型
type AppContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

// 1. 创建 Context 对象
const AppContext = React.createContext<AppContextType>({} as AppContextType);

// 创建一个 Wrapper 组件
export const AppContextWrapper: React.FC<React.PropsWithChildren> = (props) => {
  // 定义状态
  const [count, setCount] = useState(0);
  return (
    <AppContext.Provider value={{ count, setCount }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const LevelA: React.FC = () => {
  const { count, setCount } = useContext(AppContext);

  return (
    <div style={{ padding: 30, backgroundColor: "lightblue", width: "50vw" }}>
      <p>count值是：{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      {/* 使用子组件 */}
      <LevelB />
    </div>
  );
};

export const LevelB: React.FC = () => {
  return (
    <div style={{ padding: 30, backgroundColor: "lightgreen" }}>
      {/* 使用子组件 */}
      <LevelC />
    </div>
  );
};

export const LevelC: React.FC = () => {
  const ctx = useContext(AppContext);
  console.log(ctx);

  const add = () => ctx.setCount((prev) => prev + 1);

  return (
    <div style={{ padding: 30, backgroundColor: "lightsalmon" }}>
      <p>count 的值是：{ctx.count}</p>
      <button onClick={add}>+1</button>
      <button onClick={() => ctx.setCount(0)}>重置</button>
    </div>
  );
};
