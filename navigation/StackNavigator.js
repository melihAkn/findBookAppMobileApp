import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserLoginScreen from '../screens/userLogin';
import ProfileScreen from '../screens/profileScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token); // Token varsa isLoggedIn true olarak ayarlanır, yoksa false
    };
    checkToken();
  }, [isLoggedIn]);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="UserLogin" // Burada ekran adının doğru olduğundan emin olun
          component={UserLoginScreen} // UserLoginScreen burada doğru şekilde tanımlanmış mı?
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
