import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

const SearchBar = ({ setCity, fetchWeather }) => {
  const [city, setCityInput] = useState('');

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeather(city);
      setCity(city);
      setCityInput(''); // Clear the input field after search
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
          flex: 1,
        }}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCityInput}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#007bff',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 10,
        }}
        onPress={handleSearch}
      >
        <Text style={{ color: '#fff' }}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
