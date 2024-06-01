import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';

// Diğer ekran bileşenlerini import etmeyi unutmayın
import UpdateProfileScreen from './UpdateProfileScreen';
import FavoritesScreen from './FavoritesScreen';
import OrdersScreen from './OrdersScreen';

const Stack = createStackNavigator();

function ProfileScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileHome"
        component={ProfileContent}
        options={{ title: 'Profil' }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
        options={{ title: 'Bilgileri Güncelle' }}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Favoriler' }}
      />
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ title: 'Siparişler' }}
      />
    </Stack.Navigator>
  );
}

function ProfileContent({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        navigation.navigate('Home'); // Giriş ekranına yönlendir
      } else {
        const userInfo = await fetchUserInfo(token);
        setUserInfo(userInfo);
      }
    };
    checkToken();
  }, []);

  const fetchUserInfo = async (token) => {
    const returnedData = {
      nameAndSurname: "",
      email: ""
    };

    try {
      const response = await axios.get('https://gavindevjourney.com/mobile/getUserInfos', {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        returnedData.nameAndSurname = response.data.nameAndSurname;
        returnedData.email = response.data.email;
      } else {
        console.error('Sunucudan beklenmeyen bir yanıt alındı:', response.status);
        // Hata durumunda uygun bir mesaj göster veya yönlendirme yap
      }
    } catch (error) {
      const statusCode = error.message.split(" ")[error.message.split(" ").length - 1];
      if (statusCode === "400") {
        alert("Kullanıcı adı veya şifre yanlış");
      } else {
        console.error(error);
        alert("Sunucu hatası");
      }
    }

    return returnedData;
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Home'); // Giriş ekranına yönlendir
  };

  if (!userInfo) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: userInfo.profileImage }} style={styles.profileImage} />
      <Text style={styles.userName}>{userInfo.nameAndSurname}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateProfile')}>
        <Text style={styles.buttonText}>Bilgileri Güncelle</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Favorites')}>
        <Text style={styles.buttonText}>Favoriler</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Orders')}>
        <Text style={styles.buttonText}>Siparişler</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ... (stiller aynı kalır)
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    userEmail: {
      fontSize: 18,
      color: '#555',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    logoutButton: {
      backgroundColor: '#dc3545',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
export default ProfileScreen;
