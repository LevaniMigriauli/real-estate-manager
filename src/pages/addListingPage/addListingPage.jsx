import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import classes from './addListingPage.module.scss'
import { getCities } from '../../api/geographicalInfo.js'
import { setCities } from '../../redux/slices/citiesSlice.js'
import Input from '../../ui/lib/input.jsx'
import AddAgentModal from '../homePage/addAgentModal.jsx'
import CustomDropdown from '../../ui/lib/select.jsx'
import Select from '../../ui/lib/select.jsx'

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
    is_rental: '0', address: '', zip_code: '', region: ''
  }
}

const AddListingPage = () => {
  const regionOptions = useSelector(state => state.regions)
  const dispatch = useDispatch()
  const [citiOptions, setCitiOptions] = useState([])

  const addAgentModalRef = useRef(null)
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors, dirtyFields, touchedFields }
  } = useForm({ mode: 'onBlur', defaultValues: loadFormData() })

  const formValues = watch()
  useEffect(() => {
    localStorage.setItem('addListingsForm', JSON.stringify(formValues))
  }, [formValues])

  useEffect(() => {
    getCities().then(res => {
      setCitiOptions(res)
    // console.log(res)
    // dispatch(setCities(res))
    })
  }, [])


  useEffect(() => {
    console.log('All Form Values:', formValues)
  }, [formValues])

  const validationSchema = {
    is_rental: {
      required: 'აირჩიეთ გარიგების ტიპი'
    },
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
    },
    region: {
      required: 'აირჩიეთ რეგიონი'
    },
    city: {
      required: 'აირჩიეთ ქალაქი'
    }
  }

  const onSubmit = (data) => {
    console.log(data)
    localStorage.removeItem('addListingsForm')
  }

  return (
    <>
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

          <Select
            label="რეგიონი"
            name="region"
            control={control}
            options={regionOptions}
          />

        </div>


      </form>
      <AddAgentModal ref={addAgentModalRef}/>
    </>
  )
}

export default AddListingPage