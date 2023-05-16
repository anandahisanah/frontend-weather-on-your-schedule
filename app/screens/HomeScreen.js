import React from 'react';
import { View, Text, Button, TouchableOpacity, ImageBackground } from 'react-native';
import tw from 'twrnc';

function HomeScreen({ navigation }) {
    return (
        <View style={tw`flex-1`}>
            {/* top */}
            <View>
                <ImageBackground
                    source={require('../assets/white-cloud.jpg')}
                    style={tw`items-center py-3`}
                    imageStyle={{ opacity: 0.5 }}
                >
                    <View style={tw`items-center py-5`}>
                        <Text style={tw`mb-2 font-medium text-base`}>12:00</Text>
                        <Text style={tw`mb-2 font-medium text-lg`}>Balikpapan</Text>
                        <Text style={tw`mb-2 font-medium text-6xl`}>30°</Text>
                        <Text style={tw`mb-2 font-medium text-base`}>75%</Text>
                        <Text style={tw`mb-2 font-medium text-base`}>High</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={tw`w-full p-5`}>
                <View style={tw`flex-row mb-3`}>
                    <View style={tw`flex-1`}>
                        <Text style={tw`font-medium`}>Today</Text>
                    </View>
                    <View style={tw`flex-1 items-end`}>
                        <Text style={tw`text-slate-500 underline`}>See More</Text>
                    </View>
                </View>
            </View>



            {/* <View style={tw`flex-1 items-center bg-white`}>
                <View style={tw`bg-gradient-to-r from-bg-sky-500 to-bg-indigo-500`}>

                    <TouchableOpacity
                        style={tw`bg-orange-500 py-2 px-4 rounded`}
                        onPress={() => navigation.navigate('CreateEvent')}
                    >
                        <Text style={tw`text-center font-medium`}>Add Event</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
        </View>
    );
}

export default HomeScreen;
