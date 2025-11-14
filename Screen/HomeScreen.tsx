import { entertainmentList } from "@/assets/entertainmentList/entertainmentList";
import TrendingMovies from "@/components/banner/TrendingMovies";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home({ navigation }) {
    
    return (
        <View style={Styles.screenContainer}>
        <StatusBar backgroundColor="#0D0E10" style="light" /> 
                 
             <ScrollView showsVerticalScrollIndicator={false}>
             <TrendingMovies/> 
               <View>                
                {entertainmentList.map(items => {
                    return(
                    <View style={Styles.cardContainer} key={items.id}>                        
                      <View style={Styles.moviesContent}>
                             <View style={Styles.leftContent}>
                                <Text style={Styles.heading}>{items.category}</Text>
                             </View>
                             <View>
                                <FontAwesome name="angle-right" size={24} color="#fff"
                                    onPress={() => navigation.navigate(items.category, {title:items.category})}>
                                </FontAwesome>
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
        flexWrap: 'nowrap'
    },
    cardContainer: {
        paddingHorizontal:windowWidth/25,
        paddingVertical: windowHeight/100
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cards: {
        backgroundColor:"#696969", 
        height: 140,
        width: windowWidth/3.5,
        borderRadius: 6,
        padding:0,
        marginRight:5
    },
    imgSize: {
        borderRadius: 6,
        height: "100%",
        width: "100%",
        resizeMode:"cover"
    },
    heading: {
        color: "#ffffff",
        fontWeight: "bold",
        justifyContent: "flex-start",
        textAlign: "left",
        fontSize: 16
    },
    title: {
        color: "#ffffff",
        fontWeight: "bold",
        alignItems: "flex-start",
        fontSize: 4
    },
    leftContent: {
        width: windowWidth / 1.2
    },
    moviesContent: {
        width: windowWidth,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        display: "flex",
        padding: windowWidth / 50

    }
})