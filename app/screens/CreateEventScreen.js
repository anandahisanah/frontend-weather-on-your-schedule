import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, Platform, Modal } from 'react-native';
import tw from 'twrnc';
import { Header } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const CreateEventScreen = ({ navigation, route }) => {
    const { username } = route.params;

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

    // date
    const [date, setDate] = useState(new Date());
    const [showPickerDate, setShowPickerDate] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPickerDate(false);
        setDate(currentDate);
    };

    const showDatePicker = () => {
        setShowPickerDate(true);
    };

    // time
    const [time, setTime] = useState(new Date());
    const [showPickerTime, setShowPickerTime] = useState(false);

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowPickerTime(false);
        setTime(currentTime);
    };

    const showTimePicker = () => {
        setShowPickerTime(true);
    };

    const getFormattedDate = (date) => {
        return date.toLocaleDateString('en-GB'); // Format tanggal dd-mm-yyyy
    };

    const getFormattedTime = (time) => {
        return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }); // Format waktu HH:mm
    };

    const getForecast = () => {
        axios.get(`https://backend-weather-on-your-schedule-production.up.railway.app/forecast/find-by-datetime?username=${username}&date=${getFormattedDate(date)}&time=${getFormattedTime(time)}`)
            .then(response => {
                const data = response.data.data;

                // Mengupdate state dengan data dari respons
                setWeather(prevState => ({
                    ...prevState,
                    value: data.weather
                }));

                setHumidity(prevState => ({
                    ...prevState,
                    value: data.humidity
                }));

                setWindSpeed(prevState => ({
                    ...prevState,
                    value: parseFloat(data.wind_speed).toFixed(2)
                }));

                setTemperature(prevState => ({
                    ...prevState,
                    value: data.temperature
                }));
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
    }

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

    React.useEffect(() => {
        if (date !== "" && time !== "") {
            getForecast();
        }
    }, [date, time]);

    const padZero = (number) => {
        return number < 10 ? "0" + number : number;
    };

    const handleSave = () => {
        const dateTime = new Date(date);
        dateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
        const formattedDateTime =
            dateTime.getFullYear() +
            "-" +
            padZero(dateTime.getMonth() + 1) +
            "-" +
            padZero(dateTime.getDate()) +
            " " +
            padZero(dateTime.getHours()) +
            ":" +
            padZero(dateTime.getMinutes()) +
            ":00";

        const data = {
            user_username: username,
            datetime: formattedDateTime,
            title: title.value,
            description: description.value,
        };
        axios.post('https://backend-weather-on-your-schedule-production.up.railway.app/event', data)
            .then(response => {
                navigation.replace('Home', { username: username });
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
                backgroundColor={'#fff'}
                centerComponent={{
                    text: 'Create Event',
                    style: { color: '#000', fontWeight: 'bold', fontSize: 18 },
                }}
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.replace('Home', { username: username })}>
                        <Image source={require('../assets/back-arrow.png')} style={tw`w-6 h-6`} />
                    </TouchableOpacity>
                }
            />
            <View style={tw`flex-1 items-center bg-white`}>
                <View style={tw`w-full p-5`}>
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
                    {/* date & time */}
                    <View style={tw`flex-row justify-between mb-3`}>
                        {/* date */}
                        <View style={tw`flex-1 pr-2`}>
                            <Text style={tw`text-gray-700 font-medium mb-2`}>Date</Text>
                            <TouchableOpacity
                                style={tw`rounded-md border border-gray-400 p-2 w-full`}
                                onPress={showDatePicker}
                            >
                                <Text style={tw`text-black`}>{date ? date.toLocaleDateString() : 'Select Date'}</Text>
                            </TouchableOpacity>

                            <Modal visible={showPickerDate} transparent={true} animationType="slide">
                                <View style={tw`flex-1 justify-end`}>
                                    <TouchableOpacity
                                        style={tw`bg-white p-4`}
                                        onPress={() => setShowPickerDate(false)}
                                    >
                                        <DateTimePicker
                                            value={date}
                                            mode="date"
                                            is24Hour={true}
                                            display="default"
                                            minimumDate={new Date()}
                                            onChange={onChangeDate}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </View>
                        {/* time */}
                        <View style={tw`flex-1 pr-2`}>
                            <Text style={tw`text-gray-700 font-medium mb-2`}>Time</Text>
                            <TouchableOpacity
                                style={tw`rounded-md border border-gray-400 p-2 w-full`}
                                onPress={showTimePicker}
                            >
                                <Text style={tw`text-black`}>
                                    {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : 'Select Time'}
                                </Text>
                            </TouchableOpacity>

                            <Modal visible={showPickerTime} transparent={true} animationType="slide">
                                <View style={tw`flex-1 justify-end`}>
                                    <TouchableOpacity
                                        style={tw`bg-white p-4`}
                                        onPress={() => setShowPickerTime(false)}
                                    >
                                        <DateTimePicker
                                            value={time}
                                            mode="time"
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChangeTime}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </Modal>
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
                    {/* create button */}
                    <TouchableOpacity
                        style={tw`bg-orange-500 py-2 px-4 rounded`}
                        onPress={handleSave}
                    >
                        <Text style={tw`text-center font-medium`}>Create Event</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CreateEventScreen;
