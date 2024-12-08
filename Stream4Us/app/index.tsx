
import AppNavigator from '@/navigator/AppNavigator';
import NavigationNavBar from "react-native-navigation-bar-color"
import * as NavigationBar from 'expo-navigation-bar';
import { Image, StyleSheet, Platform, SafeAreaView, ScrollView, View, Text } from 'react-native';

export default function HomeScreen() {
  NavigationBar.setBackgroundColorAsync("#0D0E10")
  return (
    
       <AppNavigator>
        
       </AppNavigator>
  );
}

const Styles = StyleSheet.create({
  body: {
    backgroundColor:"#0D0E10",
   }
});
