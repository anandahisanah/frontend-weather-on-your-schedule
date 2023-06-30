import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const useBackButtonHandler = (handler) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handler();
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, [handler]);
};

const LoginScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState({
    value: null,
    alias: 'Name',
  });

  const [username, setUsername] = useState({
    value: null,
    alias: 'Username',
  });

  const [password, setPassword] = useState({
    value: null,
    alias: 'Password',
  });

  const [province, setProvince] = useState({
    value: null,
    alias: 'Province',
  });

  const [city, setCity] = useState({
    value: null,
    alias: 'City',
  });

  const handleSave = () => {
  };

  useBackButtonHandler(() => {
    // Handle back button press
    // For example, navigate back to the previous screen
    navigation.goBack();
    return true;
  });

  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <View style={tw`bg-white justify-center items-center p-5 rounded`}>
        <Text style={tw`text-xl font-bold mb-1`}>Register</Text>
        <Text style={tw`text-base font-normal mb-5`}>Create your new account</Text>
        <Image source={require('../assets/weather-icon/0-cerah.png')} style={tw`w-12 h-12`} />

        <View style={tw`w-100 mt-5 px-5`}>
          {/* name */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>{name.alias}</Text>
            <View>
              <TextInput
                style={tw`rounded-md border border-gray-400 p-2`}
                onChangeText={(text) => setName({ value: text, alias: name.alias })}
                value={name.value}
                placeholder={name.alias}
              />
            </View>
          </View>
          {/* username */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>{username.alias}</Text>
            <View>
              <TextInput
                style={tw`rounded-md border border-gray-400 p-2`}
                onChangeText={(text) => setUsername({ value: text, alias: username.alias })}
                value={username.value}
                placeholder={username.alias}
              />
            </View>
          </View>
          {/* password */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>{password.alias}</Text>
            <View>
              <TextInput
                style={tw`rounded-md border border-gray-400 p-2`}
                onChangeText={(text) => setPassword({ value: text, alias: password.alias })}
                value={password.value}
                placeholder={password.alias}
                secureTextEntry
              />
            </View>
          </View>
          {/* province */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>{province.alias}</Text>
            <View>
              <TextInput
                style={tw`rounded-md border border-gray-400 p-2`}
                onChangeText={(text) => setProvince({ value: text, alias: province.alias })}
                value={province.value}
                placeholder={province.alias}
              />
            </View>
          </View>
          {/* city */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>{city.alias}</Text>
            <View>
              <TextInput
                style={tw`rounded-md border border-gray-400 p-2`}
                onChangeText={(text) => setCity({ value: text, alias: city.alias })}
                value={city.value}
                placeholder={city.alias}
              />
            </View>
          </View>
          {/* create button */}
          <TouchableOpacity style={tw`bg-orange-500 py-2 px-4 rounded`} onPress={handleSave}>
            <Text style={tw`text-center font-medium`}>Create Account</Text>
          </TouchableOpacity>
        </View>
        {/* create account */}
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={tw`text-sm font-normal mt-5 px-5`}>
            Have an account?
            <Text style={tw`text-orange-500 font-medium`}> Login here!</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
