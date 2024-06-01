// navigation/TabNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'; // Kitapların listeleneceği ekran
import categorys from '../screens/categorys';
//import OtherScreen from '../screens/OtherScreen'; // Diğer ekranlar (Profil, Ayarlar vb.)

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
    <Tab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ 
        headerShown: false, // Bu satır başlığı tamamen kaldırır
        tabBarLabel: 'Anasayfa', // İsterseniz tab çubuğundaki etiketi değiştirebilirsiniz
      }} />


      <Tab.Screen 
      name = "categorys"
      component = {categorys}
      options={{ 
        headerShown: false, // Bu satır başlığı tamamen kaldırır
        tabBarLabel: 'Anasayfa', // İsterseniz tab çubuğundaki etiketi değiştirebilirsiniz
      }} />


    </Tab.Navigator>
  );
};

export default TabNavigator;