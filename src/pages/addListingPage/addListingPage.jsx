import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import classes from './addListingPage.module.scss'
import { getCities } from '../../api/geographicalInfo.js'
import Input from '../../ui/lib/input.jsx'
import AddAgentModal from '../homePage/addAgentModal.jsx'
import Select from '../../ui/lib/select.jsx'
import clsx from 'clsx'
import ImagePicker from '../../ui/lib/imagePicker.jsx'
import { getAgents } from '../../api/agents.js'
import BtnWhite from '../../ui/lib/btnWhite.jsx'
import BtnOrangeRed from '../../ui/lib/btnOrangeRed.jsx'
import Textarea from '../../ui/lib/textArea.jsx'

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
    is_rental: '0', address: '', zip_code: '', region: null, city: null
  }
}

const AddListingPage = () => {
  const regionOptions = useSelector(state => state.regions)
  const [citiOptions, setCitiOptions] = useState([])
  const [filteredCityOptions, setFilteredCityOptions] = useState([])
  const [agentOptions, setAgentOptions] = useState([])

  const addAgentModalRef = useRef(null)
  const {
    register,
    watch,
    handleSubmit,
    control,
    getValues,
    resetField,
    setValue,
    trigger,
    formState: { errors, dirtyFields, touchedFields }
  } = useForm({ mode: 'onBlur', defaultValues: loadFormData() })

  const formValues = watch()
  useEffect(() => {
    localStorage.setItem('addListingsForm', JSON.stringify(formValues))
  }, [formValues])

  useEffect(() => {
    getCities().then(res => {setCitiOptions(res)})
    handleGetAgents()
  }, [])

  const handleGetAgents = () => {
    getAgents().then(res => setAgentOptions(res.map(agent => ({
      id: agent.id,
      name: `${agent.name} ${agent.surname}`
    }))))
  }

  const selectedRegion = getValues('region') || {}

  useEffect(() => {
    setFilteredCityOptions(
      citiOptions.filter(city => city.region_id === selectedRegion?.id))
  }, [selectedRegion, citiOptions])

  useEffect(() => {
    resetField('city')
  }, [selectedRegion])

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
    },
    price: {
      required: 'ჩაწერეთ ვალიდური მონაცემები',
      pattern: {
        value: /^\d+$/,
        message: 'მხოლოდ რიცხვები'
      }
    },
    area: {
      required: 'ჩაწერეთ ვალიდური მონაცემები',
      pattern: {
        value: /^\d+$/,
        message: 'მხოლოდ რიცხვები'
      }
    },
    bedrooms: {
      required: 'ჩაწერეთ ვალიდური მონაცემები',
      pattern: {
        value: /^\d+$/,
        message: 'მხოლოდ რიცხვები'
      }
    },
    description: {
      required: 'ჩაწერეთ ვალიდური მონაცემები',
      validate: {
        minWords: (value) => {
          const wordCount = value.trim().split(/\s+/).length
          return wordCount >= 5 || 'ჩაწერეთ მინიმუმ 5 სიტყვა'
        }
      }
    },
    agent: {
      required: 'აირჩიეთ აგენტი'
    }
  }

  const isImageError = watch('newProperty') || false

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
        <div className={clsx(classes['grid-col-2'], classes.location)}>
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

          <Select
            label="ქალაქი"
            name="city"
            control={control}
            options={filteredCityOptions}
          />
        </div>

        <h4>ბინის დეტალები</h4>
        <div
          className={clsx(classes['grid-col-2'], classes['property-details'])}>
          <Input
            {...generateFormFieldProps('price', 'ფასი',
              'მხოლოდ რიცხვები', true,
              {
                register,
                errors,
                validationSchema,
                dirtyFields,
                touchedFields
              })}/>
          <Input
            {...generateFormFieldProps('area', 'ფართობი',
              'მხოლოდ რიცხვები', true,
              {
                register,
                errors,
                validationSchema,
                dirtyFields,
                touchedFields
              })}/>
          <Input
            {...generateFormFieldProps('bedrooms', 'საძინებლების რაოდენობა',
              'მხოლოდ რიცხვები', true,
              {
                register,
                errors,
                validationSchema,
                dirtyFields,
                touchedFields
              })}/>
        </div>

        <Textarea
          label="აღწერა *"
          id="description"
          name="description"
          control={control}
          rules={validationSchema.description}
        />

        <ImagePicker
          name={'newProperty'}
          register={register}
          error={errors.newProperty}
          control={control}
          setValue={setValue}
          getValues={getValues}
          resetField={resetField}
          isImageError={isImageError}
          trigger={trigger}
        />

        <div className={classes['grid-col-2']}>
          <div className={classes.agent}>
            <h4>აგენტი</h4>
            <Select
              label="აირჩიე"
              name="აგენტი"
              control={control}
              options={agentOptions}
            />
          </div>
        </div>

        <div className={classes.buttons}>
          <BtnWhite type={'button'}>გაუქმება</BtnWhite>
          <BtnOrangeRed>დაამატე ლისტინგი</BtnOrangeRed>
        </div>
      </form>
      <AddAgentModal ref={addAgentModalRef}/>
    </>
  )
}

export default AddListingPage