import React, { useEffect, useState } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
NavigationBar.setBackgroundColorAsync("#0D0E10");  
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Dimensions,StyleSheet,AppState,BackHandler} from "react-native"
import ActionMovies from "@/Screen/movies/ActionMovies/ActionMovies";
import GlobalHitsMovies from "@/Screen/movies/GlobalHitsMovies/GlobalHitsMoviesScreen";
import RomanticMovies from "@/Screen/movies/RemanceMovies/RomanticMovies";
import SouthDubbedMovies from "@/Screen/movies/SouthMovies/SouthDubbedMoviesScreen";
import BhojpuriBhaukalMovies from "@/Screen/movies/BhojpuriMovies/BhojpuriBhaukalMovies";
import HorrorMovies from "@/Screen/movies/HorrorMovies/HorrorMovies";
import MoviePlayer from "@/Screen/VideoPlayer/MoviePlayerScreen";
import Home from "@/Screen/HomeScreen";
import Splash from '@/Screen/SplashScreen';
const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;
import * as SplashScreenLib from 'expo-splash-screen';

export default function HomeScreen({route}){
  useEffect(() => {
    SplashScreenLib.preventAutoHideAsync();
    setTimeout(async () => {
      await SplashScreenLib.hideAsync();
    }, 2000); 
    return () => {
      SplashScreenLib.preventAutoHideAsync(); 
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
             height: 28,resizeMode:"contain" }}
          source={require('../assets/images/stream4us/logo/stream4us_logo.png')}
        />
      }}>
    {/* <Stack.Screen name="Splash" component={Splash} options={{
      headerLeft:()=>null,
      headerShown:false
    }}      />          */}
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
 
})