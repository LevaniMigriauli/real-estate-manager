import classes from "./inputLabel.module.scss"

const InputLabel = ({fieldName, label, isReq}) => {

  return (
    <label className={classes.label} htmlFor={fieldName}>{label}{isReq && '*'}</label>
  )
}

export default InputLabel