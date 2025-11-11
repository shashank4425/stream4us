import react, { useEffect } from "react"
import * as NavigationBar from 'expo-navigation-bar';

import { View, StyleSheet, ActivityIndicator,Image,Animated } from "react-native"
import { StatusBar } from "expo-status-bar";

export default function SplashScreen({navigation}) {
    
      const fadeAnim = new Animated.Value(0); 

      useEffect(() => {
        Animated.timing(fadeAnim, {
          toValue: 1, 
          duration: 3000, 
          useNativeDriver: true, 
        }).start();
    
        setTimeout(() => {
          navigation.replace('Home');
        }, 30000); 
      }, []);  
    return (
      
        <View style={Styles.container}>
          <StatusBar hidden={true}/>
           {/* <Image style={Styles.imgSize} 
            source={require('../assets/images/stream4us/logo/stream4us_splash.png')}/>
            */}
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    imgSize: {
        height:"100%",
        width:"100%",
        resizeMode:"cover"
    }
})