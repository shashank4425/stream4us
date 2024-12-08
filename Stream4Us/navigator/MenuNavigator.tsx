import React from "react";
import { useNavigation } from "expo-router";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Ionicons } from "@expo/vector-icons";
import Bollwood from "@/Screen/BollywoodMoviesScreen";
import Movies from "@/Screen/Movies";
import Series from "@/Screen/Series";
import Splash from "@/Screen/SplashScreen";
import Home from "@/Screen/HomeScreen";

const Stack = createStackNavigator();
const Drawer= createDrawerNavigator();

function MenuNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name='Home' component={Home} options={{headerShown:true}}></Drawer.Screen>
      <Drawer.Screen name='Movies' component={Movies} options={{headerShown:false}}></Drawer.Screen>
      <Drawer.Screen name="Series" component={Series} options={{headerShown:false}}></Drawer.Screen>
    </Drawer.Navigator>
  )
};

export default MenuNavigator;
