import { useState, useEffect } from 'react'

// 注意：自定义 hook 要以 use 开头
export const useMousePosition = (delay: number = 0) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let timerId: null | NodeJS.Timeout = null
    const mouseMoveHandler = (e: MouseEvent) => {
      if (timerId !== null) return
      timerId = setTimeout(() => {
        console.log(e.clientX, e.clientY)
        setPosition({ x: e.clientX, y: e.clientY })
        timerId = null
      }, delay)
    }
    window.addEventListener('mousemove', mouseMoveHandler)

    return () => window.removeEventListener('mousemove', mouseMoveHandler)
  }, [])

  return position
}

type UseCountDown = (num?: number) => [number, boolean]
export const useCountDown: UseCountDown = (num = 10) => {
  const seconds = Math.round(Math.abs(num)) || 10

  const [count, setCount] = useState(seconds)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (count > 1) {
        setCount((prev) => prev - 1)
      } else {
        // 清除定时器
        clearTimeout(timerId)
        setDisabled(false)
      }
    }, 1000)

    return () => clearTimeout(timerId)
  }, [count])

  return [count, disabled]
}
