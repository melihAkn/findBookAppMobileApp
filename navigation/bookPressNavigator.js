import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import SearchBooks from '../screens/searchBooks';
import BookDetailScreen from '../screens/detailedBookPage';

const Stack = createStackNavigator();

const BookDetailStackNavigator = ({ route }) => {
  const { location } = route.params;

  return (
    <Stack.Navigator>
      {location === 'Home' && (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      )}
      {location === 'SearchBooks' && (
        <Stack.Screen
          name="SearchBooks"
          component={SearchBooks}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{
          headerShown: true,
          title: "Detaylı Kitap Sayfası",
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default BookDetailStackNavigator;
