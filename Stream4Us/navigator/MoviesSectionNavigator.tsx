import React from "react";
import { useNavigation } from "expo-router";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RomanceMovies from "@/Screen/RemanceMovies/RomanceMovies";
import ActionMovie from "@/Screen/ActionMovies/ActionMovieScreen";
import ActionMovies from "@/Screen/ActionMovies/ActionMovies";
const Stack = createStackNavigator();
const Drawer= createDrawerNavigator();


function MoviesSectionNavigator(){
    return (
      
        <Stack.Navigator>
         <Stack.Screen name="ActionMovies" component={ActionMovies}/>
         <Stack.Screen name="ActionMovie" component={ActionMovie}/>
         <Stack.Screen name="RomanceMovies" component={RomanceMovies}/>        
    </Stack.Navigator>
        
    )
}
export default MoviesSectionNavigator;
