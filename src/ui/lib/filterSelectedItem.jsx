import classes from './filterSelectedItem.module.scss'
import Icon from '../shared/svgIcons/Icon.jsx'

const FilterSelectedItem = ({
  value,
  type,
  initValue,
  setDropDownDataForFilter
}) => {

  return (
    <div className={classes['selected-item']}>
      <p>{type === 'priceRange'
        ? `${value.min || '0'} ₾ - ${value.max || '∞'} ₾`
        : type ===
        'area' ? `${value.min || '0'} მ² - ${value.max || '∞'} მ²` : value
      }</p>
      <button className={classes['selected-item__btn-remove']}
              onClick={() => setDropDownDataForFilter(prevState => ({
                ...prevState,
                [type]: initValue
              }))}><Icon className={classes['icon-x']} name={'x'}
                         viewBox={'0 0 14 14'} stroke="#FF0000"/>
      </button>
    </div>
  )
}

const FilterSelectedRegions = ({ regions, setDropDownDataForFilter }) => {
  return (
    <>
      {regions?.map(region => (
        <div key={region.id} className={classes['selected-item']}>
          <p>{`${region.name}`}</p>
          <button
            className={classes['selected-item__btn-remove']}
            onClick={() =>
              setDropDownDataForFilter(prevState => ({
                ...prevState,
                regions: regions.filter(reg => reg.id !== region.id)
              }))
            }
          >
            <Icon className={classes['icon-x']} name={'x'} viewBox={'0 0 14 14'}
                  stroke="#FF0000"/>
          </button>
        </div>
      ))}
    </>
  )
}

export { FilterSelectedItem, FilterSelectedRegions }
