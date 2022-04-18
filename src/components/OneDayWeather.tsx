import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../css/GlobalStyles";
import { determineWeatherImage, determineSuggestion } from "../utils/determineTools";

type expectedProps = {
  day: number,
  info: {
    weatherType: string,
    maxTemp: number,
    minTemp: number,
    wind: number,
    precip: number,
    humidity: number,
  }
}

export default class OneDayWeather extends React.Component<expectedProps> {

  formatDate() {
    // sets date to future day and formats string
    let date = new Date()
    date.setDate(date.getDate()+this.props.day);
    return date.toString().slice(0, 15)
  }

  render() {
    return (
      <View style={{...globalStyles.themeColor, ...styles.container}}>
        <View style={styles.miniImageWrapper}>
          {determineWeatherImage(this.props.info.weatherType, 50, 50)}
        </View>
        <Text>{this.formatDate()}</Text>
        <Text>Sky: {this.props.info.weatherType}</Text>
        <Text>Minimum temperature: {Math.round(this.props.info.minTemp)}°c</Text>
        <Text>Maximum temperature: {Math.round(this.props.info.maxTemp)}°c</Text>
        <Text>Wind Speed: {Math.round(this.props.info.wind)} km/hr</Text>
        <Text>Precipitation: {Math.round(this.props.info.precip)}%</Text>
        <Text>Humidity: {Math.round(this.props.info.humidity)}%</Text>
        <Text>Suggestion: {determineSuggestion(this.props.info.maxTemp - (this.props.info.maxTemp - this.props.info.maxTemp) / 2)}.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      padding: 15,
      borderRadius: 10,
    },
    miniImageWrapper: {
      position: 'absolute',
      right: 0,
    },
})
