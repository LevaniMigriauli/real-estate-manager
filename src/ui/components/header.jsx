import logo from '../../assets/images/Logo-Main.png'
import classes from './header.module.scss'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <header className={classes.header}>
      <img className={`${classes['header-logo']}`} src={logo}
           alt={'RedBerry Logo'} onClick={() => navigate('/')}/>
    </header>
  )
}

export default Header