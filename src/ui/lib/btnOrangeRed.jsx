import classes from './btns.module.scss'
import clsx from 'clsx'

const BtnOrangeRed = ({ children, type = 'submit', onClick }) => <button type={type}
  className={clsx(classes['btn-orange-red'], classes.btn)} onClick={onClick}>
  {children}
</button>

export default BtnOrangeRed