import classes from "./homePage.module.scss"
import HomeHeader from './homeHeader.jsx'



const HomePage = () => {

  return (
    <div className={classes.homePage}>
      <HomeHeader/>
    </div>
  )
}

export default HomePage