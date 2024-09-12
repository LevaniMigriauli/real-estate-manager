import { useState } from 'react';
import Select, { components } from 'react-select';
import './CustomSelect.scss';

export const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <div className={`custom-checkbox ${props.isSelected ? 'checked' : ''}`}>
        {props.isSelected && <span className="checkbox-tick">✔</span>}
      </div>
      {props.label}
    </components.Option>
  );
};

const CustomMenuList = (props) => {
  const handleCloseMenu = () => {
    props.setMenuIsOpen(false);
  };

  return (
    <components.MenuList {...props}>
      <div className="grid-container">
        {props.children}
      </div>
      <div className="button-container">
        <button className="submit-button" onClick={handleCloseMenu}>
          Submit
        </button>
      </div>
    </components.MenuList>
  );
};

const CustomDropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps;
  return (
    <components.DropdownIndicator {...props}>
      {menuIsOpen ? (
        <span style={{ transform: 'rotate(180deg)' }}>&#x25BC;</span>
      ) : (
        <span>&#x25BC;</span>
      )}
    </components.DropdownIndicator>
  );
};

const CustomSelect = ({options, isMulti}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <Select
      options={options}
      isMulti={isMulti}
      components={{
        MenuList: (props) => <CustomMenuList {...props} setMenuIsOpen={setMenuIsOpen} />,
        Option: CustomOption,
        DropdownIndicator: CustomDropdownIndicator
      }}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      menuIsOpen={menuIsOpen}
      onMenuOpen={() => setMenuIsOpen(true)}
      onMenuClose={() => setMenuIsOpen(false)}
      controlShouldRenderValue={false}
      placeholder={'რეგიონი'}
      isClearable={false}
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
          width: '116px',
          border: 'none',
          boxShadow: 'none',
          backgroundColor: state.isFocused ? '#f0f0f0' : 'white'
        }),
        // dropdownIndicator: (provided) => ({
        //   ...provided,
        //   padding: '0',
        // }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
      }}
    />
  );
};

export default CustomSelect;
