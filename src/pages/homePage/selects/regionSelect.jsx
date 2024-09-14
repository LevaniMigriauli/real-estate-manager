import './regionSelect.scss'
import CustomSelect from '../../../ui/lib/select.jsx'
import { useSelector } from 'react-redux'

const RegionSelect = () => {
  const regionOptions = useSelector(state=> state.regions)

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

  return <CustomSelect options={regionOptions} isMulti
                       customMenuListContent={menuList} option={option}
                       placeholder={'რეგიონი'}
                       menuHeader={'რეგიონის მიხედვით'}/>
}

export default RegionSelect