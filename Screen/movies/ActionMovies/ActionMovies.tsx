import { commonStyles } from "@/assets/commoncss/commoncss";
import { bollywoodactionmoviesList } from "@/assets/movies/bollywoodmovies/actionmovies/bollywoodactionmovies";
import { createStackNavigator } from '@react-navigation/stack';
import { useLayoutEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const Stack = createStackNavigator();

export default function ActionMovies({navigation,route}) {
    useLayoutEffect(()=>{
        navigation.setOptions({
           headerTitle: route.params.title
        }) 
   },[navigation]);
    return (         
                <ScrollView>
                    <View style={commonStyles.container}>
                        
                        {bollywoodactionmoviesList.map(item => {
                          return (
                          <View key={item.id} style={commonStyles.cards}>
                            <TouchableOpacity onPress={() => navigation.navigate("MoviePlayer",item)}>
                             <View style={commonStyles.imgContainer}>
                                <Image source={{uri: item.seo.ogImage}} style={commonStyles.imgSize}/>
                             </View>
                             <View style={commonStyles.titleContainer}>
                               <Text numberOfLines={1} style={commonStyles.title}>{item.seo.page}</Text>
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
    
})