import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './pages/layout.jsx'
import ListingPage from './pages/listingPage/listingPage.jsx'
import HomePage from './pages/homePage/homePage.jsx'
import ErrorPage from './pages/errorPage.jsx'
import AddListingPage from './pages/addListingPage/addListingPage.jsx'

function App () {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path={'/listing'} element={<ListingPage/>}/>
            <Route path={'/addListing'} element={<AddListingPage/>}/>

            <Route path={'*'} element={<ErrorPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
