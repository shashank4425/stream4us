import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import BollywoodSeries from './BollywoodSeriesScreen';
import HollywoodSeries from './HollywoodSeriesScreen';
const TopTab= createMaterialTopTabNavigator();

export default function Series({navigation}: {navigation: any}) {
    return (
        
            <TopTab.Navigator initialRouteName='BollywoodSeries' screenOptions={{
              tabBarActiveTintColor:"#fff",
                tabBarStyle: {
                    backgroundColor:"#0D0E10",
                }
            }}>
                <TopTab.Screen name="BollywoodSeries" component={BollywoodSeries} options={{
                    tabBarLabel:"Bollywood"
                }}></TopTab.Screen>
                <TopTab.Screen name="HollywoodSeries" component={HollywoodSeries} options={{
                    tabBarLabel:"Hollywood"
                }}></TopTab.Screen>
            </TopTab.Navigator>
        
    );
  };

  const style = StyleSheet.create({

  })