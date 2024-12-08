import react, { useEffect } from "react"
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from '@react-navigation/stack';

import { TouchableOpacity } from "react-native-gesture-handler";
import { bollywoodseriesList } from "@/assets/series/bollywoodseries/bollywoodseries";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

export default function BollywoodSeriesList({navigation,route}) {
    
    return (
        <SafeAreaView style={Styles.screenContainer}>
            <View>
                
                <ScrollView>
                    <View style={Styles.container}>
                        {bollywoodseriesList.map(item => {
                            return (
                                <View key={item.id} style={Styles.cards}>                                    
                                <TouchableOpacity onPress={() => navigation.navigate("MoviePlayer", item)}>    
                                <Image source={{uri:item.seo.ogImage}} 
                                style={Styles.imgSize}/>
                                </TouchableOpacity>
                            </View >
                            )
                        })}
                   
                        </View>
                  </ScrollView>
            </View>
        </SafeAreaView>
    )
}
const Styles = StyleSheet.create({
    screenContainer: {
        flex:1,
       backgroundColor:"#0D0E10",
        flexDirection: 'column',
        flexWrap: 'nowrap',
         padding:0
    },
    container: {
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
        height:160,
        width:122,
    },
    title: {
        color: "#808080",
        fontWeight: "bold",
        alignItems: "flex-start",
        fontSize: 16
    },    
})