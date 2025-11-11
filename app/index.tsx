import Home from "@/Screen/HomeScreen";
import ActionMovies from "@/Screen/movies/ActionMovies/ActionMovies";
import BhojpuriBhaukalMovies from "@/Screen/movies/BhojpuriMovies/BhojpuriBhaukalMovies";
import GlobalHitsMovies from "@/Screen/movies/GlobalHitsMovies/GlobalHitsMoviesScreen";
import HorrorMovies from "@/Screen/movies/HorrorMovies/HorrorMovies";
import RomanticMovies from "@/Screen/movies/RemanceMovies/RomanticMovies";
import SouthDubbedMovies from "@/Screen/movies/SouthMovies/SouthDubbedMoviesScreen";
import MoviePlayer from "@/Screen/VideoPlayer/MoviePlayerScreen";
import { createStackNavigator } from '@react-navigation/stack';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { AppState, Dimensions, Image, StyleSheet } from "react-native";
NavigationBar.setBackgroundColorAsync("#0D0E10");  
const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function HomeScreen({route}){
  useEffect(() => {
    const handleAppStateChange = async (nexAppState) =>{
      if(nexAppState === 'active'){
        SplashScreen.preventAutoHideAsync();
        setTimeout(async () => {
          await SplashScreen.hideAsync();
        }, 3500); 
       }
      }
      AppState.addEventListener('change', handleAppStateChange);
    return () => {
      SplashScreen.preventAutoHideAsync(); 
    };
  }, []);
 
  return (     
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        cardStyle: {
          backgroundColor:"#0D0E10",
          width:windowWidth
        },headerTitle:() =>
          <Image
          style={{marginTop:-15, width: windowWidth/7,
             height: 30,resizeMode:"contain" }}
          source={require('../assets/images/stream4us/logo/app-logo-stream4us.png')}
        />
      }}>
    <Stack.Screen name="Home" component={Home} options={{
      headerLeft:()=>null,
      headerShown:true,
      headerStyle: {backgroundColor:"#0D0E10", height:50},
      headerTintColor:"#ffffff"
    }}/> 
    <Stack.Screen name="Action Movies" component={ActionMovies} options={{
      headerTitle:() => null, headerTintColor:"#FFF", headerStyle: {backgroundColor:"#0D0E10", height:55},
    }}/>
    <Stack.Screen name="Global Hits Movies" component={GlobalHitsMovies} options={{
      headerTitle:() => null, headerTintColor: "#FFF", headerStyle: {backgroundColor:"#0D0E10", height:55},
    }}/>
    <Stack.Screen name="Romantic Movies" component={RomanticMovies} options={{
      headerTitle:() => null, headerTintColor: "#FFF", headerStyle: {backgroundColor:"#0D0E10", height:55},
    }}/>      
    <Stack.Screen name="South Dubbed Movies" component={SouthDubbedMovies} options={{
      headerTitle:() => null,  headerTintColor: "#FFF", headerStyle: {backgroundColor:"#0D0E10", height:55},
    }}/>
      
      <Stack.Screen name="Bhojpuri Bhaukal" component={BhojpuriBhaukalMovies} options={{
      headerTitle:() => null,  headerTintColor: "#FFF", headerStyle: {backgroundColor:"#0D0E10", height:55},
    }}/>
    <Stack.Screen name="Horror" component={HorrorMovies} options={{
      headerTitle:() => null,  headerTintColor: "#FFF", headerStyle: {backgroundColor:"#0D0E10", height:55},
    }}/>
    <Stack.Screen name="MoviePlayer" component={MoviePlayer} options={{
      headerShown:false, cardStyle: {width:"100%", height:"100%", backgroundColor:"#0D0E10"}
          }}/>
    </Stack.Navigator>
    )
}

const Styles = StyleSheet.create({
  // background: rgb(63,94,251);
  // background: linear-gradient(130deg, rgba(63,94,251,1) 40%, rgba(233,11,110,1) 90%);
})