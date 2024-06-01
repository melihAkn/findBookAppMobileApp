import React, { useState, useEffect , createContext , useContext} from 'react'
import { View,ScrollView, Text, FlatList, Image, StyleSheet , TouchableOpacity } from 'react-native'
import axios from 'axios'
let city = "Ankara"
const SearchBooks = (category = "seçiniz",city = city , bookName = /./) => {
    const [getMostSelledBooks, setGetMostSelledBooks] = useState([])
    useEffect(() => {
        //veriyi degiskene atama
    }, [])
    if (isLoading) {
        return (
          <View style={styles.centered}>
            <Text>Yükleniyor...</Text>
          </View>
        )
      }
    
      if (error) {
        return (
          <View style={styles.centered}>
            <Text>Hata: {error}</Text>
          </View>
        )
      }
    
      return (
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text>{}</Text>
        <View style={styles.container}>
          <Text style={styles.header}>en çok satan kitaplar</Text>
          <FlatList
            data={getMostSelledBooks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.bookItem}>
                <Image source={{ uri: "https://gavindevjourney.com"+ item.images[0].path.replace('public','') }} style={styles.bookImage} />
                <Text style={styles.bookTitle}>{item.name}</Text>
                <Text style={styles.bookPrice}>{item.bookStoreInfos[0].price} TL</Text>
            <View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} onPress={() => handleAddToCart(item)}>sepete ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} onPress={() => handleToAddFavorite(item)}>favorilere ekle</Text>
            </TouchableOpacity>
            </View>
          </View>
    
              
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            style={styles.flatList}
          />
          </View>
    </ScrollView>
        
      );
      
    };

export default SearchBooks;