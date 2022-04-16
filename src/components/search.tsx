import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export default class Search extends React.Component<any, {input: string}> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: '',
    }
  }

  onChangeInputHandler(text: string) {
    this.setState({input: text})
  } 

  onPress() {
    console.log(this.state.input)
  }
  render() {
    return (
      <View>
        <Text>Search by City</Text>
        <View style={styles.inputWrap}>
          <TextInput 
            style={styles.input} 
            onChange={e=>{this.onChangeInputHandler(e.nativeEvent.text)}}
            placeholder='City'
          />
          <TouchableOpacity style={styles.searchBtn} onPress={()=>this.onPress()}>
            <Text>Forcast</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    inputWrap: {
      flexDirection: 'row',
    },
    searchBtn: {
      backgroundColor: 'blue',
    }
})
