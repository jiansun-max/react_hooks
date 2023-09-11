import React, { useState } from 'react'

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
