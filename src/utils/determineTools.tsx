import { StyleSheet, Image } from 'react-native';

export function determineWeatherImage(weatherType: string, height: number, width: number) {
  const styles = StyleSheet.create({
    image: {
      height: height,
      width: width,
      marginBottom: 20,
      resizeMode: 'contain',
    },
  })

  if ('Rain Drizzle'.includes(weatherType)){
    return <Image style={styles.image}source={require('../assets/rain.png')}/>
  } else if ('Snow'.includes(weatherType)){
    return <Image style={styles.image}source={require('../assets/snow.png')}/>
  } else if ('Thunderstorm Clouds Mist Smoke Haze Fog Ash'.includes(weatherType)){
    return <Image style={styles.image}source={require('../assets/clouds.png')}/>
  } else if ('Clear Sand'.includes(weatherType)){
    return <Image style={styles.image}source={require('../assets/sun.png')}/>
  } else if ('Squall Tornado Dust'.includes(weatherType)){
    return <Image style={styles.image}source={require('../assets/wind.png')}/>
  } else{
    return <Image style={styles.image}source={require('../assets/unknown.png')}/>
  }
}

export function determineSuggestion(temp: number){
  let suggestion = ""
  if (temp < -20) {
      suggestion= "It's extremely cold out, consider staying inside"
  } else if (-20 <= temp && temp < 0) {
      suggestion= "It's very cold out, bundle up with a hat, scarf, gloves, and winter jacket"
  } else if (0 <= temp && temp < 10) {
      suggestion= "It's cold out, wear a winter jacket, light hat, and gloves"
  } else if (10 <= temp && temp < 17) {
      suggestion= "It's cool out, wear a light jacket"
  } else if (17 <= temp && temp < 22) {
      suggestion= "It's comfortable out, wear whatever you want"
  } else if (22 <= temp && temp < 27) {
      suggestion= "It's warm out, consider a t-shirt and pants"
  } else if (27 <= temp && temp < 33) {
      suggestion= " It's hot out, wear shorts and a light shirt"
  } else if (33 <= temp && temp < 40) {
      suggestion= "It's very hot out, wear light colours and breathable fabrics"
  } else {
      suggestion= "It's extremely hot out, consider staying inside"
  }
  return suggestion
}