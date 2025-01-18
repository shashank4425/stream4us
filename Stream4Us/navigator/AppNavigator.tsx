import React from "react";
import {Dimensions, StatusBar} from "react-native";
import { SplashScreen, useNavigation } from "expo-router";
import { createStackNavigator } from '@react-navigation/stack';

import { Image, View, Text, StyleSheet, ScrollView} from "react-native"
import BottomNavigator from "./BottomNavigator";

import ActionMovies from "@/Screen/movies/ActionMovies/ActionMovies";
import GlobalHitsMovies from "@/Screen/movies/GlobalHitsMovies/GlobalHitsMoviesScreen";
import RomanticMovies from "@/Screen/movies/RemanceMovies/RomanticMovies";
import SouthDubbedMovies from "@/Screen/movies/SouthMovies/SouthDubbedMoviesScreen";
import BhojpuriBhaukalMovies from "@/Screen/movies/BhojpuriMovies/BhojpuriBhaukalMovies";
import HorrorMovies from "@/Screen/movies/HorrorMovies/HorrorMovies";
import MoviePlayer from "@/Screen/VideoPlayer/MoviePlayerScreen";
import Home from "@/Screen/HomeScreen";
import Splash from "@/Screen/SplashScreen";

const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function AppNavigator({route}){
    return (      
      <Stack.Navigator screenOptions={{
        cardStyle: {
          backgroundColor:"#0D0E10",
          width:windowWidth
        },          
        headerTitle:() =>
          <Image
          style={{marginTop:-15, width: windowWidth/4.6,
             height: 28 }}
          source={require('../assets/images/stream4us/logo/pixelcut-export.png')}
        />        }}>
    
    <Stack.Screen name="Splash" component={Splash} options={{
      headerShown:false
    }}/>     
    <Stack.Screen name="Home" component={Home} options={{
      headerLeft:()=>null,
      headerShown:true,
      headerStyle: {backgroundColor:"#0D0E10", height:45},
      headerTintColor:"#ffffff"
    }}      
    />
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

export default AppNavigator;
const Styles = StyleSheet.create({
 
})