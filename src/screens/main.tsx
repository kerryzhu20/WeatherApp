import { StyleSheet, Text, View, Image } from 'react-native';
import Search from '../components/search'

export default function Main() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/AppLogo.png')} style={styles.logo}/>
      <Text style={styles.intro}>Welcome to moves forcast, a simple weather app that helps you plan your gig work.</Text>
      <Search/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logo: {
    height: '11%',
    width: '100%',
    resizeMode: 'cover',
  },
  intro: {
    margin: 20,
  }
});
