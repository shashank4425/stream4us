import react, { useEffect } from "react"
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import  { hollywoodseriesList } from "@/assets/series/hollywoodseries/hollywoodseries";
import { TouchableOpacity } from "react-native-gesture-handler";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HollywoodSeries({navigation}) {
    
    return (
        <SafeAreaView>
            <View>
                
                <ScrollView>
                    <View style={Styles.container}>
                     {hollywoodseriesList.map(item => {
                            return (
                                <View key={item.id} style={Styles.cards}>
                                <TouchableOpacity onPress={()=> navigation.navigate("Hollywood Series",item)}>    
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
    }
    
})