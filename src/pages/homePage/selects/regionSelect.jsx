import './regionSelect.scss'
import CustomSelect from '../../../lib/select.jsx'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'mango', label: 'Mango' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'raspberry', label: 'Raspberry' },
  { value: 'peach', label: 'Peach' },
  { value: 'lime', label: 'Lime' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' }
]
const RegionSelect = () => {

  const option = (props) => {
    console.log(props)
    return <>
      <div className={`custom-checkbox ${props.isSelected ? 'checked' : ''}`}>
        {props.isSelected && <span className="checkbox-tick">✔</span>}
      </div>
      {props.label}
    </>
  }

  const menuList = (props) => {
    console.log(props)
    return <>
      <div className="grid-container">
        {props.children}
      </div>

    </>
  }

  return <CustomSelect options={options} isMulti
                       customMenuListContent={menuList} option={option}
                       placeholder={'რეგიონი'}
                       menuHeader={'რეგიონის მიხედვით'}/>
}

export default RegionSelect