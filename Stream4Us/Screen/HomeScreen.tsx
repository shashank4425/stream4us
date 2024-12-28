import react, { useEffect } from "react"
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, Button, Alert, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

import { entertainmentList } from "@/assets/entertainmentList/entertainmentList";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { StatusBar } from "expo-status-bar";

export default function Home({ navigation }) {
    return (
        <View style={Styles.screenContainer}>
        
            <StatusBar backgroundColor="#0D0E10" style="light" />            
            <ScrollView>
                <View>
                    {entertainmentList.map(items => {
                        return(
                        <View style={Styles.cardContainer} key={items.id}>                        
                          <View style={Styles.moviesContent}>
                                 <View style={Styles.leftContent}>
                                    <Text style={Styles.heading}>{items.category}</Text>
                                 </View>
                                 <View style={Styles.rightContent}>
                                    <Text style={Styles.viewAll}
                                        onPress={() => navigation.navigate(items.category, {title:items.category})}>view All
                                    </Text>
                                </View>
                           </View>                             
                          <ScrollView horizontal={true}>
                            {items.Movies?.map(item => {
                                return (
                                    
                                    <View style={Styles.container} key={item.id}>
                                        <TouchableOpacity onPress={() => navigation.navigate("MoviePlayer", item)}>
                                        <View style={Styles.cards}>                                        
                                            <Image source={{ uri: item.seo.ogImage }}
                                                style={Styles.imgSize} />
                                        </View> 
                                        </TouchableOpacity>                                       
                                    </View>                                    
                                )
                            })}
                          </ScrollView>
                       </View>
                      )
                    })}
                </View>
            </ScrollView>
        
     </View>
    )
}
const Styles = StyleSheet.create({
    screenContainer: {
        flex:0,
        backgroundColor:"#0D0E10",
        flexDirection: 'column',
        flexWrap: 'nowrap',
        padding:12
    },
    cardContainer: {
        marginBottom: 6
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cards: {
        height: 150,
        width: 110,
        borderRadius: 4,
        padding: 0,
        marginRight:0
    },
    imgSize: {
        height: "100%",
        width: "96%",
    },
    heading: {
        color: "#ffffff",
        fontWeight: "bold",
        alignItems: "flex-start",
        fontSize: 14
    },
    title: {
        color: "#ffffff",
        fontWeight: "bold",
        alignItems: "flex-start",
        fontSize: 4
    },
    leftContent: {
        marginBottom: 2,
        marginLeft: 3,
        textAlign: "right",
        width: windowWidth / 1.5,
        marginHorizontal: 10,
        justifyContent: "space-between"
    },
    rightContent: {
        marginHorizontal: 20
    },
    moviesContent: {
        width: windowWidth,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
        padding:8
    },
    viewAll: {
        padding: 5,
        fontSize: 14,
        color: "#ffffff"
    }
})