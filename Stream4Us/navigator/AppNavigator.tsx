import React from "react";
import { useNavigation } from "expo-router";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, ScrollView} from "react-native"
import Bollwood from "@/Screen/BollywoodMoviesScreen";
import Hollwood from "@/Screen/HollywoodMoviesScreen";
import BottomNavigator from "./BottomNavigator";
import Series from "@/Screen/Series/Series";
import BollywoodSeries from "@/Screen/Series/BollywoodSeriesScreen";
import HollywoodSeries from "@/Screen/Series/HollywoodSeriesScreen";

import ActionMovie from "@/Screen/ActionMovies/ActionMovieScreen";
import ActionMovies from "@/Screen/ActionMovies/ActionMovies";
import RomanticMovies from "@/Screen/RemanceMovies/RomanticMovies";
import RomanticMovie from "@/Screen/RemanceMovies/RomanticMovieScreen";
import MoviePlayer from "@/Screen/VideoPlayer/MoviePlayerScreen";
import LandScapeMoviePlayer from "@/Screen/VideoPlayer/LandscapeMoviePlayer";
import PotraitMoviePlayer from "@/Screen/VideoPlayer/PotraitMoviePlayer";
const Stack = createStackNavigator();
const Drawer= createDrawerNavigator();

function AppNavigator({route}){
    return (
      
        <Stack.Navigator screenOptions={{
          cardStyle: {
            backgroundColor:"#0D0E10"
          }
        }}>
      {/* <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/> */}
      <Stack.Screen name="Home" component={BottomNavigator} options={{
        headerLeft:()=>null,
        headerShown:true,
        headerStyle: {backgroundColor:"#0D0E10"},
        headerTintColor:"#ffffff",
        headerTitle:"Stream4Us"
      }}/>
      <Stack.Screen name="BollywoodMovies" component={Bollwood}/>
      <Stack.Screen name="HollywoodMovies" component={Hollwood}/>
      <Stack.Screen name="Series" component={Series}/>     
      <Stack.Screen name="BollywoodSeries" component={BollywoodSeries}/>
      <Stack.Screen name="HollywoodSeries" component={HollywoodSeries}/>
      <Stack.Screen name="ActionMovies" component={ActionMovies}/>
      <Stack.Screen name="ActionMovie" component={ActionMovie}/>
      <Stack.Screen name="Romantic Movies" component={RomanticMovies}/>
      <Stack.Screen name="Romantic Movie" component={RomanticMovie}/>
      <Stack.Screen name="MoviePlayer" component={MoviePlayer} options={{
        headerShown:false
      }}/>
    </Stack.Navigator>
    
    )
}

export default AppNavigator;
const Styles = StyleSheet.create({
 
})