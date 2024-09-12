import classes from './layout.module.scss'
import Header from '../components/header.jsx'
import HomePage from './homePage/homePage.jsx'

const Layout = () => {

  return (
    <>
      <Header/>
      <div className={classes.layout}>
        <HomePage/>

      </div>
    </>
  )

}

export default Layout