import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import getAllInfo from './services/countries'

function App() {
  

  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState(null)


  const handleCountryChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const cList = [
    {name:'Argentina'},
    {name:'Armenia'},
    {name:'Austria'},
    {name:'Austaralia'},
    {name:'Barbados'},
    {name:'Cuba'},
    {name:'Congo'},
    {name:'England'},
    {name:'Estonia'},
    {name:'Italy'},
    {name:'Litva'},
    {name:'Morocco'},
  ]

  useEffect(() => {
    getAllInfo().then(data => {
      setCountries(data)
    }) 
  }, [])
  return (
    <div>
      <Filter country={countryFilter} handleCountryChange={handleCountryChange}/>
      <CountryList countries={countries} filter={countryFilter}/>
    </div>
  )
}

export default App
