import logo from '../../assets/images/Logo-Main.png'
import classes from './header.module.scss'

const Header = () => {

  return (
    <header className={classes.header}>
      <img className={`${classes['header-logo']}`} src={logo}
           alt={'RedBerry Logo'}/>
    </header>
  )
}

export default Header