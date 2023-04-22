import './Weather.css'
import getWeather from "../services/weather"
import { useEffect, useState } from 'react'


const Weather = ({ city }) => {

  const [weather, setWeather] = useState(null)
  console.log(city)
  useEffect(()=>{
  const w = getWeather(city)
  w.then(data =>{
      setWeather(data)
    })
  
  }, [])

  if (weather === null) {
    return (
      <div>
        Loaring...
      </div>
    )
  } else {
    return (  
        <div>
          <h1>Weathr in {city} </h1>
          <br/>
          temperature {weather.temperature}
          <br/>
          wind {weather.windspeed}
        </div>
    )
  }
}

export default Weather
