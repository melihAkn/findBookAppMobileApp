let city = "Ankara"
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = ['Kategori1', 'Kategori2', 'Kategori3']; // Kendi kategorilerinizi burada listeleyin

const Categorys = () => {
  const navigation = useNavigation();

  const handleCategoryPress = (category) => {
    navigation.navigate('SearchBooks', { category });
  };

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryButton}
          onPress={() => handleCategoryPress(category)}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButton: {
    padding: 15,
    backgroundColor: '#008CBA',
    borderRadius: 5,
    marginVertical: 10,
  },
  categoryText: {
    color: 'white',
    fontSize: 16,
  },
});
export default Categorys;


