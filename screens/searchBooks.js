import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import axios from 'axios';
const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const fetchBooks = async (category = "seçiniz", searchedCity = "Ankara", bookName = "") => {
    try {
      const response = await axios.post('https://gavindevjourney.com/performSearch', { searchedCity, category, bookName }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        setBooks(response.data.books);
      } else {
        setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status);
      }
    } catch (error) {
      setError('Axios hatası: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = () => {
    fetchBooks("seçiniz", "Ankara", searchTerm);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Hata: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Kitap ara..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Image source={{ uri: "https://gavindevjourney.com" + item.images[0].path.replace('public', '') }} style={styles.bookImage} />
            <Text style={styles.bookTitle}>{item.name}</Text>
            <Text style={styles.bookPrice}>{item.bookStoreInfos[0].price} TL</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sepete Ekle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Favorilere Ekle</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  bookItem: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  bookImage: {
    width: 100,
    height: 150,
    marginBottom: 5,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  bookPrice: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#008CBA',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default SearchBooks;
