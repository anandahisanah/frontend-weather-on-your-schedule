import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { Header } from 'react-native-elements';

const CreateEventScreen = ({ navigation }) => {
    const [title, setTitle] = useState({
        value: null,
        alias: "Title",
    });

    const [date, setDate] = useState({
        value: null,
        alias: "Date",
    });

    const [time, setTime] = useState({
        value: null,
        alias: "Time",
    });

    const [weatherForecast, setWeatherForecast] = useState({
        value: null,
        alias: "Weather Forecast",
    });

    const [chanceOfRaining, setChanceOfRaining] = useState({
        value: null,
        alias: "Chance Of Raining",
    });

    const [description, setDescription] = useState({
        value: null,
        alias: "Description",
    });

    const handleSave = () => {
        console.log('Title:', title.value);
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
                    <TouchableOpacity onPress={() => navigation.replace('Home')}>
                        <Text style={tw`text-blue-500 font-medium`}>Back</Text>
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
                            <Text style={tw`text-gray-700 font-medium mb-2`}>{date.alias}</Text>
                            <TextInput
                                style={tw`rounded-md border border-gray-400 p-2 w-full`}
                                onChangeText={(text) => setDate({ value: text, alias: date.alias })}
                                value={date.value}
                                placeholder={date.alias}
                            />
                        </View>
                        {/* time */}
                        <View style={tw`flex-1 pl-2`}>
                            <Text style={tw`text-gray-700 font-medium mb-2`}>{time.alias}</Text>
                            <TextInput
                                style={tw`rounded-md border border-gray-400 p-2 w-full`}
                                onChangeText={(text) => setTime({ value: text, alias: time.alias })}
                                value={time.value}
                                placeholder={time.alias}
                            />
                        </View>
                    </View>
                    {/* weatherForecast & chanceOfRaining */}
                    <View style={tw`flex-row justify-between mb-3`}>
                        {/* weatherForecast */}
                        <View style={tw`flex-1 pr-2`}>
                            <Text style={tw`text-gray-700 font-medium mb-2`}>{weatherForecast.alias}</Text>
                            <View style={tw`flex-row items-center`}>
                                <Image source={require('../assets/icon-sun.png')} style={tw`w-12 h-12`} />
                                <Text style={tw`ml-2`}>30°</Text>
                            </View>
                        </View>
                        {/* chanceOfRaining */}
                        <View style={tw`flex-1 pl-2`}>
                            <Text style={tw`text-gray-700 font-medium mb-2`}>{chanceOfRaining.alias}</Text>
                            <View style={tw`flex-row items-center`}>
                                <Image source={require('../assets/icon-drip.png')} style={tw`w-12 h-12`} />
                                <Text style={tw`ml-2`}>40%</Text>
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
                    {/* button */}
                    <TouchableOpacity
                        style={tw`bg-orange-500 py-2 px-4 rounded`}
                        onPress={handleSave}
                    >
                        <Text style={tw`text-center font-medium`}>Add Event</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CreateEventScreen;
