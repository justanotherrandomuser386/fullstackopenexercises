import './CountryList.css'
import CountryInfo from './CountryInfo'


const CountryList = ({ countries, filter }) => {
  if (countries === null) {
    return (
      <div>Loading....</div>
    )
  }

  const filteredCountries = countries.filter((country) => {
    return filter === '' || country.name.official.toLowerCase().indexOf(filter.toLowerCase()) > -1 ? true : false
  })
  if (filteredCountries.length > 130) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        <CountryInfo country={filteredCountries[0]}/>
      </div>
    )
  } else {
    return (
    <div>
      <ul className='countrilist'>
        {filteredCountries.map(country => {
          return <li key={country.name.official}>{country.name.official}</li>
        })}
      </ul> 
    </div>
    )
  }
}

export default CountryList
