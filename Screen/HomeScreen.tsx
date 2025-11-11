import react, { useEffect,useState} from "react"
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, BackHandler, TouchableOpacity, AppState  } from "react-native"
import { entertainmentList } from "@/assets/entertainmentList/entertainmentList";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { StatusBar } from "expo-status-bar";
import TrendingMovies from "@/components/banner/TrendingMovies";

export default function Home({ navigation }) {
    
    return (
        <View style={Styles.screenContainer}>
        <StatusBar backgroundColor="#0D0E10" style="light" /> 
                 
             <ScrollView>
             <TrendingMovies/> 
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
    preLoadingContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
    },
    preLoadingImg: {
        resizeMode:"contain"
    },
    screenContainer: {
        flex:1,
        backgroundColor:"#0D0E10",
        flexDirection: 'column',
        flexWrap: 'nowrap',
        padding:0
    },
    cardContainer: {
        padding: 8
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cards: {
        backgroundColor:"#696969", 
        height: 160,
        width: 115,
        borderRadius: 12,
        paddingTop:0,
        paddingLeft:0,
        paddingRight:0,
        marginRight:5
    },
    imgSize: {
        borderRadius: 12,
        height: "100%",
        width: "100%",
    },
    heading: {
        color: "#ffffff",
        fontWeight: "bold",
        alignItems: "flex-start",
        fontSize: 16
    },
    title: {
        color: "#ffffff",
        fontWeight: "bold",
        alignItems: "flex-start",
        fontSize: 4
    },
    leftContent: {
        marginLeft: 0,
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
        padding:10
    },
    viewAll: {
        padding: 0,
        fontSize: 16,
        color: "#ffffff"
    }
})