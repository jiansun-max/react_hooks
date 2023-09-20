import React, { useReducer } from 'react'

type UserType = typeof defaultState
type ActionType = { type: 'UPDATE_NAME'; payload: string } | { type: 'INCREMENT'; payload: number } | { type: 'DECREMENT'; payload: number }

// 初始状态
const defaultState = { name: 'liulongbin', age: 0 }

// 在 reducer 函数的形参中：
// 第一个参数，永远都是上一次的旧状态
const reducer = (prevState: UserType, action: ActionType) => {
  console.log('触发了 reducer 的执行')
  console.log(action)

  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...prevState, name: action.payload }
    case 'INCREMENT':
      return { ...prevState, age: prevState.age + action.payload }
    case 'DECREMENT':
      return { ...prevState, age: prevState.age - action.payload }
    default:
      return prevState
  }
}

// 形参：是初始状态
// 返回值：处理好的初始状态
const initAction = (initState: UserType) => {
  return { ...initState, age: Math.round(Math.abs(initState.age)) || 18 }
}

export const Father: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, defaultState, initAction)

  console.log(state)

  const changeUserName = () => {
    // 强调：今后不要直接修改 state 数据源
    // state.name = '刘龙彬'
    // console.log(state)
    // dispatch(信息对象)
    dispatch({ type: 'UPDATE_NAME', payload: '刘龙彬' })
  }

  return (
    <div>
      <button onClick={changeUserName}>修改用户名</button>
      <p>{JSON.stringify(state)}</p>
      <div className="father">
        <Son1 {...state} dispatch={dispatch} />
        <Son2 {...state} dispatch={dispatch} />
      </div>
    </div>
  )
}

const Son1: React.FC<UserType & { dispatch: React.Dispatch<ActionType> }> = (props) => {
  const { dispatch, ...user } = props

  const add = () => dispatch({ type: 'INCREMENT', payload: 1 })

  return (
    <div className="son1">
      <p>{JSON.stringify(user)}</p>
      <button onClick={add}>年龄+1</button>
    </div>
  )
}

const Son2: React.FC<UserType & { dispatch: React.Dispatch<ActionType> }> = (props) => {
  const { dispatch, ...user } = props

  const sub = () => dispatch({ type: 'DECREMENT', payload: 5 })

  return (
    <div className="son2">
      <p>{JSON.stringify(user)}</p>
      <button onClick={sub}>年龄-5</button>
    </div>
  )
}
