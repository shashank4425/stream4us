import react, { useEffect } from "react"
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from '@react-navigation/stack';
import { bollywoodmoviesList } from "@/assets/movies/bollywoodmovies/bollywoodmovies";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

export default function RomanticMovie({ navigation, route }) {
    const movieObject = route.params;
    return (
        <SafeAreaView >
            <View>
                    <View style={Styles.container}>
                        <View key={movieObject.id} style={Styles.cards}>
                            <Image source={{uri: movieObject.seo.ogImage}}
                             style={Styles.imgSize} />
                             <View style={Styles.contentDesc}>                             
                             <Text style={Styles.movieName}>{movieObject.fullTitle}</Text>
                             <Text>movie Language : {movieObject.languages}</Text>
                             <Text>Movie Time : {movieObject.durationFormatted}</Text>
                             <Text>Movie Relese In : {movieObject.releaseYear}</Text> 
                             </View>                           
                    </View>
               </View>
            </View >
        </SafeAreaView >
    )
}
const Styles = StyleSheet.create({
    container: {
        height: windowHeight,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cards: {
        height: '80%',
        width: windowWidth,
        backgroundColor: "#0D0E10",
        borderRadius: 4,
        padding: 20,
        margin: 3
    },
    imgSize: {
        height: '80%',
        width: '100%',
    },
    title: {
        color: "#808080",
        fontWeight: "bold",
        alignItems: "flex-start",
        fontSize: 16
    },
    contentDesc: {
    padding:20,
     textAlign:'center',
     alignContent:'center',
     alignItems:'center'
    },
    movieName : {
        textAlign:'center',
        fontStyle:'normal',
        fontWeight:'500',
        fontSize:28
    }
})