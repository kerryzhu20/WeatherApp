import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { getForcast } from '../apis/OpenWeather';
import { globalStyles } from "../css/GlobalStyles";
import { determineWeatherImage, determineSuggestion } from "../utils/determineTools";
import Logo from '../components/Logo';
import OneDayWeather from "../components/OneDayWeather";

type weatherInfo = {
  current: {weatherType: string, temp: number},
  daily: Array<{weatherType: string, maxTemp: number, minTemp: number, wind: number, precip: number, humidity: number}>
}

export default function Results(navigator: any) {
  const blankInfo = {
    current: {weatherType: "", temp: 0},
    daily: [{weatherType: "", maxTemp: 0, minTemp: 0, wind: 0, precip: 0, humidity: 0}]
  }

  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(false)
  const [getWeatherInfo, setWeatherInfo] = useState<weatherInfo>(blankInfo)

  useEffect(() => {
    async function fetchResults() {
      const forcast = await getForcast(navigator.route.params?.lat, navigator.route.params?.lon)
      if (!forcast.current) {
        setError(true)
        return
      }
      // populate forcast object with weather data 
      let info: weatherInfo = {
        current: {weatherType: forcast.current.weather[0].main, temp: forcast.current.temp-273.15},
        daily: []
      }
      forcast.daily.map((day: any)=>{ // day object details found at https://openweathermap.org/api/one-call-api
        info.daily.push({
          weatherType: day.weather[0].main,
          maxTemp: day.temp.max-273.15, 
          minTemp: day.temp.min-273.15, 
          wind: day.wind_speed * 3600 / 1000 , 
          precip: day.pop*100, 
          humidity: day.humidity})
      })

      setWeatherInfo(info)
      setFetching(false)
    }
    fetchResults()
  }, []);

  return (
    
    <View style={styles.container}>
      <Logo/>
      {!fetching || <Text style={{...globalStyles.centerText, ...globalStyles.bold}}>Fetching weather info...</Text>}
      {!error || <Text style={globalStyles.errorColor}>Error fetching weather info for "{navigator.route.params?.location}"</Text>}
      {fetching || 
        <View style={styles.innerContainer}>
          {determineWeatherImage(getWeatherInfo.current.weatherType, 80, 120)}
          <Text style={globalStyles.bold}>
            The current temperature around {navigator.route.params?.location} is {Math.round(getWeatherInfo.current.temp)}
            °c with some {getWeatherInfo.current.weatherType.toLowerCase()}.{"\n"}
            Suggestion: {determineSuggestion(getWeatherInfo.current.temp)}.
          </Text>
          <View style={styles.swiperWrap}>
            <Swiper>
              {getWeatherInfo.daily.map((day, index) => {
                return <OneDayWeather key={index} info={day} day={index}/>
              })}
            </Swiper>
          </View>
        </View> 
      }
      <TouchableOpacity style={{...styles.backBtn, ...globalStyles.themeColor}} onPress={()=>navigator.navigation.navigate('Main')}>
        <Text style={globalStyles.bold}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    margin: 10,
    alignItems: 'center'
  },
  swiperWrap: {
    height: 280,
  },
  backBtn: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
});
