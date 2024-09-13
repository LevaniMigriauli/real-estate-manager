import { useState } from 'react'
import Select, { components } from 'react-select'
import './select.scss'

export const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      {props.option}
    </components.Option>
  )
}

const CustomMenuList = (props) => {
  const handleCloseMenu = () => props.setMenuIsOpen(false)

  return (
    <components.MenuList {...props}>
      <h4>{props.menuHeader}</h4>
      {props.customMenuListContent}
      <div className="button-container">
        <button className="submit-button" onClick={handleCloseMenu}>
          Submit
        </button>
      </div>
    </components.MenuList>
  )
}

const CustomDropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps
  return (
    <components.DropdownIndicator {...props}>
      {menuIsOpen ? (
        <span style={{ transform: 'rotate(180deg)' }}>&#x25BC;</span>
      ) : (
        <span>&#x25BC;</span>
      )}
    </components.DropdownIndicator>
  )
}

const CustomSelect = ({
  options,
  isMulti,
  customMenuListContent,
  option,
  placeholder,
  menuHeader
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <Select
      options={options}
      isMulti={isMulti}
      components={{
        MenuList: (props) => <CustomMenuList {...props}
                                             setMenuIsOpen={setMenuIsOpen}
                                             menuHeader={menuHeader}
                                             customMenuListContent={customMenuListContent &&
                                               customMenuListContent({
                                                 ...props,
                                                 setMenuIsOpen
                                               })}/>,
        Option: (props) => option &&
          (<CustomOption {...props} menuIsOpen={menuIsOpen}
                         option={option && option(props)}/>),
        DropdownIndicator: CustomDropdownIndicator
      }}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      menuIsOpen={menuIsOpen}
      onMenuOpen={() => setMenuIsOpen(true)}
      onMenuClose={() => setMenuIsOpen(false)}
      controlShouldRenderValue={false}
      placeholder={placeholder}
      isClearable={false}
      isSearchable={false}
      inputValue={''}
      styles={{
        menu: (provided) => ({
          ...provided,
          width: '730px',
          padding: '24px 24px 28px'
        }),
        control: (provided, state) => ({
          ...provided,
          cursor: 'pointer',
          height: '35px',
          minHeight: 'auto',
          width: 'fit-content',
          border: 'none',
          boxShadow: 'none',
          backgroundColor: state.isFocused ? '#f0f0f0' : 'white'
        }),
        indicatorSeparator: () => ({
          display: 'none'
        })
      }}
    />
  )
}

export default CustomSelect
