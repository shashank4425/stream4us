import react, { useEffect } from "react"
import { View, StyleSheet, ActivityIndicator,Image } from "react-native"

export default function SplashScreen({navigation}) {
    useEffect(() => {        
          setTimeout(async () => {
            navigation.navigate('Home');
        }, 4000);
      },  []);
 
    return (
            <View style={Styles.container}>
                <Image style={Styles.imgSize} 
                source={require('../assets/images/stream4us/logo/stream4us-icon.png')}/>
                <ActivityIndicator color="#fffaf0" size="large"/>
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
    }
    
})