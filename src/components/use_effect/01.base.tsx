import React, { useEffect, useState } from 'react'

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  // console.log(document.querySelector('h1')?.innerText)

  const add = () => {
    setCount((prev) => prev + 1)
  }

  // useEffect(fn)
  // 1. 如果省略了依赖项的数组，则 useEffect 中的副作用函数，会在组件每次更新渲染完毕之后，才执行
  // 2. 如果为 useEffect 指定了依赖项的数组，则 useEffect 中的副作用函数，会在组件每次渲染完毕之后，判断依赖项是否变化，再决定是否执行副作用函数
  // 3. 如果为 useEffect 指定了空的依赖项数组，则 useEffect 中的副作用函数，仅在组件首次渲染完毕之后，执行唯一的一次
  useEffect(() => {
    console.log(document.querySelector('h1')?.innerText)
  })

  return (
    <>
      <h1>count 的值是：{count}</h1>
      <p>flag 的值是：{String(flag)}</p>
      <button onClick={add}>+1</button>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
    </>
  )
}

export const Counter2: React.FC = () => {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  const add = () => {
    setCount((prev) => prev + 1)
  }

  useEffect(() => {
    console.log(document.querySelector('h1')?.innerText)
  }, [count])

  useEffect(() => {
    console.log(document.querySelector('p')?.innerText)
  }, [flag])

  return (
    <>
      <h1>count 的值是：{count}</h1>
      <p>flag 的值是：{String(flag)}</p>
      <button onClick={add}>+1</button>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
    </>
  )
}
