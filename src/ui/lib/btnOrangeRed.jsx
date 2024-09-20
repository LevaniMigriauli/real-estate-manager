import classes from './btns.module.scss'
import clsx from 'clsx'

const BtnOrangeRed = ({ children, type = 'submit' }) => <button type={type}
  className={clsx(classes['btn-orange-red'], classes.btn)}>
  {children}
</button>

export default BtnOrangeRed