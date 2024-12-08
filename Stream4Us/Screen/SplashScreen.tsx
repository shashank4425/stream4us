
import AppNavigator from '@/navigator/AppNavigator';
import { useDebugValue, useEffect } from 'react';
import { Image, StyleSheet, Platform, SafeAreaView, ScrollView, View, Text } from 'react-native';

export default function Splash({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Home")
        }, 400)
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <Text> This is spalsh screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});
