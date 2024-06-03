import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const BuyLaterScreen = () => {
  const [buyLaterList, setBuyLaterList] = useState([]);

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Token'ı al
  
          const response = await axios.get('https://gavindevjourney.com/mobile/userGetBuyLaterList', {
            headers: { Authorization: `Bearer ${token}` } // Token'ı header'a ekle
          });
          console.log(response.data.buyLaterList)
          setBuyLaterList(response.data.buyLaterList)
        } catch (error) {
          console.error('Error fetching orders:', error);
          // Hata durumunda kullanıcıya bilgi verilebilir (Alert vb.)
        }
    };

    fetchFavoriteBooks();
  }, []);

  const handleAddToCart = async (bookId) => {
    try {
      // Favorilerden çıkarmak için API isteği gönder
        const token = await AsyncStorage.getItem('userToken'); // Token'ı al
  
        const response = await axios.post('https://gavindevjourney.com/mobile/userDeleteItemInFavorite',{bookId : bookId}, {
          headers: { Authorization: `Bearer ${token}` } // Token'ı header'a ekle
        });
        if(response.status === 200){
          alert("kitap başarılı bir şekilde favori listesinden kaldırıldı")
        }
      setFavoriteBooks(favoriteBooks.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };
  const handeRemoveFromBuyLaterList = async (bookId) => {
    try {
      // Favorilerden çıkarmak için API isteği gönder
        const token = await AsyncStorage.getItem('userToken'); // Token'ı al
  
        const response = await axios.post('https://gavindevjourney.com/mobile/userDeleteItemInFavorite',{bookId : bookId}, {
          headers: { Authorization: `Bearer ${token}` } // Token'ı header'a ekle
        });
        if(response.status === 200){
          alert("kitap başarılı bir şekilde favori listesinden kaldırıldı")
        }
      setFavoriteBooks(favoriteBooks.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Image source={{ uri: "https://gavindevjourney.com"+ item.images[0].path.replace('public','') }} style={styles.bookCover} />
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.name}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <TouchableOpacity onPress={() => handleAddToCart(item._id)}>
          <Text style={styles.removeButton}>sepete ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handeRemoveFromBuyLaterList(item._id)}>
          <Text style={styles.removeButton}>daha sonra al listesinden çıkar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={buyLaterList}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f9f9f9', // Arka plan rengi (isteğe bağlı)
    borderRadius: 8, // Köşeleri yumuşat
    padding: 10,
  },
  bookCover: {
    width: 80,
    height: 120,
    marginRight: 15,
    borderRadius: 4, // Köşeleri yumuşat
  },
  bookDetails: {
    flex: 1, // Kalan alanı kapla
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555', // Yazar adı için daha açık bir renk
  },
  removeButton: {
    marginTop: 10,
    color: 'red', // Kırmızı renkli "Favorilerden Çıkar" butonu
    textDecorationLine: 'underline', // Altı çizgili
  },
});

export default BuyLaterScreen;
