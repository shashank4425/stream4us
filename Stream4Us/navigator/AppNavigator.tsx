import React from "react";
import {Dimensions} from "react-native";
import { useNavigation } from "expo-router";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Image, View, Text, StyleSheet, ScrollView} from "react-native"
import BottomNavigator from "./BottomNavigator";

import ActionMovies from "@/Screen/movies/ActionMovies/ActionMovies";
import GlobalHitsMovies from "@/Screen/movies/GlobalHitsMovies/GlobalHitsMoviesScreen";
import RomanticMovies from "@/Screen/movies/RemanceMovies/RomanticMovies";
import SouthDubbedMovies from "@/Screen/movies/SouthMovies/SouthDubbedMoviesScreen";
import BhojpuriBhaukalovies from "@/Screen/movies/BhojpuriMovies/BhojpuriBhaukalMovies";
import MoviePlayer from "@/Screen/VideoPlayer/MoviePlayerScreen";
import Home from "@/Screen/HomeScreen";

const Stack = createStackNavigator();
const Drawer= createDrawerNavigator();
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
          style={{marginStart:1, width: windowWidth/3.6,
             height: 40, backgroundColor:"#0D0E10" }}
          source={require('../assets/images/stream4us/logo/stream4us_logo.png')}
        />        }}>
    <Stack.Screen name="Home" component={Home} options={{
      headerLeft:()=>null,
      headerShown:true,
      headerStyle: {backgroundColor:"#0D0E10"},
      headerTintColor:"#ffffff"
    }}      
    />
    <Stack.Screen name="Action Movies" component={ActionMovies} options={{
      headerTitle:() => null, headerTintColor:"#FFF", headerStyle: {backgroundColor:"#0D0E10"}
    }}/>
    <Stack.Screen name="Global Hits Movies" component={GlobalHitsMovies} options={{
      headerTitle:() => null, headerTintColor: "#FFF", headerStyle: {backgroundColor:"#0D0E10"}
    }}/>
    <Stack.Screen name="Romantic Movies" component={RomanticMovies} options={{
      headerTitle:() => null, headerTintColor: "#FFF", headerStyle: {backgroundColor:"#0D0E10"}
    }}/>      
    <Stack.Screen name="South Dubbed Movies" component={SouthDubbedMovies} options={{
      headerTitle:() => null,  headerTintColor: "#FFF", headerStyle: {backgroundColor:"#0D0E10"}
    }}/>
      
      <Stack.Screen name="Bhojpuri Bhaukal" component={BhojpuriBhaukalovies} options={{
      headerTitle:() => null,  headerTintColor: "#FFF", headerStyle: {backgroundColor:"#0D0E10"}
    }}/>
    <Stack.Screen name="MoviePlayer" component={MoviePlayer} options={{
      headerShown:false
    }}/>
    </Stack.Navigator>
    )
}

export default AppNavigator;
const Styles = StyleSheet.create({
 
})