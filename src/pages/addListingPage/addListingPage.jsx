import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import classes from './addListingPage.module.scss'
import { getCities } from '../../api/geographicalInfo.js'
import { setCities } from '../../redux/slices/citiesSlice.js'
import Input from '../../ui/lib/input.jsx'

const generateFormFieldProps = (
  name, label, hint, isReq,
  { register, errors, validationSchema, dirtyFields, touchedFields }) => {
  return {
    name,
    label,
    hint,
    isReq,
    register,
    validation: validationSchema[name],
    error: errors[name],
    isDirty: dirtyFields[name],
    isTouched: touchedFields[name]
  }
}

const loadFormData = () => {
  const savedData = localStorage.getItem('addListingsForm')
  return savedData ? JSON.parse(savedData) : {
    is_rental: '0', address: '', zip_code: ''
  }
}

const AddListingPage = () => {
  const dispatch = useDispatch()

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, dirtyFields, touchedFields }
  } = useForm({ mode: 'onBlur', defaultValues: loadFormData() })

  const formValues = watch()
  useEffect(() => {
    localStorage.setItem('addListingsForm', JSON.stringify(formValues))
  },[formValues])

  useEffect(() => {
    // getCities().then(res => {
    // console.log(res)
    // dispatch(setCities(res))
    // })
  }, [])


  useEffect(() => {
    console.log('All Form Values:', formValues)
  }, [formValues])

  const validationSchema = {
    address: {
      required: 'ჩაწერეთ ვალიდური მონაცემები',
      minLength: {
        value: 2,
        message: 'მინიმუმ ორი სიმბოლო'
      }
    },
    zip_code: {
      required: 'ჩაწერეთ ვალიდური მონაცემები',
      pattern: {
        value: /^[0-9]+$/,
        message: 'მხოლოდ რიცხვები'
      }
    }
  }

  const onSubmit = (data) => {
    console.log(data)
    localStorage.removeItem('addListingsForm')
  }

  return (
    <form className={classes['add-listing-form']}
          onSubmit={handleSubmit(onSubmit)}>
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

      <h4 className={classes.heading}>მდებარეობა</h4>
      <div className={classes['grid-col-2']}>
        <Input
          {...generateFormFieldProps('address', 'მისამართი',
            'მინიმუმ ორი სიმბოლო', true,
            {
              register,
              errors,
              validationSchema,
              dirtyFields,
              touchedFields
            })}/>
        <Input
          {...generateFormFieldProps('zip_code', 'საფოსტო ინდექსი',
            'მხოლოდ რიცხვები', true,
            {
              register,
              errors,
              validationSchema,
              dirtyFields,
              touchedFields
            })}/>

      </div>


    </form>
  )
}

export default AddListingPage