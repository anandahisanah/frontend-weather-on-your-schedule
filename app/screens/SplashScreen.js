import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import tw from 'twrnc';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={tw`flex-1 justify-center items-end bg-orange-200 px-5`}>
            <Text style={tw`font-medium text-3xl`}>See Weather</Text>
            <Text style={tw`font-medium text-3xl`}>on Your Schedule</Text>
            <Text style={tw`text-sm`}>By Ananda Nur Hisanah</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
    },
});

export default SplashScreen;
