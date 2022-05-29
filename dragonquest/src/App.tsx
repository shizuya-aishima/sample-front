import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ResponsiveAppBar from './components/header'
import { Counter } from './features/counter/Counter'
import { Item } from './features/item'
import { ItemList } from './features/itemList'

const App: React.FC = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <header className='App-header'>
          <Routes>
            <Route path='/' element={<ResponsiveAppBar />}>
              <Route index element={<Item />} />
              <Route path='counter' element={<Counter />} />
              <Route path='items' element={<ItemList />} />
              <Route path='items/:id' element={<Item />} />
              <Route path='*' element={<>not</>} />
            </Route>
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  )
}

export default App
