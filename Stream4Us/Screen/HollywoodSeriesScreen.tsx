import react, { useEffect } from "react"
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from '@react-navigation/stack';
import { bollywoodmoviesList } from "@/assets/movies/bollywoodmovies/bollywoodmovies";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

export default function HollywoodSeriesScreen({ navigation, route }) {
    const seriesObject = route.params;
    return (
        <SafeAreaView >
            <View>
                <ScrollView horizontal={false}>
                    <View style={Styles.container}>
                        <View key={seriesObject.id} style={Styles.cards}>
                            <Image source={seriesObject.moviesImg}
                             style={Styles.imgSize} />                             
                            <Image source={seriesObject.seo.ogImage}
                             style={Styles.imgSize} />                             
                             <Text>Name : {seriesObject.fullTitle}</Text>
                             <Text>Series Language : {seriesObject.languages}</Text>
                             <Text>Series Time : {seriesObject.durationFormatted}</Text>
                             <Text>Series Relese In : {seriesObject.releaseYear}</Text>                            
                    </View>
            </View>
        </ScrollView>
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
        height: 160,
        width: 122,
        backgroundColor: "#0D0E10",
        borderRadius: 4,
        padding: 0,
        margin: 3
    },
    imgSize: {
        height: 160,
        width: 122,
    },
    title: {
        color: "#808080",
        fontWeight: "bold",
        alignItems: "flex-start",
        fontSize: 16
    },

})