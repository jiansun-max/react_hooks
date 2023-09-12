import React, { useRef, useState, useEffect } from 'react'

export const InputFocus: React.FC = () => {
  const iptRef = useRef<HTMLInputElement>(null)

  const getFocus = () => {
    // console.log(iptRef.current)
    iptRef.current?.focus()
  }

  return (
    <>
      <input type="text" ref={iptRef} />
      <button onClick={getFocus}>获取焦点</button>
    </>
  )
}

/* let prevCount: number
export const Counter: React.FC = () => {
  const [count, setCount] = useState(0)

  const add = () => {
    setCount((prev) => prev + 1)
    prevCount = count
  }

  return (
    <>
      <h1>
        新值是：{count}；旧值是：{prevCount}
      </h1>
      <button onClick={add}>+1</button>
    </>
  )
} */

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0)
  // useRef() 只在组件首次渲染的时候被创建
  // 如果组件是 rerender 的时候，不会重复创建 ref 对象
  const prevCountRef = useRef<number>()

  const add = () => {
    setCount((prev) => prev + 1)
    prevCountRef.current = count
  }

  return (
    <>
      <h1>
        新值是：{count}；旧值是：{prevCountRef.current}
      </h1>
      <button onClick={add}>+1</button>
    </>
  )
}

export const RefTimer: React.FC = () => {
  const [count, setCount] = useState(0)
  const time = useRef(Date.now())

  const updateTime = () => {
    time.current = Date.now()
    console.log(time.current)
  }

  console.log('组件渲染了')

  // 强调：今后开发中，千万不要把 ref.current 当做 useEffect 等这些 hooks 的依赖项
  useEffect(() => {
    console.log('time.current 发生了变化：' + time.current)
  }, [time.current])

  return (
    <>
      <h3>
        count 的值是：{count}，time 的值是：{time.current}
      </h3>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={updateTime}>给time赋新值</button>
    </>
  )
}
