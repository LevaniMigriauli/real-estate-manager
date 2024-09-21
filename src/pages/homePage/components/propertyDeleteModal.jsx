import { forwardRef } from 'react'
import classes from './propertyDeleteModal.module.scss'
import Modal from '../../../ui/lib/modal.jsx'
import BtnWhite from '../../../ui/lib/btnWhite.jsx'
import BtnOrangeRed from '../../../ui/lib/btnOrangeRed.jsx'

const PropertyDeleteModal = forwardRef(({ onConfirm }, ref) => {

  return (
    <Modal ref={ref} isOpen borderRadius={'20px'}>
      <div className={classes.modal}>
        <h3>გსურთ წაშალოთ ლისტინგი</h3>
        <div className={classes.btns}>
          <BtnWhite
            onClick={() => ref.current?.handleCloseModal()}>გაუქმება</BtnWhite>
          <BtnOrangeRed type={'button'}
                        onClick={onConfirm}>დადასტურება</BtnOrangeRed>
        </div>
      </div>
    </Modal>
  )
})

export default PropertyDeleteModal