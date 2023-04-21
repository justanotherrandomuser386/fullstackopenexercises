import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import getAllInfo from './services/countries'

function App() {
  
  
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState(null)

  const handleShowButtonClick = (setCountryFilter) => {
    return (country) => {
      setCountryFilter(country)
    }
  }

  const handleCountryChange = (event) => {
    setCountryFilter(event.target.value)
  }

  
  useEffect(() => {
    getAllInfo().then(data => {
      setCountries(data)
    }) 
  }, [])
  return (
    <div>
      <Filter country={countryFilter} handleCountryChange={handleCountryChange}/>
      <CountryList countries={countries} filter={countryFilter} clickHandler={handleShowButtonClick(setCountryFilter)}/>
    </div>
  )
}

export default App
