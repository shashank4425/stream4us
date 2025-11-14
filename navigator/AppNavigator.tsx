import Home from "@/Screen/HomeScreen";
import ActionMovies from "@/Screen/movies/ActionMovies/ActionMovies";
import BhojpuriBhaukalMovies from "@/Screen/movies/BhojpuriMovies/BhojpuriBhaukalMovies";
import GlobalHitsMovies from "@/Screen/movies/GlobalHitsMovies/GlobalHitsMoviesScreen";
import HorrorMovies from "@/Screen/movies/HorrorMovies/HorrorMovies";
import RomanticMovies from "@/Screen/movies/RemanceMovies/RomanticMovies";
import SouthDubbedMovies from "@/Screen/movies/SouthMovies/SouthDubbedMoviesScreen";
import MoviePlayer from "@/Screen/VideoPlayer/MoviePlayerScreen";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';
import React from 'react';
import { Dimensions, Image, StyleSheet } from "react-native";
NavigationBar.setBackgroundColorAsync("#0D0E10");  
const Stack = createNativeStackNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DarkTheme = {
   ...DefaultTheme,
   colors: {
     ...DefaultTheme.colors,
       background: "#0D0E10",
       card: "#0D0E10",
       text: "#FFFFFF"
     }
}
export default function AppNavigator({route}){
  // useEffect(() => {
  //   const handleAppStateChange = async (nexAppState) =>{
  //     if(nexAppState === 'active'){
  //       SplashScreen.preventAutoHideAsync();
  //       setTimeout(async () => {
  //         await SplashScreen.hideAsync();
  //       }, 3500); 
  //      }
  //     }
  //     AppState.addEventListener('change', handleAppStateChange);
  //   return () => {
  //     SplashScreen.preventAutoHideAsync(); 
  //   };
  // }, []);
 
  return ( 
    <NavigationContainer theme={DefaultTheme}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        contentStyle: {
          backgroundColor:"#0D0E10",
          width:windowWidth
        },headerTitle:() =>
          <Image
          style={{marginTop:-15, width: windowWidth/7,
             height: 25,resizeMode:"contain" }}
          source={require('../assets/images/stream4us/logo/app-logo-stream4us.png')}
        />
      }}>
    <Stack.Screen name="Home" component={Home} options={{
      headerLeft:()=>null,
      headerShown:true,
      headerTintColor:"#ffffff"
    }}/> 
    <Stack.Screen name="Action Movies" component={ActionMovies} options={{
      animation: "fade",
      headerTitle:() => null, headerTintColor:"#FFF",
    }}/>
    <Stack.Screen name="Global Hits Movies" component={GlobalHitsMovies} options={{
      animation: "fade",
      headerTitle:() => null, headerTintColor: "#FFF"
     }}/>
    <Stack.Screen name="Romantic Movies" component={RomanticMovies} options={{
      animation: "fade",
      headerTitle:() => null, headerTintColor: "#FFF",
    }}/>      
    <Stack.Screen name="South Dubbed Movies" component={SouthDubbedMovies} options={{
      animation: "fade",
      headerTitle:() => null,  headerTintColor: "#FFF"
    }}/>
      
    <Stack.Screen name="Bhojpuri Bhaukal" component={BhojpuriBhaukalMovies} options={{
        animation: "fade",
      headerTitle:() => null,  headerTintColor: "#FFF"
    }}/>
    <Stack.Screen name="Horror" component={HorrorMovies} options={{
      animation: "fade",
      headerTitle:() => null,  headerTintColor: "#FFF"
    }}/>
    <Stack.Screen name="MoviePlayer" component={MoviePlayer} options={{
      animation: "fade",
      headerShown:false,
          }}/>
    </Stack.Navigator>
    </NavigationContainer>
    )
}

const Styles = StyleSheet.create({
  // background: rgb(63,94,251);
  // background: linear-gradient(130deg, rgba(63,94,251,1) 40%, rgba(233,11,110,1) 90%);
})