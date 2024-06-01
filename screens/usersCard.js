import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

const UsersCard = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedStore, setSelectedStore] = useState({});

  useFocusEffect(
    useCallback(() => {
      const fetchCartData = async () => {
        try {
          const token = await AsyncStorage.getItem('userToken');
          const response = await axios.get('https://gavindevjourney.com/mobile/userGetCardDetails', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.status === 200) {
            setCartItems(response.data);
          } else {
            setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status);
          }
        } catch (error) {
          let errorCode = error.response?.status;
          if (errorCode === 401) {
            alert("Oturumunuzun süresi doldu veya geçersiz bir token kullanıyorsunuz. Lütfen tekrar giriş yapın.");
          } else {
            setError('Bir hata oluştu: ' + error.message);
          }
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCartData();
    }, []) // Boş bağımlılık dizisi: Sadece sayfa odaklandığında çalışır
  );

  const calculateTotalPrice = () => {
    const validCartItems = Array.isArray(cartItems) ? cartItems : [];
    return cartItems.reduce((total, item) => total + item.bookPrice * item.quantity, 0);
  };
  const handleCompleteOrder = async() => {
    let isAllBookStoresSame = true
    for(let i = 0; i < cartItems.length; i++){
      for (let k = 0; k < cartItems.length - 1; k++) {
        if(cartItems[i].bookStoreName === cartItems[k].bookStoreName){

        }else{
          isAllBookStoresSame = false
          break
        }
      }
    }
      if(isAllBookStoresSame){
        try {
          const token = await AsyncStorage.getItem('userToken');
          const response = await axios.post('https://gavindevjourney.com/mobile/userCompleteOrder',cartItems, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.status === 200) {
            console.log(response.data)
          } else {
            setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status);
          }
        } catch (error) {
          let errorCode = error.response?.status;
          if (errorCode === 401) {
            alert("Oturumunuzun süresi doldu veya geçersiz bir token kullanıyorsunuz. Lütfen tekrar giriş yapın.");
          } else {
            setError('Bir hata oluştu: ' + error.message);
          }
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }else{
        alert("sadece bir mağazadan kitap satın alabilirsiniz")
      }
  };
  const handleUpdateCard = async() => {
        try {
          const token = await AsyncStorage.getItem('userToken');
          const response = await axios.post('https://gavindevjourney.com/mobile/userUpdateOrDeleteItem',cartItems, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.status === 200) {
            console.log(response.data);
          } else {
            setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status);
          }
        } catch (error) {
          let errorCode = error.response?.status;
          if (errorCode === 401) {
            alert("Oturumunuzun süresi doldu veya geçersiz bir token kullanıyorsunuz. Lütfen tekrar giriş yapın.");
          } else {
            setError('Bir hata oluştu: ' + error.message);
          }
          console.error(error);
        } finally {
          setIsLoading(false);
        }

  };
  const handleStoreChange = (item,changedBookStore) => {
    console.log("depre burada görmelisin")
    console.log(item)
    console.log("depre burada görmelisin")
    console.log(changedBookStore)
    item.bookStoreId = changedBookStore.bookStoreId
    item.bookPrice = changedBookStore.price
    item.bookStoreName = changedBookStore.bookStoreName
    setCartItems(prevItems => // cartItems state'ini güncelle
    prevItems.map(cartItems => // prevItems array'ini dolaş
    cartItems.bookId === item.bookId ? { ...cartItems, bookStoreId : changedBookStore.bookStoreId , bookPrice : changedBookStore.price, bookStoreName : changedBookStore.bookStoreName } : cartItems // Eğer item.bookId, bookId'ye eşitse, quantity'yi güncelle, değilse olduğu gibi bırak
    )
  );
  

  };
  const renderCartItem = ({ item }) => {
    
    const handleQuantityChange = (text) => {
      const newQuantity = parseInt(text) || 0;
      setQuantity(newQuantity);
      item.quantity = text
      setCartItems(prevItems => // cartItems state'ini güncelle
      prevItems.map(prItems => // prevItems array'ini dolaş
      prItems.bookId === item.bookId ? { ...prItems, quantity: newQuantity } : prItems // Eğer item.bookId, bookId'ye eşitse, quantity'yi güncelle, değilse olduğu gibi bırak
      )
    );
      
    };

  
  
    return (
      <View style={styles.cartItem}>
        <View style={styles.column1}>
          {item.bookImages && item.bookImages.length > 0 && (
            <Image
              source={{ uri: "https://gavindevjourney.com" + item.bookImages[0].path.replace("public", "") }}
              style={styles.bookImage}
            />
          )}
        </View>
        <View style={styles.column2}>
          <Text style={styles.productName}>{item.bookName}</Text>
          <Text style={styles.bookStoreName}>Mağaza: {item.bookStoreName}</Text>
          <Text style={styles.bookStoreName}>diğer mağazalar:</Text>
          <Picker
            selectedValue={selectedStore[item.bookId] || item.otherBookStores[0]?.bookStoreName}
            onValueChange={(value) => handleStoreChange(item, value)}
            style={styles.picker}
          >
            {item.otherBookStores.map((store, index) => (
              <Picker.Item key={index} label={`${store.name} - ${store.price} TL`} value={{bookStoreName : store.name, bookStoreId : store._id , price : store.price}} />
            ))}
          </Picker>
        </View>
        <View style={styles.column3}>
          <Text style={styles.price}>Ücret: {item.bookPrice} TL</Text>
          <View style={styles.quantityInputContainer}>
            <Text>Adet:</Text>
            <TextInput
              style={styles.quantityInput}
              keyboardType="numeric"
              value={item.quantity.toString()}
              onChangeText={handleQuantityChange}
            />
          </View>
          <TouchableOpacity style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Daha Sonra Al</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#008CBA" />
      ) : error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : (
        <>
        
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Toplam Fiyat: {calculateTotalPrice()} TL</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={() => handleCompleteOrder()}>Alışverişi Tamamla</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={() => handleUpdateCard()}>Sepeti guncelle</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.bookId.toString()}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  totalContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  column1: {
    flex: 0.3,
  },
  column2: {
    flex: 0.4,
    marginRight: 10,
  },
  column3: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
  bookImage: {
    width: 80,
    height: 120,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookStoreName: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  quantityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityInput: {
    width: 40,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 5,
    paddingHorizontal: 5,
  },
  removeButton: {
    backgroundColor: '#f00',
    paddingHorizontal: 4, // Yatay padding azaltıldı
    paddingVertical: 4,   // Dikey padding azaltıldı
    borderRadius: 5,
    marginTop: 5,
  },
  removeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default UsersCard;
