import {domain} from './Headers';
import { OPEN_WEATHER_KEY } from 'react-native-dotenv'; // not sure why this module isn't being detected

export async function getCoordinates(location: string, type: string) {
  try {
    let queryType = `/geo/1.0/direct?q=${location}&limit=4&appid=${OPEN_WEATHER_KEY}`
    if (type == 'Zip Code') {
      let countryCode = 'CA'
      if (location && Number.isNaN(Number(location[0]))) { // set to USA if first char zip code is a number
        countryCode == 'US'
      }
      queryType = `/geo/1.0/zip?zip=${location},${countryCode}&appid=${OPEN_WEATHER_KEY}`
    }
    
    const response = await fetch(domain + queryType)
    const responeJson = await response.json();
    return responeJson

  } catch(e) {
    console.log(e)
  }
}

export async function getForcast(lat: number, lon: number) {
  try{
    const response = await fetch(domain + `/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${OPEN_WEATHER_KEY}`)
    const responeJson = await response.json();
    return responeJson
    
  } catch (e) {
    console.log(e)
  }
}