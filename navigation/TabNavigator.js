import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScreen';
import UsersCard from '../screens/usersCard';
const Tab = createBottomTabNavigator();
import StackNavigator from '../navigation/StackNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BookDetailStackNavigator from './bookPressNavigator';
const TabNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token); // Token varsa isLoggedIn true olarak ayarlanır, yoksa false
    };
    checkToken();
  }, [isLoggedIn]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={BookDetailStackNavigator}
        initialParams={{ location: 'Home' }}
        options={{
          headerShown: false,
          tabBarLabel: 'Anasayfa',
        }}
      />
      <Tab.Screen
        name="searchBooks"
        component={BookDetailStackNavigator}
        initialParams={{ location: 'SearchBooks' }}
        options={{
          headerShown: false,
          tabBarLabel: 'Kitaplar',
        }}
      />
      <Tab.Screen
        name="usersCard"
        component={UsersCard}
        options={{
          headerShown: false,
          tabBarLabel: 'Sepet',
        }}
      />
      <Tab.Screen
      name='Account'
      component={StackNavigator}
      options={{
        headerShown : false,
        tabBarLabel: isLoggedIn ? 'Profil' : 'Giriş Yap',
      }}
      initialParams={{ isLoggedIn: isLoggedIn }}
      />

     
    </Tab.Navigator>
  );
};

export default TabNavigator
