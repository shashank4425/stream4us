
import AppNavigator from '@/navigator/AppNavigator';
import { useDebugValue, useEffect } from 'react';
import { Image, StyleSheet,Dimensions, Platform, SafeAreaView, ScrollView, View } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Splash({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Home")
        }, 5000)
    }, []);
    return (
        <View style={styles.container}>
            <View>
            {/* <Image source={require("../assets/images/stream4us/logo/app_icon_new.png")} style={styles.imgSize} /> */}
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
 container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#0D0E10",
 },
 imgSize: {
    resizeMode:"cover",
    height:70,
    width:280
 }
});
