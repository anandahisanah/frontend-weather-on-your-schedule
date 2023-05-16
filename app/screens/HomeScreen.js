import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

function HomeScreen({ navigation }) {
    const todayWeathers = Array(6).fill(null);
    const yourEvents = Array(10).fill(null);

    return (
        <ScrollView>
            <SafeAreaView style={tw`flex-1`}>
                {/* top */}
                <View>
                    <ImageBackground
                        source={require('../assets/white-cloud.jpg')}
                        style={tw`items-center py-5`}
                        imageStyle={{ opacity: 0.5 }}
                    >
                        <View style={tw`items-center`}>
                            <Text style={tw`mb-2 font-medium text-base`}>12:00</Text>
                            <Text style={tw`mb-2 font-medium text-lg`}>Balikpapan</Text>
                            <Text style={tw`mb-2 font-medium text-6xl`}>30°</Text>
                            <View style={tw`flex-row items-center`}>
                                <Image source={require('../assets/icon-sun.png')} style={tw`w-8 h-8 mx-2`} />
                                <Text style={tw`mb-2 font-medium text-base`}>75%</Text>
                            </View>
                            <View style={tw`flex-row items-center`}>
                                <Image source={require('../assets/icon-uv.png')} style={tw`w-8 h-8 mx-2`} />
                                <Text style={tw`mb-2 font-medium text-base`}>High</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                {/* today weather */}
                <View style={tw`w-full px-5 mt-3`}>
                    <View style={tw`flex-row mb-3`}>
                        <View style={tw`flex-1`}>
                            <Text style={tw`font-semibold`}>Today</Text>
                        </View>
                        <View style={tw`flex-1 items-end`}>
                            <Text style={tw`text-slate-500 underline`}>See More</Text>
                        </View>
                    </View>
                    <View style={tw`flex-row mb-3`}>
                        {todayWeathers.map((_, index) => (
                            <View style={tw`flex-1 items-center mx-2`} key={index}>
                                <Text style={tw`font-medium text-slate-500`}>14:10</Text>
                                <Image source={require('../assets/icon-sun.png')} style={tw`w-12 h-12`} />
                                <Text style={tw`font-medium text-base text-xl`}>30°</Text>
                                <View style={tw`flex-row items-center`}>
                                    <Image source={require('../assets/icon-drip.png')} style={tw`w-4 h-4 mx-2`} />
                                    <Text style={tw`mb-2 font-medium`}>75%</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* your event */}
                <View style={tw`w-full px-5 mt-3`}>
                    <View style={tw`flex-row mb-3`}>
                        <View style={tw`flex-1`}>
                            <Text style={tw`font-semibold`}>Your Event</Text>
                        </View>
                        <View style={tw`flex-1 items-end`}>
                            <Text style={tw`text-slate-500 underline`}>See More</Text>
                        </View>
                    </View>
                    {yourEvents.map((_, index) => (
                        <View style={tw`flex-row items-center px-5 mb-2`} key={index}>
                            <View style={tw`mr-3 text-center items-center`}>
                                <Text style={tw`font-medium`}>24 Apr</Text>
                                <Text style={tw`text-slate-500`}>10:00</Text>
                            </View>
                            <Image source={require('../assets/icon-sun.png')} style={tw`mr-3 w-12 h-12`} />
                            <Text style={tw`mr-3 font-medium text-lg text-center`}>30°</Text>
                            <Text style={tw`mr-3 font-medium text-center`}>Meeting With Client</Text>
                        </View>
                    ))}
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
            </SafeAreaView>
        </ScrollView>
    );
}

export default HomeScreen;
