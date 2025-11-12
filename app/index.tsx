
import AppNavigatorScreen from "@/Screen/AppNavigatorScreen";
import { registerRootComponent } from "expo";
import { Dimensions, StyleSheet } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Main(){
    return ( 
        <AppNavigatorScreen />
    
    
 );
}
registerRootComponent(Main);

const Styles = StyleSheet.create({

})