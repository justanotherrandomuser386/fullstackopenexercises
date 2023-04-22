import axios from "axios"

const getWeather = (city) => {
  const searchURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  const request = axios.get(searchURL)
  return request.then(response => {
    {console.log(response)}
    return {
      latitude: response.data.results[0].latitude,
      longitude: response.data.results[0].longitude
    }
  }).then((location) => {
  const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`
  return axios.get(weatherURL)})
  .then(response => {
      {console.log(response.data)}
      return {
        temperature: response.data.current_weather.temperature,
        windspeed: response.data.current_weather.windspeed
      }   
  })
}

export default getWeather 

