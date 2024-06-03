import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const token = await AsyncStorage.getItem('userToken'); // Token'ı al
  
          const response = await axios.get('https://gavindevjourney.com/mobile/getUserOrders', {
            headers: { Authorization: `Bearer ${token}` } // Token'ı header'a ekle
          });
          console.log(response.data)
          console.log("siparişteki ürünler")
          console.log(response.data[0].items)
  
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
          // Hata durumunda kullanıcıya bilgi verilebilir (Alert vb.)
        }
      };
  
      fetchOrders();
    }, []);
  
    const cancelOrder = async (orderId) => {
      try {
        const token = await AsyncStorage.getItem('userToken');
  
        await axios.delete(`https://gavindevjourney.com/mobile/getUserOrders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        setOrders(orders.filter(order => order.id !== orderId));
      } catch (error) {
        console.error('Error cancelling order:', error);
        // Hata durumunda kullanıcıya bilgi verilebilir
      }
    };

  const renderItem = ({ item }) => {
    const totalPrice = item.items.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
    return (
    <View style={styles.orderItem}>
      <View style={styles.orderDetails}>
        <Text>Sipariş Tarihi: {item.orderDate.slice(0,10)} {item.orderDate.slice(11,16)}</Text>
        <Text>Ödeme Yöntemi: {item.paymentMethod}</Text>
        <Text>Kitapçı: {item.bookstoreName}</Text>
        <Text>Adres: {item.bookstorePhyscialAddress}</Text>
        <Text>sipariş durumu {item.orderStatus}</Text>
        <Text>Ürünler:</Text>
        {item.items.map((product, index) => (
          <Text key={index}>- {product.bookName} {product.price} tl (Miktar: {product.quantity} toplam fiyat {product.quantity * product.price })</Text> // Ürün adı ve miktarı
        ))}
        <Text>toplam fiyat {totalPrice} </Text>
          <Text> bu mağazaya puanınız</Text>
        <TextInput
            style={styles.ratingInput}
            keyboardType="numeric"
            placeholder="Puan (1-5)"
          />
          
      </View>
      <TouchableOpacity onPress={() => cancelOrder(item.id)}>
        <Text style={styles.cancelButton}>İptal Et</Text>
      </TouchableOpacity>
    </View>
  )}

  return (
    <FlatList
      data={orders}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  orderDetails: {
    fontSize: 16,
  },
  cancelButton: {
    color: 'red',
  },
  listContainer: {
    padding: 10,
  }
});

export default OrdersScreen;
