import './CountryInfo.css'
import Weather from './Weather'

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.official}</h1>
      <br/>
      capital {country.capital}
      <br/>
      area {country.area}
      <br/>
      languages:
      <ul>
      
        {Object.values(country.languages).map((lang) => {
          return <li key={lang}>{lang}</li>
        })}
     
      </ul>
      <p className='flag'>{country.flag}</p>
      <Weather city={country.capital[0]}/>
    </div>
  )
}

export default CountryInfo
