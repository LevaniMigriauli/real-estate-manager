import { useRef, useState } from 'react';
import CustomSelect from '../../../lib/select.jsx';



const PriceSelect = () => {
  const inpRef = useRef();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');


  const options = [
    {
      label: 'Min Price',
      isInput: true,  // Identify as input field
      value: minPrice,
      onChange: (e) => setMinPrice(e.target.value),  // Handle input change
      placeholder: 'Enter min price'
    },
    {
      label: 'Max Price',
      isInput: true,  // Identify as input field
      value: maxPrice,
      onChange: (e) => setMaxPrice(e.target.value),  // Handle input change
      placeholder: 'Enter max price'
    },
    { label: '50,000 ₾', value: '50000' },  // Regular selectable options
    { label: '100,000 ₾', value: '100000' },
    { label: '150,000 ₾', value: '150000' },
    { label: '200,000 ₾', value: '200000' },
    { label: '300,000 ₾', value: '300000' }
  ];

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const menuList = (props) => {
    const handleClick = (e) => {
      e.stopPropagation();
      inpRef.current.focus();
      props.setMenuIsOpen(true);
    };


    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '48%' }}>
            <label>Min Price:</label>
            <input
              ref={inpRef}
              type="text"
              value={minPrice}
              onClick={handleClick}
              onChange={handleMinPriceChange}
              placeholder="Enter min price"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ width: '48%' }}>
            <label>Max Price:</label>
            <input
              type="text"
              value={maxPrice}
              onClick={handleClick}
              onChange={handleMaxPriceChange}
              placeholder="Enter max price"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        </div>

        {/* Options in two columns */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <label>Min Price Options:</label>
            <div onClick={() => setMinPrice('50,000')} style={optionStyle}>50,000 ₾</div>
            <div onClick={() => setMinPrice('100,000')} style={optionStyle}>100,000 ₾</div>
            <div onClick={() => setMinPrice('150,000')} style={optionStyle}>150,000 ₾</div>
            <div onClick={() => setMinPrice('200,000')} style={optionStyle}>200,000 ₾</div>
            <div onClick={() => setMinPrice('300,000')} style={optionStyle}>300,000 ₾</div>
          </div>
          <div>
            <label>Max Price Options:</label>
            <div onClick={() => setMaxPrice('50,000')} style={optionStyle}>50,000 ₾</div>
            <div onClick={() => setMaxPrice('100,000')} style={optionStyle}>100,000 ₾</div>
            <div onClick={() => setMaxPrice('150,000')} style={optionStyle}>150,000 ₾</div>
            <div onClick={() => setMaxPrice('200,000')} style={optionStyle}>200,000 ₾</div>
            <div onClick={() => setMaxPrice('300,000')} style={optionStyle}>300,000 ₾</div>
          </div>
        </div>
      </div>
    );
  };

  const optionStyle = {
    cursor: 'pointer',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
  };

  return (
    <CustomSelect
      placeholder={'საფასო კატეგორია'}
      customMenuListContent={menuList}
      menuHeader={'ფასის მიხედვით'}
      options={options}
    />
  );
};

export default PriceSelect;