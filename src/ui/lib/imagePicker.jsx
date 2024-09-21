import classes from './imagePicker.module.scss'
import Icon from '../shared/svgIcons/Icon.jsx'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import InputLabel from './inputLabel.jsx'

const ImagePicker = ({
  name,
  register,
  error,
  setValue,
  getValues,
  resetField,
  isImageError = false,
  trigger
}) => {
  const imageInputRef = useRef(null)
  const [imagePreview, setImagePreview] = useState()

  const fileMaxSize = 1048576

  useEffect(() => {
    const storedImage = getValues(name)
    if (storedImage) {
      setImagePreview((storedImage))
    }
  }, [getValues, name])

  const handlePickClick = () => imageInputRef.current.click()

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (!file) {
      setImagePreview(null)
      setValue(name, null)
      trigger(name)
      return
    }

    setValue(name, file)
    handleFileToUrl(file)
    trigger(name)
  }

  const handleFileToUrl = (file) => {
    const fileReader = new FileReader()

    fileReader.onload = () => {
      setImagePreview(fileReader.result)
      setValue(name, fileReader.result)
    }

    fileReader.readAsDataURL(file)
  }

  const handleDeleteImage = () => {
    resetField(name)
    setImagePreview(null)
    imageInputRef.current.value = ''
    trigger(name)
  }

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  return (
    <>
      <InputLabel fieldName={name} label={'ატვირთეთ ფოტო'} isReq/>
      <div className={clsx(classes['file-input'], {
        [classes['file-input-img']]: imagePreview,
        [classes['err-border']]: error
      })}>
        {imagePreview && (
          <div className={classes.preview}>
            <img src={imagePreview} alt={`${name} image`}/>
            <Icon
              onClick={handleDeleteImage}
              className={classes['preview-icn-delete']}
              name={'delete'}
              viewBox={'0 0 24 24'}
            />
          </div>
        )}
        <input
          className={classes.input}
          id={name}
          name={name}
          {...register(name, {
            required: 'ატვირთეთ ფოტო',
            validate: {
              sizeLimit: (file) =>
                file?.size <= fileMaxSize ||
                'ფაილის ზომა არ უნდა აღემატებოდეს 1MB-ს'
            },
            onChange: handleImageChange
          })}
          type={'file'}
          accept={'image/*'}
          ref={imageInputRef}
        />

        {!imagePreview && (
          <button
            className={classes.btn}
            type={'button'}
            onClick={handlePickClick}
          >
            <Icon name={'plusCircle'} viewBox={'0 0 24 24'}/>
          </button>
        )}
      </div>
      <p className={clsx(classes.default,
        {
          [classes.err]: error,
          [classes.succ]: !error && imagePreview
        })}>{error && isImageError
        ? error.message
        : 'ატვირთეთ ფოტო'}</p>
    </>
  )
}

export default ImagePicker
