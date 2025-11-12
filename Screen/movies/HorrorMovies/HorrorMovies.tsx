import { bollywoodhorrormoviesList } from "@/assets/movies/bollywoodmovies/horrormovies/bollywoodhorrormoviesmovies";
import { createStackNavigator } from '@react-navigation/stack';
import { useLayoutEffect } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

export default function HorrorMovies({navigation,route}) {
    useLayoutEffect(()=>{
        navigation.setOptions({
           headerTitle: route.params.title
        }) 
   },[navigation]);
    return (
                <ScrollView>
                    <View style={Styles.container}>
                        
                        {bollywoodhorrormoviesList.map(item => {
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
        padding:windowWidth/75,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cards: {
        paddingHorizontal:windowWidth/50,
        paddingVertical: windowHeight/80,
        height: 210,
        width: windowWidth/3.1,        
        borderRadius: 12
    },
    imgContainer: {
        height:"85%",
        width:"100%",
    },
    imgSize: {
        borderRadius: 12,
        backgroundColor:"#696969",
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