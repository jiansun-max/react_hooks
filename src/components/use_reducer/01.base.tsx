import React from 'react'

export const Father: React.FC = () => {
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
