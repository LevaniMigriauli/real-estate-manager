import { Outlet } from 'react-router-dom'
import classes from './layout.module.scss'
import Header from '../ui/components/header.jsx'
import { ErrorBoundary } from 'react-error-boundary'

const Layout = () => {

  return (
    <>
      <Header/>
      <div className={classes.layout}>
        <ErrorBoundary FallbackComponent={() => <p>დაფიქსირდა შეცდომა</p>}>
          <Outlet/>
        </ErrorBoundary>
      </div>
    </>
  )
}

export default Layout