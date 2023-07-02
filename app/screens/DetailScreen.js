import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Header } from 'react-native-elements';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import utc from 'dayjs/plugin/utc';
import axios from 'axios';

dayjs.extend(utc);

const DetailScreen = ({ navigation, route }) => {
    const { username } = route.params;
    const { eventId } = route.params;

    const [event, setEvent] = useState({});

    // find event
    const getEvent = () => {
        axios
            .get(`https://backend-weather-on-your-schedule-production.up.railway.app/event/${eventId}`)
            .then(response => {
                console.log(response.data.data);

                const dateString = response.data.data.datetime ? response.data.data.datetime.substring(0, 19) : null;
                setEvent(response.data.data);
                setDateString(dateString);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        getEvent();
    }, []);

    // parse datetime
    const [dateString, setDateString] = useState(null);
    const utcOffset = 8 * 60; // UTC+8
    const formattedDateTime = dayjs(dateString).add(utcOffset, 'minute');
    const formattedDate = formattedDateTime.format('ddd, DD MMM YYYY HH:mm');

    // delete event
    const deleteEvent = () => {
        axios
            .delete(`https://backend-weather-on-your-schedule-production.up.railway.app/event/${eventId}`)
            .then(response => {
                console.log(response.data.data);
                navigation.replace('Home', { username: username })
            })
            .catch(error => {
                console.error(error);

                if (error.response) {
                    // Respons diterima tetapi status tidak berhasil
                    console.log(error.response.data.message);
                    // Memunculkan pesan error yang diterima dari server
                } else if (error.request) {
                    // Respons tidak diterima
                    console.log("Failed to receive response from the server.");
                    // Memunculkan pesan kesalahan ketika tidak ada respons dari server
                } else {
                    // Kesalahan lainnya
                    console.log("An error occurred during the request.");
                    // Memunculkan pesan kesalahan ketika terjadi kesalahan lainnya
                }
            });
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
        <View style={tw`flex-1`}>
            {/* header */}
            <Header
                backgroundColor={'#ed8936'}
                centerComponent={{
                    text: 'Detail Event',
                    style: { color: '#000', fontWeight: 'bold', fontSize: 18 },
                }}
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.replace('Home', { username: username })}>
                        <Image source={require('../assets/back-arrow.png')} style={tw`w-6 h-6`} />
                    </TouchableOpacity>
                }
            />
            <ScrollView style={tw`bg-white`}>
                <View style={tw`flex-1 pb-5 px-5`}>
                    {/* title */}
                    <Text style={tw`text-xl font-medium my-5`}>{event.title}</Text>
                    <Text style={tw`text-base text-slate-500 mb-5`}>{formattedDate}</Text>
                    {/* information */}
                    <View style={tw`bg-slate-300 p-5 rounded mb-5`}>
                        <View style={tw`flex-row mb-3`}>
                            <View style={tw`mr-5 flex-1`}>
                                <Text style={tw`font-medium mb-2`}>Weather</Text>
                                <View style={tw`flex-row items-center`}>
                                    <Image style={tw`w-8 h-8 mr-1`} source={weatherImageMapping[event.forecast_weather]} />
                                    <Text>{event.forecast_weather}</Text>
                                </View>
                            </View>
                            <View style={tw`mr-5 flex-1`}>
                                <Text style={tw`font-medium mb-2`}>Humidity</Text>
                                <View style={tw`flex-row items-center`}>
                                    <Image style={tw`w-8 h-8 mr-1`} source={require('../assets/icon-drip.png')} />
                                    <Text>{event.forecast_humidity}%</Text>
                                </View>
                            </View>
                        </View>
                        <View style={tw`flex-row mb-3`}>
                            <View style={tw`mr-5 flex-1`}>
                                <Text style={tw`font-medium mb-2`}>Temperature</Text>
                                <View style={tw`flex-row items-center`}>
                                    <Image style={tw`w-8 h-8 mr-1`} source={require('../assets/icon-temperature.png')} />
                                    <Text>{event.forecast_temperature}°C</Text>
                                </View>
                            </View>
                            <View style={tw`mr-5 flex-1`}>
                                <Text style={tw`font-medium mb-2`}>Wind Speed</Text>
                                <View style={tw`flex-row items-center`}>
                                    <Image style={tw`w-8 h-8 mr-1`} source={require('../assets/icon-wind.png')} />
                                    <Text>{parseFloat(event.forecast_wind_speed).toFixed(2)} MPH</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* description */}
                    <Text style={tw`mb-5`}>
                        {event.description}
                    </Text>
                    {/* update event */}
                    <View style={tw`flex-1 items-center mb-5`}>
                        <TouchableOpacity
                            style={tw`w-full bg-gray-200 py-2 rounded`}
                            onPress={() => navigation.replace('UpdateEvent', { username: username, eventId: event.id, formattedDate: formattedDate })}
                        >
                            <Text style={tw`text-center font-medium`}>Update Event</Text>
                        </TouchableOpacity>
                    </View>
                    {/* delete event */}
                    <View style={tw`flex-1 items-center mb-5`}>
                        <TouchableOpacity
                            style={tw`w-full bg-red-500 py-2 rounded`}
                            onPress={deleteEvent}
                        >
                            <Text style={tw`text-center text-white font-medium`}>Delete Event</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default DetailScreen;
