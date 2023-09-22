import React from 'react'
import { UserInfoContextWrapper, Father } from '@/components/use_context/02.reducer.tsx'

// React.FC<T> 表示这是一个函数式的 react 组件
const App: React.FC = () => {
  return (
    <UserInfoContextWrapper>
      <Father />
    </UserInfoContextWrapper>
  )
}

export default App
