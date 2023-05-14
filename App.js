import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

export default function App() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-blue-500`}>
      <Text style={tw`text-white text-2xl font-bold`}>
        Hello, world!
      </Text>
    </View>
  );
}

