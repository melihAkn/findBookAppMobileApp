import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
function UpdateProfileScreen() {
    const [userInfo, setUserInfo] = useState({
    nameAndSurname: "",
    username : "",
    email : "",
    password : "",
    phoneNumber : "",
    physcialAddress : ""
  })

  useEffect(() => {
    const fetchUserInfo = async () => {
        const token = await AsyncStorage.getItem('userToken')
        console.log(token)
      try {
        const response = await axios.get('https://gavindevjourney.com/mobile/getUserInfos', {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        if (response.status === 200) {
            console.log(response.data)
          setUserInfo({
            nameAndSurname: response.data.nameAndSurname,
            username : response.data.username,
            email : response.data.email,
            phoneNumber : response.data.phoneNumber,
            physcialAddress : response.data.physcialAddress
          })
        } else {
          console.error('Sunucudan beklenmeyen bir yanıt alındı:', response.data)
        }
      } catch (error) {
        console.error(error)
        alert("Profil bilgileri yüklenirken bir hata oluştu.")
      }
    }

    fetchUserInfo()
  }, [])
  const handleUpdateInfos = async () => {
    const token = await AsyncStorage.getItem('userToken')
    if(userInfo.phoneNumber.length > 10 && userInfo.phoneNumber.length < 14 && userInfo.nameAndSurname.length > 3 && userInfo.physcialAddress.length > 3 && userInfo.username.length > 3 && userInfo.password.length > 8){
     try {
       const response = await axios.post('https://gavindevjourney.com/mobile/UpdateInfos',userInfo, {
         headers: {
            Authorization: `Bearer ${token}`,
           "Content-Type": "application/json"
         }
       })
       console.log("asda")
       if (response.status === 200) {
         alert("kayıt başarılı")
         console.log(response.data)
 
       }else {
        alert(response.data)
        console.log("hata var")
         setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status);
       }
     } catch (error) {
      let errorCode = error.message.split(" ")[error.message.split(" ").length - 1]
      if(errorCode == "401"){
        alert("şifre yanlış")
        console.log("şifre yanlış")
      }
       console.log()
     }
    }else{
     alert("girilen alanlardan biri ve ya birkaçı gerekli uzunlukta değil")   
    }
   }

  return (
    <View style={styles.container}>
      <Text>Ad soyad:</Text>
      <TextInput
        style={styles.input}
        value={userInfo.nameAndSurname}
        onChangeText={(text) => setUserInfo({ ...userInfo, nameAndSurname: text })} 
      />
          <Text>kullanıcı adı:</Text>
      <TextInput
        style={styles.input}
        value={userInfo.username}
        onChangeText={(text) => setUserInfo({ ...userInfo, username: text })} 
      />
      <Text>email:</Text>
        <TextInput
        style={styles.input}
        value={userInfo.email}
        onChangeText={(text) => setUserInfo({ ...userInfo, email: text })} 
      />
         <Text>mevcut şifre:</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => setUserInfo({ ...userInfo, password: text })} 
      />
       <Text>telefon numarası:</Text>
      <TextInput
        style={styles.input}
        value={userInfo.phoneNumber}
        onChangeText={(text) => setUserInfo({ ...userInfo, phoneNumber: text })} 
      />

      <Text>fiziksel adres:</Text>
      <TextInput
        style={styles.input}
        value={userInfo.physcialAddress} 
        onChangeText={(text) => setUserInfo({ ...userInfo, physcialAddress: text })}
      />
        <Button title="bilgileri güncelle" onPress={handleUpdateInfos} />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    registerLink: {
      marginTop: 15,
      color: 'blue',
    },
    picker: {
      height: 50,
      width: 200,
    },
    itemStyle: {
      fontSize: 18,
      color: 'blue',
    },
  })

export default UpdateProfileScreen;
