import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import classes from './addListingPage.module.scss'
import { getCities } from '../../api/geographicalInfo.js'
import { setCities } from '../../redux/slices/citiesSlice.js'
import { useForm } from 'react-hook-form'

const AddListingPage = () => {
  const dispatch = useDispatch()

  const { register, watch } = useForm({ defaultValues: { is_rental: '0' } })

  useEffect(() => {
    // getCities().then(res => {
    // console.log(res)
    // dispatch(setCities(res))
    // })
  }, [])

  const allValues = watch() // Watch all form values

  useEffect(() => {
    console.log('All Form Values:', allValues)
  }, [allValues])
  return (
    <form className={classes['add-listing-form']}>
      <h2 className={classes['main-header']}>ლისტინგის დამატება</h2>

      <h4 className={classes['radioGroup-header']}>გარიგების ტიპი</h4>
      <div className={classes.radioGroup}>
        <label className={classes.radioLabel}>
          <input
            type="radio"
            name={'is_rental'}
            value={0}
            {...register('is_rental', { required: true })}
            className={classes.radioInput}
          />
          <span className={classes.radioCustom}></span>
          იყიდება
        </label>

        <label className={classes.radioLabel}>
          <input
            type="radio"
            name={'is_rental'}
            value={1}
            {...register('is_rental', { required: true })}
            className={classes.radioInput}
          />
          <span className={classes.radioCustom}></span>
          ქირავდება
        </label>
      </div>


    </form>
  )
}

export default AddListingPage