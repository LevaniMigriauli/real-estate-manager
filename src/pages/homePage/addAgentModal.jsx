import { forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import CustomModal from '../../ui/lib/modal.jsx'
import Input from '../../ui/lib/input.jsx'
import ImagePicker from '../../ui/lib/imagePicker.jsx'
import { createAgents } from '../../api/agents.js'

const AddAgentModal = forwardRef(({}, ref) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    resetField,
    reset,
    watch,
    trigger,
    formState: { errors, touchedFields }
  } = useForm({
    mode: 'onChange'
    // shouldUnregister: true
  })

  const onSubmit = (data) => {
    const form = new FormData()

    form.append('name', data.agentName)
    form.append('surname', data.surname)
    form.append('email', data.email)
    form.append('phone', data.phoneNumber)

    if (data.agentPhoto) {
      form.append('avatar', data.agentPhoto)
    } else {
      //error toast
      return
    }

    createAgents(form).then(() => {
      // success toast
    }).catch(() => {
      // error toast
    }).finally(() => {
      reset()
    })
  }

  const handleModalClose = () => {
    reset()
  }

  const isImageError = watch('agentPhoto') || false

  return <CustomModal ref={ref} padding={'87px 105px'} borderRadius={'10px'}
                      width={'1009px'} handleModalClose={handleModalClose}>
    <h4>აგენტის დამატება</h4>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input name="agentName"
             isReq
             label={'სახელი'}
             register={register}
             validation={{
               required: 'ჩაწერეთ ვალიდური მონაცემები',
               minLength: {
                 value: 2,
                 message: 'ჩაწერეთ ვალიდური მონაცემები'
               }
             }}
             hint={
               errors.agentName
                 ? errors.agentName.message : 'მინიმუმ ორი სიმბოლო'
             }
             isTouched={touchedFields}
             error={errors.agentName}/>

      <Input name="surname"
             isReq
             label={'გვარი'}
             register={register}
             validation={{
               required: 'ჩაწერეთ ვალიდური მონაცემები',
               minLength: {
                 value: 2,
                 message: 'ჩაწერეთ ვალიდური მონაცემები'
               }
             }}
             hint={
               errors.surname
                 ? errors.surname.message : 'მინიმუმ ორი სიმბოლო'
             }
             isTouched={touchedFields}
             error={errors.surname}/>

      <Input name={'email'}
             isReq
             label={'ელ-ფოსტა'}
             register={register}
             validation={{
               required: 'ჩაწერეთ ვალიდური მონაცემები',
               pattern: {
                 value: /^[A-Za-z0-9._%+-]+@redberry\.ge$/,
                 message: 'ჩაწერეთ ვალიდური მონაცემები'
               }
             }}
             hint={errors.email
               ? errors.email.message
               : 'გამოიყენეთ @redberry.ge ფოსტა'}
             isTouched={touchedFields}
             error={errors.email}/>

      <Input name={'phoneNumber'}
             isReq
             label={'ტელეფონის ნომერი'}
             register={register}
             validation={{
               required: 'ჩაწერეთ ვალიდური მონაცემები',
               pattern: {
                 value: /^5\d{8}$/,
                 message: 'ჩაწერეთ ვალიდური მონაცემები'
               }
             }}
             maxLength={9}
             hint={errors.phoneNumber
               ? errors.phoneNumber.message
               : 'მხოლოდ რიცხვები'}
             isTouched={touchedFields}
             error={errors.phoneNumber}/>

      <ImagePicker
        name={'agentPhoto'}
        register={register}
        error={errors.agentPhoto}
        control={control}
        setValue={setValue}
        getValues={getValues}
        resetField={resetField}
        isImageError={isImageError}
        trigger={trigger}
      />

      <button>დაამატე აგენტი</button>
    </form>
  </CustomModal>
})

export default AddAgentModal