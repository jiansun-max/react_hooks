import React, { useRef, useState, useImperativeHandle } from 'react'

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

  // useEffect 会在组件首次渲染完毕之后，默认执行一次
  // 组件每次渲染完毕之后，会触发 useEffect 中的回调函数，如果给了依赖项数组，则还要判断依赖项是否变化，再决定是否触发回调
  // useEffect(() => {
  //   console.log('触发了useEffect回调的执行：' + time.current)
  // }, [time.current])

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

const Child = React.forwardRef((_, ref) => {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  const add = (step: number) => {
    setCount((prev) => (prev += step))
  }

  useImperativeHandle(
    ref,
    () => {
      console.log('执行了 useImperativeHandle 中的回调函数')
      return {
        count,
        reset: () => setCount(0)
      }
    },
    [count]
  )

  return (
    <>
      <h3>count的值是：{count}</h3>
      <p>flag 的值是：{String(flag)}</p>
      <button onClick={() => add(-1)}>-1</button>
      <button onClick={() => add(1)}>+1</button>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
    </>
  )
})

export const Father: React.FC = () => {
  const childRef = useRef<{ count: number; reset: () => void }>()

  const showRef = () => {
    console.log(childRef.current)
  }

  const onReset = () => {
    childRef.current?.reset()
  }

  return (
    <>
      <h1>这是 Father 父组件</h1>
      <button onClick={showRef}>show ref</button>
      <button onClick={onReset}>重置</button>
      <hr />
      <Child ref={childRef} />
    </>
  )
}
