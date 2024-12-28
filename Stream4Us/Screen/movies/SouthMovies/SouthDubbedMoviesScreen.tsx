import react, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from '@react-navigation/stack';
import { southdubbedmoviesList } from "@/assets/movies/southmovies/southmoviesinhindi";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();
export default function SouthDubbedMovies({navigation,route}) {
     useLayoutEffect(()=>{
         navigation.setOptions({
            headerTitle: route.params.title
         }) 
    },[navigation]);
    return (
        <SafeAreaView >
            <View>
                
                <ScrollView>
                    <View style={Styles.container}>
                        
                        {southdubbedmoviesList.map(item => {
                          return (
                          <View key={item.id} style={Styles.cards}>
                            <TouchableOpacity onPress={() => navigation.navigate("ActionMovie",item)}>
                              <Image source={{uri: item.seo.ogImage}}
                               style={Styles.imgSize}/>
                               <Text numberOfLines={1} style={Styles.title}>{item.seo.page}</Text>
                               </TouchableOpacity>
                             </View>                             
                          )
                        })}                       
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cards: {
        height: 190,
        width: 122,
        backgroundColor: "#000",
        borderRadius: 4,
        padding: 4,
        margin: 3   
    },
    imgSize: {
        height:160,
        width:122,
    },
    title: {
        color: "#fffaf0",
        fontWeight: "bold",
        alignItems: "flex-start",
        fontSize: 14,
        paddingTop:6,
        textAlign: "left",
        justifyContent: "flex-start"
    }    
})