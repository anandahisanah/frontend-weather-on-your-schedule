import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState({
    value: null,
    alias: "Username",
  });

  const [password, setPassword] = useState({
    value: null,
    alias: "Password",
  });

  const handleSave = () => {
    console.log('Title:', title.value);
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <View style={tw`bg-white justify-center items-center p-5 rounded`}>
        <Text style={tw`text-xl font-bold mb-1`}>Sign In</Text>
        <Text style={tw`text-base font-normal mb-5`}>You need to login to continue</Text>
        <Image source={require('../assets/weather-icon/1-cerah-berawan.png')} style={tw`w-12 h-12`} />

        <View style={tw`w-100 mt-5 px-5`}>
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
              />
            </View>
          </View>
          {/* create button */}
          <TouchableOpacity
            style={tw`bg-orange-500 py-2 px-4 rounded`}
            onPress={handleSave}
          >
            <Text style={tw`text-center font-medium`}>Login</Text>
          </TouchableOpacity>
        </View>
        {/* create account */}
        <TouchableOpacity onPress={() => navigation.replace('Register')}>
          <Text style={tw`text-sm font-normal mt-5 px-5`}>
            Don’t have an account?
            <Text style={tw`text-orange-500 font-medium`}> Create your account!</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
