import React, { useEffect, useState } from 'react'
import { useMousePosition } from '@/hooks/index.ts'

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

const RandomColor: React.FC = () => {
  const [color, setColor] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://api.liulongbin.top/v1/color', { signal: controller.signal })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setColor(res.data.color)
      })
      .catch((err) => console.log('消息：' + err.message))

    // return 清理函数
    // 清理函数触发的时机有两个：
    // 1. 组件被卸载的时候，会调用
    // 2. 当 effect 副作用函数被再次执行之前，会先执行清理函数
    return () => controller.abort()
  }, [])

  return (
    <>
      <p>color 的颜色值是：{color}</p>
    </>
  )
}

export const TestRandomColor: React.FC = () => {
  const [flag, setFlag] = useState(true)

  return (
    <>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
      <hr />
      {flag && <RandomColor />}
    </>
  )
}

const MouseInfo: React.FC = () => {
  const position = useMousePosition(500)

  return (
    <>
      <p>鼠标的位置是：{JSON.stringify(position)}</p>
    </>
  )
}

export const TestMouseInfo: React.FC = () => {
  const [flag, setFlag] = useState(true)

  return (
    <>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
      <hr />
      {flag && <MouseInfo />}
    </>
  )
}
