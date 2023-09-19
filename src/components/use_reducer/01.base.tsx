import React, { useReducer } from 'react'

type UserType = typeof defaultState

// 初始状态
const defaultState = { name: 'liulongbin', age: 0 }

// 在 reducer 函数的形参中：
// 第一个参数，永远都是上一次的旧状态
const reducer = (prevState: UserType) => {
  console.log('触发了 reducer 的执行')
  // 在 reducer 函数中，必须向外返回一个处理好的新状态
  return prevState
}

// 形参：是初始状态
// 返回值：处理好的初始状态
const initAction = (initState: UserType) => {
  return { ...initState, age: Math.round(Math.abs(initState.age)) || 18 }
}

export const Father: React.FC = () => {
  const [state] = useReducer(reducer, defaultState, initAction)

  console.log(state)

  return (
    <div>
      <button>修改用户名</button>
      <div className="father">
        <Son1 />
        <Son2 />
      </div>
    </div>
  )
}

const Son1: React.FC = () => {
  return <div className="son1"></div>
}

const Son2: React.FC = () => {
  return <div className="son2"></div>
}
