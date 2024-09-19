import classes from './btns.module.scss'
import clsx from 'clsx'

const BtnWhite = ({ children, onClick, className, ...rest }) => <button
  className={clsx(classes['btn-white'], classes.btn, className)} {...rest}>
  {children}
</button>

export default BtnWhite