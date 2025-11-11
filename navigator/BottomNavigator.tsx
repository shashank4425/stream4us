import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Series from "@/Screen/Series/Series";
import Home from '@/Screen/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
const BottomTab= createBottomTabNavigator();

export default function BottomNavigator({navigation}: {navigation: any}) {
    return (
      <BottomTab.Navigator screenOptions={{
       tabBarStyle:{
        backgroundColor:"#0D0E10",
        margin:0
       }
      }}>
        <BottomTab.Screen name='Main' component={Home} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ), headerShown:false,
          headerLeft:()=>null
        }}/>
      </BottomTab.Navigator>
    )
  };

  const style = StyleSheet.create({

  })