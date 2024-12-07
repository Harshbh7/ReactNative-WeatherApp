// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import axios from 'axios';

// const WeatherApp = () => {
//   const [city, setCity] = useState('');
//   const [weatherData, setWeatherData] = useState(null);
//   const [error, setError] = useState('');

//   const API_KEY = '6535bc285dea37a5c6284d84f5a7f87b';
//   const fetchWeather = async () => {
//     if (!city.trim()) {
//       setError('Please enter a city name.');
//       return;
//     }
//     setError('');
//     try {
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//       );
//       setWeatherData(response.data);
//     } catch (err) {
//       setError('City not found. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Weather App</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter city name"
//         value={city}
//         onChangeText={setCity}
//       />
//       <TouchableOpacity style={styles.button} onPress={fetchWeather}>
//         <Text style={styles.buttonText}>Get Weather</Text>
//       </TouchableOpacity>
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}
//       {weatherData && (
//         <View style={styles.weatherInfo}>
//           <Text style={styles.cityName}>{weatherData.name}</Text>
//           <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
//           <Text style={styles.description}>{weatherData.weather[0].description}</Text>
//           <Text style={styles.humidity}>Humidity: {weatherData.main.humidity}%</Text>
//           <Image
//             style={styles.weatherIcon}
//             source={{
//               uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
//             }}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2f2',
//     padding: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     width: '100%',
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   weatherInfo: {
//     alignItems: 'center',
//   },
//   cityName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   temp: {
//     fontSize: 48,
//     fontWeight: 'bold',
//   },
//   description: {
//     fontSize: 18,
//     textTransform: 'capitalize',
//   },
//   humidity: {
//     fontSize: 16,
//   },
//   weatherIcon: {
//     width: 100,
//     height: 100,
//     marginTop: 10,
//   },
// });

// export default WeatherApp;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   FlatList,
//   Alert,
//   RefreshControl,
// } from 'react-native';
// import axios from 'axios';
// import Geolocation from 'react-native-geolocation-service';

// const WeatherApp = () => {
//   const [city, setCity] = useState('');
//   const [weatherData, setWeatherData] = useState(null);
//   const [searchHistory, setSearchHistory] = useState([]);
//   const [error, setError] = useState('');
//   const [refreshing, setRefreshing] = useState(false);

//   const API_KEY = '6535bc285dea37a5c6284d84f5a7f87b';

//   useEffect(() => {
//     getCurrentLocationWeather();
//   }, []);

//   const getCurrentLocationWeather = () => {
//     Geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const response = await axios.get(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
//           );
//           setWeatherData(response.data);
//         } catch (err) {
//           setError('Failed to fetch weather for current location.');
//         }
//       },
//       (error) => {
//         Alert.alert('Location Error', 'Failed to get location. Please enable GPS.');
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   const fetchWeather = async () => {
//     if (!city.trim()) {
//       setError('Please enter a city name.');
//       return;
//     }
//     setError('');
//     try {
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//       );
//       setWeatherData(response.data);
//       addToHistory(city);
//     } catch (err) {
//       setError('City not found. Please try again.');
//     }
//   };

//   const addToHistory = (cityName) => {
//     if (!searchHistory.includes(cityName)) {
//       setSearchHistory([...searchHistory, cityName]);
//     }
//   };

//   const clearHistory = () => {
//     setSearchHistory([]);
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     getCurrentLocationWeather();
//     setRefreshing(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Weather App</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter city name"
//         value={city}
//         onChangeText={setCity}
//       />
//       <TouchableOpacity style={styles.button} onPress={fetchWeather}>
//         <Text style={styles.buttonText}>Get Weather</Text>
//       </TouchableOpacity>
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}
//       {weatherData && (
//         <View style={styles.weatherInfo}>
//           <Text style={styles.cityName}>{weatherData.name}</Text>
//           <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
//           <Text style={styles.description}>{weatherData.weather[0].description}</Text>
//           <Text style={styles.detail}>Feels like: {weatherData.main.feels_like}°C</Text>
//           <Text style={styles.detail}>Wind Speed: {weatherData.wind.speed} m/s</Text>
//           <Text style={styles.detail}>Humidity: {weatherData.main.humidity}%</Text>
//           <Image
//             style={styles.weatherIcon}
//             source={{
//               uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
//             }}
//           />
//         </View>
//       )}
//       <FlatList
//         data={searchHistory}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => <Text style={styles.historyItem}>{item}</Text>}
//         ListHeaderComponent={() =>
//           searchHistory.length > 0 && (
//             <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
//               <Text style={styles.clearButtonText}>Clear History</Text>
//             </TouchableOpacity>
//           )
//         }
//         ListFooterComponent={() =>
//           searchHistory.length > 0 && <Text style={styles.historyTitle}>Search History</Text>
//         }
//       />
//       <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocationWeather}>
//         <Text style={styles.buttonText}>Get Current Location Weather</Text>
//       </TouchableOpacity>
//       <FlatList
//         data={searchHistory}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         renderItem={({ item }) => <Text style={styles.historyItem}>{item}</Text>}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2f2',
//     padding: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     width: '100%',
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: 20,
//   },
//   locationButton: {
//     backgroundColor: '#28a745',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     width: '100%',
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   weatherInfo: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   cityName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   temp: {
//     fontSize: 48,
//     fontWeight: 'bold',
//   },
//   description: {
//     fontSize: 18,
//     textTransform: 'capitalize',
//   },
//   detail: {
//     fontSize: 16,
//   },
//   weatherIcon: {
//     width: 100,
//     height: 100,
//     marginTop: 10,
//   },
//   historyItem: {
//     fontSize: 16,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   clearButton: {
//     backgroundColor: '#dc3545',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: 10,
//   },
//   clearButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   historyTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
// });

// export default WeatherApp;




import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Card, ActivityIndicator } from 'react-native-paper';
import * as Location from 'expo-location';

const WeatherApp = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        setErrorMsg('Unable to fetch location.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleRefreshLocation = async () => {
    setLoading(true);
    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg('Unable to fetch location.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Weather App" />
        <Card.Content>
          {loading ? (
            <ActivityIndicator animating={true} size="large" />
          ) : errorMsg ? (
            <Text style={styles.errorText}>{errorMsg}</Text>
          ) : location ? (
            <View>
              <Text style={styles.infoText}>
                Latitude: {location.coords.latitude}
              </Text>
              <Text style={styles.infoText}>
                Longitude: {location.coords.longitude}
              </Text>
            </View>
          ) : (
            <Text style={styles.infoText}>Fetching location...</Text>
          )}
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleRefreshLocation}>
            Refresh Location
          </Button>
        </Card.Actions>
      </Card>

      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/1116/1116453.png',
        }}
        style={styles.weatherIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  card: {
    width: '90%',
    padding: 10,
    marginVertical: 20,
    backgroundColor: '#ffffff',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

export default WeatherApp;
