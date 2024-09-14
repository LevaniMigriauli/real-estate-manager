import { memo } from 'react'

const SvgIcons = () => {
  return (
    <svg
      style={{ width: 0, height: 0, position: 'absolute', zIndex: -1 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <symbol id={'IcnBlackCheck'} width="12" height="11" viewBox="0 0 12 11"
              fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1.4082L4.125 9.59002L1 5.87101" stroke="#021526"
              strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
      </symbol>
      <symbol id={'plusCircle'} width="24" height="24" viewBox="0 0 24 24"
              fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8V16" stroke="#2D3648" strokeLinecap="round"
              strokeLinejoin="round"/>
        <path d="M8 12H16" stroke="#2D3648" strokeLinecap="round"
              strokeLinejoin="round"/>
      </symbol>
      <symbol id={'delete'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11.5" fill="white" stroke="#021526"/>
        <path d="M6.75 8.5H7.91667H17.25" stroke="#021526" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.0834 8.50033V16.667C16.0834 16.9764 15.9605 17.2732 15.7417 17.492C15.5229 17.7107 15.2262 17.8337 14.9167 17.8337H9.08341C8.774 17.8337 8.47725 17.7107 8.25846 17.492C8.03966 17.2732 7.91675 16.9764 7.91675 16.667V8.50033M9.66675 8.50033V7.33366C9.66675 7.02424 9.78966 6.72749 10.0085 6.5087C10.2272 6.28991 10.524 6.16699 10.8334 6.16699H13.1667C13.4762 6.16699 13.7729 6.28991 13.9917 6.5087C14.2105 6.72749 14.3334 7.02424 14.3334 7.33366V8.50033" stroke="#021526" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.8333 11.417V14.917" stroke="#021526" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.1667 11.417V14.917" stroke="#021526" strokeLinecap="round" strokeLinejoin="round"/>
      </symbol>
    </svg>
  )
}

export default memo(SvgIcons)