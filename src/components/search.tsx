import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { getCoordinates } from "../apis/OpenWeather";
import { globalStyles } from "../css/GlobalStyles";
import '../css/GlobalStyles.tsx'

type props = {
  searchType: string,
  placeholder: string,
  navigation: any // React Native navigator
}

type location = { // location details for a user search
  lat: number, 
  lon: number, 
  country: string, 
  name: string, 
  state: string,
}

type states = {
  input: string,
  locations: Array<location>,
  fetching: boolean,
  error: string,
}

export default class Search extends React.Component<props, states> {
  constructor(props: props) {
    super(props);
    this.state = {
      input: '',
      locations: [],
      fetching: false,
      error: '',
    }
  }

  changeTextInputHandler(text: string) {
    this.setState({input: text})
  }

  goToForcast(lat: number, lon: number, location: string) {
    this.props.navigation.navigation.navigate('Results', {lat: lat, lon: lon, location})
  }


  async onPressForcast() {
    this.setState({fetching: true})
    let locations = await getCoordinates(this.state.input, this.props.searchType)
    this.setState({fetching: false})
    if (locations.country) { // if only 1 location, navigate to results right away
      return this.goToForcast(locations.lat, locations.lon, this.state.input)
    }
    if (!Array.isArray(locations) || locations.length == 0) { // location not found, display error state
      this.setState({error: `Cannot find info for ${this.props.searchType}: \"${this.state.input}\"`, locations: []})
      return
    } else if (locations.length > 1) { // multiple locations found
      this.setState({locations: locations, error: ""})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={globalStyles.bold}>Search by {this.props.searchType}</Text>
        <View style={styles.inputWrap}>
          <TextInput 
            style={styles.input} 
            onChange={e=>{this.changeTextInputHandler(e.nativeEvent.text)}}
            placeholder={this.props.placeholder}
          />
          <TouchableOpacity style={{...styles.searchBtn, ...globalStyles.themeColor}} onPress={()=>this.onPressForcast()}>
            <Text style={globalStyles.bold}>Forcast</Text>
          </TouchableOpacity>
        </View>
        {!this.state.fetching || <Text style={globalStyles.bold}>Fetching weather info...</Text>}
        {this.state.locations.map((location: location, index: number)=>{
          return (
            <TouchableOpacity 
              key={index} 
              style={{...styles.possibleLocation, ...globalStyles.themeColor }} 
              onPress={()=>{this.goToForcast(location.lat, location.lon, this.state.input)}}
            >
              <Text style={globalStyles.bold}>Did you mean {location.name}, {location.state}, {location.country}?</Text>
            </TouchableOpacity>
          )
        })}
        <Text style={globalStyles.errorColor}>{this.state.error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginTop: 15,
    },
    input: {
      height: 40,
      width: '60%',
      marginTop: 5,
      marginRight: 10,
      borderWidth: 1,
      padding: 10,
    },
    inputWrap: {
      flexDirection: 'row',
    },
    searchBtn: {
      backgroundColor: '#74cc8b',
      padding: 10,
      justifyContent: 'center',
    },
    possibleLocation: {
      marginTop: 10,
      padding: 8,
      height: 50,
      color:'white',
      justifyContent: 'center',
      borderRadius: 5,
    },
})
