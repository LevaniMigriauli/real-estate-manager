import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './App.css'
import Layout from './pages/layout.jsx'
import ListingPage from './pages/listingPage/listingPage.jsx'
import HomePage from './pages/homePage/homePage.jsx'
import ErrorPage from './pages/errorPage.jsx'
import AddListingPage from './pages/addListingPage/addListingPage.jsx'
import SvgIcons from './ui/shared/svgIcons/svgIcons.jsx'
import { getRegions } from './api/geographicalInfo.js'
import { setRegions } from './redux/slices/regionSlice.js'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    getRegions().then(res => {
      dispatch(setRegions(res))
    })
  }, [])

  return (
    <>
      <BrowserRouter>
        <SvgIcons/>
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
