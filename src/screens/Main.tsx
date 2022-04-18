import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import { globalStyles } from '../css/GlobalStyles';
import Search from '../components/Search'
import Logo from '../components/Logo';

export default function Main(navigation: NavigationProp<ParamListBase>) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo/>
      <View style={styles.innerWrap}>
        <Text style={globalStyles.bold}>Welcome to Moves Forcast, a simple weather app that helps you plan your gig work.</Text>
        <Search searchType='City' placeholder={'City'} navigation={navigation}/>
        <Search searchType='Zip Code' placeholder={'CA/US codes only'}navigation={navigation}/>
        <Text style={styles.bottomPadding}></Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  innerWrap: {
    margin: 10,
  },
  bottomPadding: {
    paddingBottom: 300,
  }
});
