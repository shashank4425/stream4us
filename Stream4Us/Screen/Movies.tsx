import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Bollywood from './BollywoodMoviesScreen';
import Hollywood from './HollywoodMoviesScreen';

const TopTab= createMaterialTopTabNavigator();

export default function Series({navigation,route}: {navigation: any}) {

    return (
        
            <TopTab.Navigator initialRouteName='BollywoodMovies' screenOptions={{
                tabBarStyle: {
                    backgroundColor:"#0D0E10"
                }
            }}>
                <TopTab.Screen name="BollywoodMovies" component={Bollywood} options={{
                title: ""
                }}>                   
                </TopTab.Screen>
                <TopTab.Screen name="HollywoodMovies" component={Hollywood} options={{
                    tabBarLabel:"Hollywood"
                }}></TopTab.Screen>
            </TopTab.Navigator>
        
    );
  };

  const style = StyleSheet.create({

  })