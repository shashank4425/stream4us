import { useDebugValue, useEffect } from 'react';
import { Image, StyleSheet,Dimensions, Platform, SafeAreaView, ScrollView, View } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ({navigation}) {
  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Navigate to home after splash screen
    }, 3000);

    // Cleanup the timer on unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
    <View>
     <Image source={require("../assets/images/stream4us/logo/stream4us-app-logo.png")}
      style={styles.imgSize} /> 
    </View>
    
</View>
  );
};
const styles = StyleSheet.create({
  container: {
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#0D0E10",
  },
  imgSize: {
     resizeMode:"contain",
     height:100,
     width:180
  }
 });