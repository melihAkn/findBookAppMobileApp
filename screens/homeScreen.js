import React, { useState, useEffect , createContext , useContext} from 'react'
import { View,ScrollView, Text, FlatList, Image, StyleSheet , TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
let city = "Ankara"
const HomeScreen = () => {
  const [getMostSelledBooks, setGetMostSelledBooks] = useState([])
  const [getNewlyAddedBooks, setGetNewlyAddedBooks] = useState([])
  const [getBooksByMostPopularCategory, setGetBooksByMostPopularCategory] = useState([])
  const [getPopularCategorys, setGetPopularCategorys] = useState([])
  const [getMostReliableBookStores, setGetMostReliableBookStores] = useState([])
  const [getMonthOfBookStores, setGetMonthOfBookStores] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
// performsearch rotası bunları istiyor
  const searchParameters = {
    bookName: "",
    searchedCity: city,
    category: "seçiniz",
    skip: 0,
    limit: 21
  }



  const CartContext = createContext();

  const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    setCartItems(prevItems => [...prevItems, book]);
  };

  // Diğer sepet işlemleri (removeFromCart, updateQuantity, etc.)

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};
  const handleAddToCart = async(item) => {
    userShoppingCardJSON = {
      bookId : item._id,
      sellerBookStoreInfos : item.bookStoreInfos[0],
      quantity : 1,
      bookName : item.name
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

  const handleToAddFavorite = async(item) => {
    userShoppingCardJSON = {
      bookId : item._id
  }
    const token = await AsyncStorage.getItem('userToken')
    console.log(token)
    if(token){
      console.log(token)
      try {
        const response = await axios.post('https://gavindevjourney.com/mobile/userAddToFavorite',userShoppingCardJSON, {
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
  useEffect(() => {

    const fetchGetMostSelledBooks = async() =>{
      try {
        const response = await axios.post('https://gavindevjourney.com/getMostSelledBooksByCity', {city}, {
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (response.status === 200) {
          setGetMostSelledBooks(response.data.mostSelledBooks)
        } else {
          setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status)
        }
      } catch (error) {
        setError('Axios hatası: ' + error.message);
      } finally {
        setIsLoading(false)
      }

    }
    fetchGetMostSelledBooks()

    const fetchgetBooksByMostPopularCategorys = async() =>{
      try {
        const response = await axios.post('https://gavindevjourney.com/getBooksByMostPopularCategory', {city}, {
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (response.status === 200) {
          setGetBooksByMostPopularCategory(response.data.books)
        } else {
          setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status)
        }
      } catch (error) {
        setError('Axios hatası: ' + error.message);
      } finally {
        setIsLoading(false)
      }

    }
    fetchgetBooksByMostPopularCategorys()
    const fetchgetgetNewlyAddedBooks = async() =>{
      try {
        const response = await axios.post('https://gavindevjourney.com/getNewlyAddedBooks', {city}, {
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (response.status === 200) {
          setGetNewlyAddedBooks(response.data.books)
        } else {
          setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status)
        }
      } catch (error) {
        setError('Axios hatası: ' + error.message);
      } finally {
        setIsLoading(false)
      }

    }
    fetchgetgetNewlyAddedBooks()
    const fetchgetgetPopularCategorys = async() =>{
      try {
        const response = await axios.post('https://gavindevjourney.com/getPopularCategorys', {city}, {
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (response.status === 200) {
          setGetPopularCategorys(response.data.popularCategorys)
        } else {
          setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status)
        }
      } catch (error) {
        setError('Axios hatası: ' + error.message);
      } finally {
        setIsLoading(false)
      }

    }
    fetchgetgetPopularCategorys()
    const fetchgetMostReliableBookStores= async() =>{
      try {
        const response = await axios.post('https://gavindevjourney.com/getMostReliableBookStores', {city}, {
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (response.status === 200) {
          setGetBooksByMostPopularCategory(response.data.mostReliableBS)
        } else {
          setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status)
        }
      } catch (error) {
        setError('Axios hatası: ' + error.message);
      } finally {
        setIsLoading(false)
      }

    }
    fetchgetMostReliableBookStores()

    const fetchgetMonthOfBookStores= async() =>{

    const orderDate = new Date()
    const year = orderDate.getFullYear();
    const month = (orderDate.getMonth() + 1).toString().padStart(2, '0')
    const yearMonth = `${year}-${month}`
      try {
        const response = await axios.post('https://gavindevjourney.com/getMonthOfBookStores', {city,date : yearMonth}, {
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (response.status === 200) {
          setGetBooksByMostPopularCategory(response.data.mostReliableBS)
        } else {
          setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status)
        }
      } catch (error) {
        setError('Axios hatası: ' + error.message);
      } finally {
        setIsLoading(false)
      }

    }
    fetchgetMonthOfBookStores()
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
      <Text style={styles.header}>en populer kategoriden kitaplar</Text>
        <FlatList
        data={getBooksByMostPopularCategory}
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
            <Text style={styles.header}>yeni eklenen kitaplar</Text>
        <FlatList
        data={getNewlyAddedBooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Image source={{ uri: "https://gavindevjourney.com"+ item.images[0].path.replace('public','') }} style={styles.bookImage} />
            <Text style={styles.bookTitle}>{item.name}</Text>
            <Text style={styles.bookPrice}>{item.bookStoreInfos[0].price} TL</Text>
        <View>
        <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
          <Text style={styles.buttonText}>sepete ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleToAddFavorite(item)}>
          <Text style={styles.buttonText}>favorilere ekle</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  flatList: {
    maxHeight: 500, // FlatList yüksekliğini sınırlayın
  },
  bookItem: {
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#f9f9f9',
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    width: 120, // Kitap öğesinin genişliğini ayarlayın
  },
  bookImage: {
    width: 100, // Resmin genişliğini ayarlayın
    height: 150, // Resmin yüksekliğini ayarlayın
    marginBottom: 5,
  },
  bookTitle: {
    fontSize: 14, // Başlık yazı boyutunu ayarlayın
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  bookPrice: {
    fontSize: 12, // Fiyat yazı boyutunu ayarlayın
    color: '#888',
    textAlign: 'center',
  },
})


export default HomeScreen;
