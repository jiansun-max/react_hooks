import React, { useRef } from 'react'

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
