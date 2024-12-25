import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from "@/Screen/HomeScreen";

const Stack = createStackNavigator();
const Drawer= createDrawerNavigator();

function MenuNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name='Home' component={Home} options={{headerShown:true}}></Drawer.Screen>
    </Drawer.Navigator>
  )
};

export default MenuNavigator;
