import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import tw from 'twrnc';
import { Header } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

const TodayScreen = ({ navigation }) => {
    const times = Array(6).fill(null);

    return (
        <SafeAreaView style={tw`flex-1`}>
            {/* header */}
            <Header
             containerStyle={{ paddingTop: 0 }}
                backgroundColor={'#FFF'}
                centerComponent={{
                    text: 'Weather in Balikpapan',
                    style: [tw`mt-0`, { color: '#000', fontWeight: 'bold', fontSize: 18 }],
                }}
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.replace('Home')}>
                        <Text style={tw`text-blue-500 font-medium`}>Back</Text>
                    </TouchableOpacity>
                }
            />
            <ScrollView>
                {/* day */}
                <View style={tw`flex-1 items-center bg-white`}>
                    <View style={tw`w-full px-5`}>
                        <Text style={tw`font-medium text-base my-5 text-center`}>Monday, 24 Apr 2023</Text>
                        {/* time */}
                        {times.map((_, index) => (
                            <View style={tw`flex-row justify-center items-center mb-3`} key={index}>
                                <Text style={tw`font-medium`}>10:00</Text>
                                <Image source={require('../assets/icon-sun.png')} style={tw`mx-3 w-8 h-8`} />
                                <Text style={tw`mr-3 font-medium text-center`}>30°</Text>
                                <Image source={require('../assets/icon-drip.png')} style={tw`mx-3 w-8 h-8`} />
                                <Text style={tw`mr-3 font-medium text-center`}>70%</Text>
                                <Image source={require('../assets/icon-uv.png')} style={tw`mx-3 w-8 h-8`} />
                                <Text style={tw`mr-3 font-medium text-center`}>High</Text>
                            </View>
                        ))}
                        <Text style={tw`font-medium text-base m-5 text-center`}>Tuesday, 25 Apr 2023</Text>
                        {/* time */}
                        {times.map((_, index) => (
                            <View style={tw`flex-row justify-center items-center mb-3`} key={index}>
                                <Text style={tw`font-medium`}>10:00</Text>
                                <Image source={require('../assets/icon-sun.png')} style={tw`mx-3 w-8 h-8`} />
                                <Text style={tw`mr-3 font-medium text-center`}>30°</Text>
                                <Image source={require('../assets/icon-drip.png')} style={tw`mx-3 w-8 h-8`} />
                                <Text style={tw`mr-3 font-medium text-center`}>70%</Text>
                                <Image source={require('../assets/icon-uv.png')} style={tw`mx-3 w-8 h-8`} />
                                <Text style={tw`mr-3 font-medium text-center`}>High</Text>
                            </View>
                        ))}
                        <Text style={tw`font-medium text-base m-5 text-center`}>Wednesday, 26 Apr 2023</Text>
                        {/* time */}
                        {times.map((_, index) => (
                            <View style={tw`flex-row justify-center items-center mb-3`} key={index}>
                                <Text style={tw`font-medium`}>10:00</Text>
                                <Image source={require('../assets/icon-sun.png')} style={tw`mx-3 w-8 h-8`} />
                                <Text style={tw`mr-3 font-medium text-center`}>30°</Text>
                                <Image source={require('../assets/icon-drip.png')} style={tw`mx-3 w-8 h-8`} />
                                <Text style={tw`mr-3 font-medium text-center`}>70%</Text>
                                <Image source={require('../assets/icon-uv.png')} style={tw`mx-3 w-8 h-8`} />
                                <Text style={tw`mr-3 font-medium text-center`}>High</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TodayScreen;
