import react, { useEffect } from "react"
import * as NavigationBar from 'expo-navigation-bar';
NavigationBar.setBackgroundColorAsync("#0D0E10"); 
import { View, StyleSheet, ActivityIndicator,Image,Animated } from "react-native"

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
        }, 3000); 
      }, []);  
    return (
        <View style={Styles.container}>
           <Image style={Styles.imgSize} 
            source={require('../assets/images/stream4us/logo/stream4us-icon.png')}/>
            <ActivityIndicator color="#fffaf0" size="large" style={{marginLeft:10}}/>
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        backgroundColor:"#0D0E10",
        resizeMode:"cover",
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    imgSize: {
        height:140,
        width:110,
        resizeMode:"cover"
    }
})