import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './pages/layout.jsx'

function App () {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Layout/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
