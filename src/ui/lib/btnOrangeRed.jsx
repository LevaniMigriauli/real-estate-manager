import classes from './btns.module.scss'
import clsx from 'clsx'

const BtnOrangeRed = ({ children }) => <button
  className={clsx(classes['btn-orange-red'], classes.btn)}>
  {children}
</button>

export default BtnOrangeRed