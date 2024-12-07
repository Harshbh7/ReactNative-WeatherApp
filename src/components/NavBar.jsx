import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const NavBar = () => {
  return (
    <View style={{ backgroundColor: '#343a40', padding: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 20 }}>Weather App</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavBar;
