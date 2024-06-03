import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // İkonlar için
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
const BookDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { book } = route.params;

  const [isFavorite, setIsFavorite] = useState(false); // Favori durumu

  const handleAddToCartForOtherBookStores = async(index) => {
    // Sepete ekleme işlemleri
    console.log(index)
    console.log('Kitap sepete eklendi:', book.name);
    userShoppingCardJSON = {
      bookId : book._id,
      sellerBookStoreInfos : book.bookStoreInfos[index],
      quantity : 1,
      bookName : book.name
  }
    const token = await AsyncStorage.getItem('userToken')
    console.log(token)
    if(token){
      console.log(token)
      try {
        const response = await axios.post('https://gavindevjourney.com/mobile/userAddToCard',userShoppingCardJSON, {
          headers: {
             Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        console.log("asda")
        if (response.status === 200) {
          alert(response.data.message)
          console.log(response.data)
  
        }else {
         alert(response.data)
         console.log("hata var")
          setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status);
        }
      } catch (error) {
        console.log(error)
       let errorCode = error.message.split(" ")[error.message.split(" ").length - 1]
       if(errorCode == "401"){
         alert("şifre yanlış")
         console.log("şifre yanlış")
       }
      }
    }else{
      alert("sepetinize kitap eklemek için giriş yapmanız gerekmektedir")
    }
  };

  const handleAddToCart = async() => {
 // Sepete ekleme işlemleri
 console.log('Kitap sepete eklendi:', book.name);
 userShoppingCardJSON = {
   bookId : book._id,
   sellerBookStoreInfos : book.bookStoreInfos[0],
   quantity : 1,
   bookName : book.name
}
 const token = await AsyncStorage.getItem('userToken')
 console.log(token)
 if(token){
   console.log(token)
   try {
     const response = await axios.post('https://gavindevjourney.com/mobile/userAddToCard',userShoppingCardJSON, {
       headers: {
          Authorization: `Bearer ${token}`,
         "Content-Type": "application/json"
       }
     })
     console.log("asda")
     if (response.status === 200) {
       alert(response.data.message)
       console.log(response.data)

     }else {
      alert(response.data)
      console.log("hata var")
       setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status);
     }
   } catch (error) {
     console.log(error)
    let errorCode = error.message.split(" ")[error.message.split(" ").length - 1]
    if(errorCode == "401"){
      alert("şifre yanlış")
      console.log("şifre yanlış")
    }
   }
 }else{
   alert("sepetinize kitap eklemek için giriş yapmanız gerekmektedir")
 }
  }
  const handleToggleFavorite = async() => {
    setIsFavorite(!isFavorite);
    // Favoriye ekleme/çıkarma işlemleri
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={{ uri: "https://gavindevjourney.com" + book.images[0].path.replace('public', '') }} 
        style={styles.bookImage} 
      />

      <View style={styles.bookInfo}>
        <Text style={styles.title}>{book.name}</Text>
        <Text style={styles.author}>Yazar: {book.author}</Text>
        <Text style={styles.description}>{book.description}</Text>

        <View style={styles.details}>
          <Text>Sayfa Sayısı: {book.pageCount}</Text>
          <Text>Yayın Tarihi: {book.publicationDate}</Text>
          <Text>ISBN: {book.ISBN}</Text>
          <Text>Ortalama Puan: {book.averageRating}</Text>
        </View>
      </View>

      <Text>satıcılar</Text>
      <View style={styles.storeList}>
        {book.bookStoreInfos.map((store, index) => (
          <View key={index} style={styles.storeItem}>
            <Text style={styles.storeName}>{store.bookStoreName}</Text>
            <Text style={styles.storePrice}>{store.price} TL</Text>
            <Text style={styles.storeStock}>Stok: {store.stockInfo}</Text>
            <TouchableOpacity style={styles.buttonSmall} onPress={() => handleAddToCartForOtherBookStores(index)}>
          <Icon name="shopping-cart" size={20} color="white" />
          <Text style={styles.buttonText}>Sepete Ekle</Text>
        </TouchableOpacity>
          </View>
          
        ))}
     
      </View>

      {/* Butonlar */}
      
      <View style={styles.buttonContainer}>
      <Text style={styles.storeName}>{book.bookStoreInfos[0].price} tl</Text>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Icon name="shopping-cart" size={20} color="white" />
          <Text style={styles.buttonText}>Sepete Ekle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleToggleFavorite}>
          <Icon name={isFavorite ? 'heart' : 'heart-o'} size={20} color="white" />
          <Text style={styles.buttonText}>
            {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // ScrollView içeriğinin tüm alanı kaplaması için
    padding: 20,
  },
  bookImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain', // Resmi orantılı bir şekilde yeniden boyutlandır
    marginBottom: 20,
  },
  bookInfo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    lineHeight: 20, // Satır yüksekliği okumayı kolaylaştırır
  },
  details: {
    marginTop: 15,
  },
  storeList: {
    marginBottom: 20,
  },
  storeItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  storeName: {
    fontWeight: 'bold',
  },
  storePrice: {
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007bff', // Mavi buton rengi
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSmall : {
    backgroundColor: '#007bff', // Mavi buton rengi
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
  },
});
// ... (stiller)
export default BookDetailScreen;
 