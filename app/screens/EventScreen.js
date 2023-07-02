import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Header } from 'react-native-elements';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

const EventScreen = ({ navigation, route }) => {
    const { username } = route.params;

    // get events
    const [events, setEvents] = useState([]);

    // get event
    const getEvent = () => {
        axios
            .get(`https://backend-weather-on-your-schedule-production.up.railway.app/events?userUsername=${username}&?limit=all`)
            .then(response => {
                console.log(response.data.data);
                setEvents(response.data.data);

            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        getEvent();
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
                    text: 'Event',
                    style: { color: '#000', fontWeight: 'bold', fontSize: 18 },
                }}
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.navigate('Home', { username: username })}>
                        <Image source={require('../assets/back-arrow.png')} style={tw`w-6 h-6`} />
                    </TouchableOpacity>
                }
            />
            <ScrollView>
                <View style={tw`flex-1 items-center bg-white pb-5`}>
                    <View style={tw`w-full px-5 my-5`}>
                        {events.map((event, index) => {
                            // parse date and time
                            const dateString = event.datetime.substring(0, 19);
                            const utcOffset = 8 * 60; // Offset waktu UTC+8 dalam menit (8 jam)
                            const formattedDateTime = dayjs(dateString).add(utcOffset, 'minute');
                            const formattedDate = formattedDateTime.format('DD MMM YYYY');
                            const formattedTime = formattedDateTime.format('HH:mm');
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('Detail', { username: username, eventId: event.id })} key={index}>
                                    <View style={tw`flex-row justify-center items-center my-3`}>
                                        <View style={tw`flex flex-col items-center`}>
                                            <Text style={tw`font-medium`}>{formattedDate}</Text>
                                            <Text style={tw`text-slate-500`}>{formattedTime}</Text>
                                        </View>
                                        <View style={tw`flex flex-row items-center`}>
                                            <Image source={weatherImageMapping[event.weather]} style={tw`mx-3 w-8 h-8`} />
                                            <Text style={tw`mr-3 font-medium text-center`}>{event.temperature}°</Text>
                                            <Text style={tw`mr-3 font-medium text-center`}>{event.title}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default EventScreen;
