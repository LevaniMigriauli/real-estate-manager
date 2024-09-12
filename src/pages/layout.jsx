import { Outlet } from 'react-router-dom'
import classes from './layout.module.scss'
import Header from '../components/header.jsx'

const Layout = () => {

  return (
    <>
      <Header/>
      <div className={classes.layout}>
        <Outlet/>

      </div>
    </>
  )

}

export default Layout