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
import Radio from '../../ui/lib/radio.jsx'

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

const initialState = {
  is_rental: '0',
  address: '',
  zip_code: '',
  region: null,
  city: null,
  price: '',
  area: '',
  bedrooms: '',
  description: '',
  agent: null
}

const loadFormData = () => {
  const savedData = localStorage.getItem('addListingsForm')
  return savedData ? JSON.parse(savedData) : initialState
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
    reset,
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

  const handleRegionOptionChange = () => {
    setFilteredCityOptions(
      citiOptions.filter(city => city.region_id === selectedRegion?.id))
    resetField('city')
  }

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

  const handleReset = () => {
    reset(initialState)
  }

  const onSubmit = (data) => {
    console.log(data)
    localStorage.removeItem('addListingsForm')
  }

  const radioOptions = [
    { label: 'იყიდება', value: '0' },
    { label: 'ქირავდება', value: '1' }
  ]

  return (
    <>
      <form className={classes['add-listing-form']}
            onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes['main-header']}>ლისტინგის დამატება</h2>

        <h4 className={classes['radioGroup-header']}>გარიგების ტიპი</h4>
        <Radio
          name="is_rental"
          options={radioOptions}
          register={register}
          required={true}
          className={classes}
        />

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
            isReq
            rules={validationSchema.region}
            control={control}
            options={regionOptions}
            error={errors.region}
            isDirty={dirtyFields.region}
            isTouched={touchedFields.region}
            onRegionOptionSelect={handleRegionOptionChange}
          />

          <Select
            label="ქალაქი"
            name="city"
            isReq
            rules={validationSchema.city}
            control={control}
            options={filteredCityOptions.length
              ? filteredCityOptions
              : citiOptions}
            error={errors.city}
            isDirty={dirtyFields.city}
            isTouched={touchedFields.city}
          />
        </div>

        <h4 className={classes.heading}>ბინის დეტალები</h4>
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
          name="description"
          label="აღწერა"
          isReq
          control={control}
          error={validationSchema.description}
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
            <h4 className={classes.heading}>აგენტი</h4>
            <Select
              label="აირჩიე"
              name="agent"
              isReq
              rules={validationSchema.agent}
              control={control}
              options={agentOptions}
              error={errors.agent}
              isDirty={dirtyFields.agent}
              isTouched={touchedFields.agent}
            />
          </div>
        </div>

        <div className={classes.buttons}>
          <BtnWhite type={'button'}
                    onClick={() => handleReset()}>გაუქმება</BtnWhite>
          <BtnOrangeRed>დაამატე ლისტინგი</BtnOrangeRed>
        </div>
      </form>
      <AddAgentModal ref={addAgentModalRef}/>
    </>
  )
}

export default AddListingPage