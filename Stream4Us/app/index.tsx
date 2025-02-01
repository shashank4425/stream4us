import React, { useEffect, useState } from 'react';
import {Dimensions, StatusBar} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';

import { Image, StyleSheet} from "react-native"
import ActionMovies from "@/Screen/movies/ActionMovies/ActionMovies";
import GlobalHitsMovies from "@/Screen/movies/GlobalHitsMovies/GlobalHitsMoviesScreen";
import RomanticMovies from "@/Screen/movies/RemanceMovies/RomanticMovies";
import SouthDubbedMovies from "@/Screen/movies/SouthMovies/SouthDubbedMoviesScreen";
import BhojpuriBhaukalMovies from "@/Screen/movies/BhojpuriMovies/BhojpuriBhaukalMovies";
import HorrorMovies from "@/Screen/movies/HorrorMovies/HorrorMovies";
import MoviePlayer from "@/Screen/VideoPlayer/MoviePlayerScreen";
import Home from "@/Screen/HomeScreen";
import Splash from '@/Screen/SplashScreen';
import * as NavigationBar from 'expo-navigation-bar';
const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function HomeScreen({route}){
  NavigationBar.setBackgroundColorAsync("#0D0E10")
    return (      
      <Stack.Navigator initialRouteName='Splash' screenOptions={{
        cardStyle: {
          backgroundColor:"#0D0E10",
          width:windowWidth
        },headerTitle:() =>
          <Image
          style={{marginTop:-15, width: windowWidth/4.6,
             height: 28 }}
          source={require('../assets/images/stream4us/logo/stream4us.png')}
        />
      }}>
    <Stack.Screen name="Splash" component={Splash} options={{
      headerLeft:()=>null,
      headerShown:false
    }}      />         
    <Stack.Screen name="Home" component={Home} options={{
      headerLeft:()=>null,
      headerShown:true,
      headerStyle: {backgroundColor:"#0D0E10", height:45},
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