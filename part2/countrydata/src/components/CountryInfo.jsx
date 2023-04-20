import './CountryInfo.css'

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
        {console.log(country.languages)}
        {console.log(typeof(country.languages))}

        {Object.values(country.languages).map((lang) => {
          return <li key={lang}>{lang}</li>
        })}
        

         
      </ul>
      <p className='flag'>{country.flag}</p>
    </div>
  )
}

export default CountryInfo
