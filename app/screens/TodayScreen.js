import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import tw from 'twrnc';
import { Header } from 'react-native-elements';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

const TodayScreen = ({ navigation, route }) => {
    const { username } = route.params;
    const { city_name } = route.params;

    const times = Array(6).fill(null);

    // get forecasts
    const [forecasts, setForecasts] = useState([]);

    // get event
    const getForecast = () => {
        axios
            .get(`https://backend-weather-on-your-schedule-production.up.railway.app/forecast/get?user_username=${username}&limit=all`)
            .then(response => {
                console.log(response.data.data);
                setForecasts(response.data.data);

            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        getForecast();
    }, []);

    const weatherImageMapping = {
        "Cerah": require("../assets/weather-icon/0-cerah.png"),
        "Cerah Berawan": require("../assets/weather-icon/1-cerah-berawan.png"),
        "Berawan": require("../assets/weather-icon/3-berawan.png"),
        "Berawan Tebal": require("../assets/weather-icon/4-berawan-tebal.png"),
        "Kabut": require("../assets/weather-icon/45-kabut.png"),
        "Hujan Ringan": require("../assets/weather-icon/60-hujan-ringan.png"),
        "Hujan Sedang": require("../assets/weather-icon/61-hujan-sedang.png"),
        "Hujan Petir": require("../assets/weather-icon/95-hujan-petir.png"),
    };
    return (
        <View style={tw`flex-1`}>
            {/* header */}
            <Header
                backgroundColor={'#ed8936'}
                centerComponent={{
                    text: `Weather in ${city_name}`,
                    style: { color: '#000', fontWeight: 'bold', fontSize: 18 },
                }}
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.replace('Home', { username: username })}>
                        <Image source={require('../assets/back-arrow.png')} style={tw`w-6 h-6`} />
                    </TouchableOpacity>
                }
            />
            <ScrollView>
                <View style={tw`flex-1 items-center bg-white`}>
                    <View style={tw`w-full p-5`}>
                        {forecasts.map((forecast, index) => {
                            // parse date and time
                            const dateString = forecast.datetime.substring(0, 19);
                            const utcOffset = 8 * 60; // Offset waktu UTC+8 dalam menit (8 jam)
                            const formattedDateTime = dayjs(dateString).add(utcOffset, 'minute');
                            const formattedDate = formattedDateTime.format('DD MMM');
                            const formattedTime = formattedDateTime.format('HH:mm');

                            return (
                                <View style={tw`flex-row justify-center items-center mb-3`} key={index}>
                                    <View style={tw`text-center items-center`}>
                                        <Text style={tw`text-slate-500`}>{formattedDate}</Text>
                                        <Text style={tw`font-medium`}>{formattedTime}</Text>
                                    </View>
                                    <Image source={weatherImageMapping[forecast.weather]} style={tw`mx-3 w-8 h-8`} />
                                    <Text style={tw`mr-3 font-medium text-center`}>{forecast.temperature}°</Text>
                                    <Image source={require('../assets/icon-drip.png')} style={tw`mx-3 w-8 h-8`} />
                                    <Text style={tw`mr-3 font-medium text-center`}>{forecast.humidity}%</Text>
                                    <Image source={require('../assets/icon-wind-2.png')} style={tw`mx-3 w-8 h-8`} />
                                    <Text style={tw`mr-3 font-medium text-center`}>{(parseFloat(forecast.wind_speed).toFixed(2))} MPH</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default TodayScreen;
