import react, { useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, FlatList, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from '@react-navigation/stack';
import { globalhitsmoviesList } from "@/assets/movies/globalhitsmovies/globalhitsmovies";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

export default function GlobalHitsMovies({navigation,route}) {
    useLayoutEffect(()=>{
        navigation.setOptions({
           headerTitle: route.params.title
        }) 
   },[navigation]);
    return (
                <ScrollView>
                    <View style={Styles.container}>
                        
                        {globalhitsmoviesList.map(item => {
                          return (
                          <View key={item.id} style={Styles.cards}>
                            <TouchableOpacity onPress={() => navigation.navigate("MoviePlayer",item)}>
                              <View style={Styles.imgContainer}>
                                <Image source={{uri: item.seo.ogImage}} style={Styles.imgSize}/>
                              </View>
                              <View style={Styles.titleContainer}>
                                <Text numberOfLines={1} style={Styles.title}>{item.seo.page}</Text>
                              </View>
                               </TouchableOpacity>
                             </View>                             
                          )
                        })}                       
                    </View>
                </ScrollView>
    )
}
const Styles = StyleSheet.create({
    container: {
        padding:12,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cards: {
        height: 210,
        width: 120,
        backgroundColor: "#000",
        borderRadius: 4,
        padding: 2,
        margin: 1   
    },
    imgContainer: {
        height:"85%",
        width:"100%",
    },
    imgSize: {
        height:"100%",
        width:"100%",
    },
    titleContainer: {
        height:"15%",
        width:"100%",
    },
    title: {
        height:"100%",
        width:"100%",
        color: "#fffaf0",
        fontWeight: "bold",
        alignItems: "flex-start",
        fontSize: 14,
        paddingTop:7,
        textAlign: "left",
        justifyContent: "flex-start"
    }    
})