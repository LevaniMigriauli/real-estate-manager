import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const CustomModal = forwardRef(({ isOpen, children, padding, borderRadius }, ref) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen || false)

  useImperativeHandle(ref, () => ({
    handleOpenModal () {
      setModalIsOpen(true)
    },
    handleCloseModal () {
      setModalIsOpen(false)
    },
    isOpened () {
      return modalIsOpen
    }
  }))

  return (
    <div>
      <Modal
        ref={ref}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(2, 21, 38, 0.34)'
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            padding: `${padding}`,
            borderRadius: borderRadius
          }
        }}
      >
        {children}
      </Modal>
    </div>
  )
})
export default CustomModal
