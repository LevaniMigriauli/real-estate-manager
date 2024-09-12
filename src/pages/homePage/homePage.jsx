import classes from "./homePage.module.scss"
import CustomSelect from '../../lib/select2.jsx'

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
];


const HomePage = () => {

  return (
    <div className={classes.homePage}>
      <CustomSelect options={options} isMulti/>

    </div>
  )
}

export default HomePage