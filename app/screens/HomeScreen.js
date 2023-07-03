import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function HomeScreen({ navigation, route }) {
    const { username } = route.params;

    const todayWeathers = Array(6).fill(null);

    // parse datetime
    const [dateString, setDateString] = useState(null);
    const utcOffset = 8 * 60; // UTC+8
    const formattedDateTime = dayjs(dateString).add(utcOffset, 'minute');
    const formattedTime = formattedDateTime.format('HH:mm');

    const [forecastNow, setForecastNow] = useState({});

    // find forecast now
    const findForecastNow = () => {
        axios
            .get(`https://backend-weather-on-your-schedule-production.up.railway.app/forecast/now-by-city?user_username=${username}`)
            .then(response => {
                // console.log(response.data.data)
                setForecastNow(response.data.data);

                // console.log(response.data.data.datetime)
                const dateString = response.data.data.datetime ? response.data.data.datetime.substring(0, 19) : null;
                setDateString(dateString);
                // console.log(dateString)
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        findForecastNow();
    }, []);

    // get forecasts
    const [forecasts, setForecasts] = useState([]);

    // get event
    const getForecast = () => {
        axios
            .get(`https://backend-weather-on-your-schedule-production.up.railway.app/forecast/get?user_username=${username}`)
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

    // get events
    const [events, setEvents] = useState([]);

    // get event
    const getEvent = () => {
        axios
            .get(`https://backend-weather-on-your-schedule-production.up.railway.app/events?userUsername=${username}`)
            .then(response => {
                setEvents(response.data.data);

            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        getEvent();
    }, []);

    const weatherBackgroundMapping = {
        "Cerah": require("../assets/weather-background/0-cerah.jpg"),
        "Cerah Berawan": require("../assets/weather-background/1-cerah-berawan.jpg"),
        "Berawan": require("../assets/weather-background/3-berawan.jpg"),
        "Berawan Tebal": require("../assets/weather-background/4-berawan-tebal.jpg"),
        "Kabut": require("../assets/weather-background/45-kabut.jpg"),
        "Hujan Ringan": require("../assets/weather-background/60-hujan-ringan.jpg"),
        "Hujan Sedang": require("../assets/weather-background/61-hujan-sedang.jpg"),
        "Hujan Petir": require("../assets/weather-background/95-hujan-petir.jpg"),
    };

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
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <ScrollView>
                {/* top */}
                <View style={tw`mb-3`}>
                    <ImageBackground
                        source={weatherBackgroundMapping[forecastNow.weather]}
                        style={tw`items-center py-5`}
                        imageStyle={{ opacity: 0.5 }}
                    >
                        <View style={tw`items-center`}>
                            <Text style={tw`mb-2 font-medium text-base`}>Today {formattedTime}</Text>
                            <Text style={tw`mb-2 font-medium text-lg`}>{forecastNow.city_name}</Text>
                            <Text style={tw`mb-2 font-medium text-6xl`}>{forecastNow.temperature}°</Text>
                            <View style={tw`flex-row items-center`}>
                                <Image source={weatherImageMapping[forecastNow.weather]} style={tw`w-8 h-8 mx-2`} />
                                <Text style={tw`font-medium text-base`}>{forecastNow.weather}</Text>
                            </View>
                            <View style={tw`flex-row items-center`}>
                                <Image source={require('../assets/icon-drip.png')} style={tw`w-8 h-8 mx-2`} />
                                <Text style={tw`font-medium text-base`}>{forecastNow.humidity}%</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                {/* weather */}
                <View style={tw`w-full px-5 mb-3`}>
                    <View style={tw`flex-row mb-3`}>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-lg font-semibold`}>Weather</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.replace('Today', { username: username })}
                        >
                            <Text style={tw`text-slate-500 underline`}>See More</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tw`flex-row`}>
                        {forecasts.map((forecast, index) => {
                            // parse date and time
                            const dateString = forecast.datetime.substring(0, 19);
                            const utcOffset = 8 * 60; // Offset waktu UTC+8 dalam menit (8 jam)
                            const formattedDateTime = dayjs(dateString).add(utcOffset, 'minute');
                            const formattedDate = formattedDateTime.format('DD MMM');
                            const formattedTime = formattedDateTime.format('HH:mm');

                            return (
                                <View style={tw`flex-1 items-center mx-2`} key={index}>
                                    <Text style={tw`font-medium text-slate-500`}>{formattedDate}</Text>
                                    <Text style={tw`font-medium text-slate-500`}>{formattedTime}</Text>
                                    <Image source={weatherImageMapping[forecast.weather]} style={tw`w-12 h-12`} />
                                    <Text style={tw`font-medium text-base text-xl`}>{forecast.temperature}°</Text>
                                    <View style={tw`flex-row items-center`}>
                                        <Image source={require('../assets/icon-drip.png')} style={tw`w-4 h-4 mx-1`} />
                                        <Text style={tw`font-medium`}>{forecast.humidity}%</Text>
                                    </View>
                                </View>
                            );
                        })}

                    </View>
                </View>

                {/* your event */}
                <View style={tw`w-full my-3 px-5`}>
                    <View style={tw`flex-row mb-3`}>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-lg font-semibold`}>{username}'s Events</Text>
                        </View>
                        {events.length > 0 && (<View style={tw`flex-1 justify-center items-end`}>
                            <TouchableOpacity
                                onPress={() => navigation.replace('Event', { username: username })}
                            >
                                <Text style={tw`text-slate-500 underline`}>See More</Text>
                            </TouchableOpacity>
                        </View>)}
                    </View>
                    {events.length > 0 ? (
                        events.map((event, index) => {
                            // parse date and time
                            const dateString = event.datetime.substring(0, 19);
                            const utcOffset = 8 * 60; // Offset waktu UTC+8 dalam menit (8 jam)
                            const formattedDateTime = dayjs(dateString).add(utcOffset, 'minute');
                            const formattedDate = formattedDateTime.format('DD MMM');
                            const formattedTime = formattedDateTime.format('HH:mm');

                            return (
                                <TouchableOpacity
                                    style={tw`flex-row items-center px-5 mb-2`}
                                    key={index}
                                    onPress={() => navigation.replace('Detail', { username: username, eventId: event.id })}
                                >
                                    <View style={tw`text-center items-center`}>
                                        <Text style={tw`font-medium`}>{formattedDate}</Text>
                                        <Text style={tw`text-slate-500`}>{formattedTime}</Text>
                                    </View>
                                    <Image source={weatherImageMapping[event.weather]} style={tw`mx-3 w-12 h-12`} />
                                    <Text style={tw`mr-3 font-medium text-lg text-center`}>{event.temperature}°</Text>
                                    <Text style={tw`mr-3 font-medium text-center`}>{event.title}</Text>
                                </TouchableOpacity>
                            );
                        })
                    ) : (
                        <Text style={tw`text-slate-500`}>You don't have any events</Text>
                    )}
                </View>

                {/* create event */}
                <View style={tw`flex-1 items-center mx-5`}>
                    <TouchableOpacity
                        style={tw`w-full bg-orange-500 py-2 rounded`}
                        onPress={() => navigation.replace('CreateEvent', { username: username })}
                    >
                        <Text style={tw`text-center font-medium`}>Create Event</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;
