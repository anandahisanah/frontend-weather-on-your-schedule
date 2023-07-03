import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, BackHandler, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';

const RegisterScreen = () => {
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

  // select province and city
  const [selectedProvince, setSelectedProvince] = React.useState("");
  const [provinces, setProvinces] = React.useState([]);
  const [selectedCity, setSelectedCity] = React.useState("");
  const [cities, setCities] = React.useState([]);

  const getProvinces = () => {
    axios.get('https://backend-weather-on-your-schedule-production.up.railway.app/province')
      .then(response => {
        const updatedProvinces = response.data.data.map(province => ({
          key: province.id.toString(),
          value: province.name
        }));
        setProvinces(updatedProvinces);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getCities = () => {
    if (selectedProvince !== "") {
      axios.get(`https://backend-weather-on-your-schedule-production.up.railway.app/city?name=${selectedProvince}`)
        .then(response => {
          const updatedCities = response.data.data.map(city => ({
            key: city.id.toString(),
            value: city.name
          }));
          setCities(updatedCities);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  React.useEffect(() => {
    if (selectedProvince !== "") {
      getCities(selectedProvince);
    }
  }, [selectedProvince]);

  React.useEffect(() => {
    if (provinces.length === 0) {
      getProvinces();
    }
  }, []);

  // modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // save
  const handleSave = () => {
    const userData = {
      province_name: selectedProvince,
      city_name: selectedCity,
      username: username.value,
      password: password.value,
      name: name.value,
    };
    axios.post('https://backend-weather-on-your-schedule-production.up.railway.app/user', userData)
      .then(response => {
        navigation.replace('Login', { province_name: selectedProvince, city_name: selectedCity });
      })
      .catch(error => {
        console.error(error);
      });
  };

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
            <Text style={tw`text-gray-700 font-medium mb-2`}>Province</Text>
            <View>
              <SelectList
                setSelected={setSelectedProvince}
                data={provinces}
                save="value"
              />
            </View>
          </View>
          {/* city */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>City</Text>
            <View>
              <SelectList
                setSelected={setSelectedCity}
                data={cities}
                save="value"
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

        {/* Modal */}
        <Modal visible={modalVisible} animationType="fade">
          <View style={tw`flex-1 justify-center items-center bg-white`}>
            <Text>{modalMessage}</Text>
            <TouchableOpacity style={tw`bg-orange-500 mt-3 py-2 px-4 rounded`} onPress={() => setModalVisible(false)}>
              <Text style={tw`text-center font-medium`}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default RegisterScreen;
