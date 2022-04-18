import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";

export default class Logo extends React.Component {
  render() {
    return (
      <Image source={require('../assets/AppLogo.png')} style={styles.logoSize}/>
    );
  }
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  logoSize: {
    width: windowWidth,
    height: windowWidth/ 3,
    resizeMode: 'stretch',
  }
})
