import classes from './radio.module.scss'

const Radio = ({ name, options, register, required }) => {
  return (
    <div className={classes.radioGroup}>
      {options.map((option) => (
        <label key={option.value} className={classes.radioLabel}>
          <input
            type="radio"
            name={name}
            value={option.value}
            {...register(name, { required })}
            className={classes.radioInput}
          />
          <span className={classes.radioCustom}></span>
          {option.label}
        </label>
      ))}
    </div>
  )
}

export default Radio
