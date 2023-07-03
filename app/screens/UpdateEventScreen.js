import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, Platform, Modal } from 'react-native';
import tw from 'twrnc';
import { Header } from 'react-native-elements';
import axios from 'axios';

const UpdateEventScreen = ({ navigation, route }) => {
    const { username } = route.params;
    const { eventId } = route.params;
    const { formattedDate } = route.params;

    const [title, setTitle] = useState({
        value: null,
        alias: "Title",
    });

    const [weather, setWeather] = useState({
        value: null,
        alias: "Weather",
    });

    const [humidity, setHumidity] = useState({
        value: null,
        alias: "Humidity",
    });

    const [windSpeed, setWindSpeed] = useState({
        value: null,
        alias: "Wind Speed",
    });

    const [temperature, setTemperature] = useState({
        value: null,
        alias: "Temperature",
    });

    const [description, setDescription] = useState({
        value: null,
        alias: "Description",
    });

    const [event, setEvent] = useState({});

    // find event
    const getEvent = () => {
        axios
            .get(`https://backend-weather-on-your-schedule-production.up.railway.app/event/${eventId}`)
            .then(response => {
                const data = response.data.data;
                setEvent(data);

                setTitle(prevState => ({
                    ...prevState,
                    value: data.title
                }));

                setWeather(prevState => ({
                    ...prevState,
                    value: data.forecast_weather
                }));

                setHumidity(prevState => ({
                    ...prevState,
                    value: data.forecast_humidity
                }));

                setTemperature(prevState => ({
                    ...prevState,
                    value: data.forecast_temperature
                }));

                setWindSpeed(prevState => ({
                    ...prevState,
                    value: parseFloat(data.forecast_wind_speed).toFixed(2)
                }));

                setDescription(prevState => ({
                    ...prevState,
                    value: data.description
                }));
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

    const handleSave = () => {
        const data = {
            title: title.value,
            description: description.value,
        };
        axios.post(`https://backend-weather-on-your-schedule-production.up.railway.app/event/${event.id}`, data)
            .then(response => {
                navigation.replace('Event', { username: username });
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

    return (
        <View style={tw`flex-1`}>
            {/* header */}
            <Header
                backgroundColor={'#ed8936'}
                centerComponent={{
                    text: 'Update Event',
                    style: { color: '#000', fontWeight: 'bold', fontSize: 18 },
                }}
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.replace('Detail', { username: username, eventId: event.id })}>
                        <Image source={require('../assets/back-arrow.png')} style={tw`w-6 h-6`} />
                    </TouchableOpacity>
                }
            />
            <View style={tw`flex-1 items-center bg-white`}>
                <View style={tw`w-full p-5`}>
                    <Text style={tw`text-xl font-medium mb-5`}>{formattedDate}</Text>
                    {/* title */}
                    <View style={tw`mb-3`}>
                        <Text style={tw`text-gray-700 font-medium mb-2`}>{title.alias}</Text>
                        <View>
                            <TextInput
                                style={tw`rounded-md border border-gray-400 p-2 w-full`}
                                onChangeText={(text) => setTitle({ value: text, alias: title.alias })}
                                value={title.value}
                                placeholder={title.alias}
                            />
                        </View>
                    </View>
                    {/* weather & humidity */}
                    <View style={tw`flex-row justify-between mb-3`}>
                        {/* weather */}
                        <View style={tw`flex-1 pr-2`}>
                            <Text style={tw`text-gray-700 font-medium mb-2`}>{weather.alias}</Text>
                            <View style={tw`flex-row items-center`}>
                                <Image source={weatherImageMapping[weather.value]} style={tw`w-12 h-12`} />
                                <Text style={tw`ml-2`}>{weather.value}</Text>
                            </View>
                        </View>
                        {/* humidity */}
                        <View style={tw`flex-1 pl-2`}>
                            <Text style={tw`text-gray-700 font-medium mb-2`}>{humidity.alias}</Text>
                            <View style={tw`flex-row items-center`}>
                                <Image source={require('../assets/icon-drip.png')} style={tw`w-12 h-12`} />
                                <Text style={tw`ml-2`}>{humidity.value}%</Text>
                            </View>
                        </View>
                    </View>
                    {/* temperature & wind speed */}
                    <View style={tw`flex-row justify-between mb-3`}>
                        {/* temperature */}
                        <View style={tw`flex-1 pl-2`}>
                            <Text style={tw`text-gray-700 font-medium mb-2`}>{temperature.alias}</Text>
                            <View style={tw`flex-row items-center`}>
                                <Image source={require('../assets/icon-temperature.png')} style={tw`w-12 h-12`} />
                                <Text style={tw`ml-2`}>{temperature.value}°C</Text>
                            </View>
                        </View>
                        {/* wind speed */}
                        <View style={tw`flex-1 pl-2`}>
                            <Text style={tw`text-gray-700 font-medium mb-2`}>{windSpeed.alias}</Text>
                            <View style={tw`flex-row items-center`}>
                                <Image source={require('../assets/icon-wind.png')} style={tw`w-12 h-12`} />
                                <Text style={tw`ml-2`}>{windSpeed.value} MPH</Text>
                            </View>
                        </View>
                    </View>
                    {/* description */}
                    <View style={tw`mb-3`}>
                        <Text style={tw`text-gray-700 font-medium mb-2`}>{description.alias}</Text>
                        <TextInput
                            style={tw`rounded-md border border-gray-400 p-2 w-full`}
                            onChangeText={(text) => setDescription({ value: text, alias: description.alias })}
                            value={description.value}
                            placeholder={description.alias}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>
                    {/* update button */}
                    <TouchableOpacity
                        style={tw`bg-orange-500 py-2 px-4 rounded`}
                        onPress={handleSave}
                    >
                        <Text style={tw`text-center font-medium`}>Update Event</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default UpdateEventScreen;
