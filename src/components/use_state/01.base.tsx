import React, { useState, useEffect } from 'react'

export const Count: React.FC = () => {
  const [count, setCount] = useState(0)

  console.log('触发了 Count 组件的渲染')

  const add = () => {
    setCount(count + 1)
  }

  return (
    <>
      <h1>count 的值是：{count}</h1>
      <button onClick={add}>+1</button>
    </>
  )
}

export const DateCom: React.FC = () => {
  // const [date] = useState({ year: 2023, month: 9, day: 11 })
  const [date] = useState(() => {
    const dt = new Date()
    return { year: dt.getFullYear(), month: dt.getMonth() + 1, day: dt.getDate() }
  })

  return (
    <>
      <h1>当前的年月日信息：</h1>
      <p>年份：{date.year}年</p>
      <p>月份：{date.month}月</p>
      <p>日期：{date.day}日</p>
    </>
  )
}

export const Counter2: React.FC = () => {
  const [count, setCount] = useState(0)

  const add = () => {
    // 让 count 自增 +1
    // 强调：setXXX 函数内部，是异步修改状态的
    setCount(count + 1)
    // 希望：打印最新的 count 值
    // console.log(count)
  }

  // useEffect(fn, [依赖项])
  // useEffect 中的 fn 回调，在组件首次渲染的时候，会执行一次
  useEffect(() => {
    console.log('count 最新的值是：' + count)
  }, [count])

  return (
    <>
      <h1>count 的值是：{count}</h1>
      <button onClick={add}>+1</button>
    </>
  )
}

export const Counter3: React.FC = () => {
  const [count, setCount] = useState(0)

  const add = () => {
    // setCount(count + 1)
    // setCount(count + 1)
    // 第一种调用方式：setXXX(新值)
    // 第二种调用方式：setXXX(fn)
    // 第二种调用方式：setXXX((prev) => 基于prev计算并return一个新值)
    // 强调：当我们修改 state 状态的时候，如果我们发现：新值依赖于旧值（基于旧值进行计算，最终得到新值）
    // 此时，不要直接在外部进行计算，而是要通过 fn 函数的形参拿到旧值，并进行计算，最终 return 新值
    setCount((prev) => prev + 1)
    setCount((prev) => prev + 1)
  }

  return (
    <>
      <h1>count 的值是：{count}</h1>
      <button onClick={add}>+1</button>
    </>
  )
}

export const UserInfo: React.FC = () => {
  const [user, setUser] = useState({
    name: 'Jesse Pinkman',
    age: 25,
    gender: '男'
  })

  const onChangeUser = () => {
    user.name = 'Walt White'
    user.age = 52

    // setUser({ ...user })
    setUser(Object.assign({}, user))
  }

  return (
    <>
      <h1>用户信息：</h1>
      <p>姓名：{user.name}</p>
      <p>年龄：{user.age}</p>
      <p>性别：{user.gender}</p>
      <hr />
      <button onClick={onChangeUser}>修改用户信息</button>
    </>
  )
}

export const ForceUpdateCom: React.FC = () => {
  const [, forceUpdate] = useState({})

  const onRefresh = () => forceUpdate({})

  return (
    <>
      <button onClick={onRefresh}>强制组件刷新 --- {Date.now()}</button>
    </>
  )
}
