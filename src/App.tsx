import React from 'react'
import { AppContextWrapper, LevelA } from '@/components/use_context/01.base.tsx'

// React.FC<T> 表示这是一个函数式的 react 组件
const App: React.FC = () => {
  return (
    <AppContextWrapper>
      <LevelA />
    </AppContextWrapper>
  )
}

export default App
