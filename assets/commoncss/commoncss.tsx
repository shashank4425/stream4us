import { Dimensions, StyleSheet } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const commonStyles = StyleSheet.create({
    container: {
        paddingHorizontal:windowWidth/30,
        paddingVertical: windowHeight/100,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cards: {
        height: 180,
        width: windowWidth/3.4,        
        borderRadius: 5,
        marginRight: 6
    },
    imgContainer: {
        height:"85%",
        width:"100%",
    },
    imgSize: {
        borderRadius: 6,
        height: "100%",
        width: "100%",
        resizeMode:"cover"
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