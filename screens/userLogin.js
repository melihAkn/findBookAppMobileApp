import React, { useState } from 'react'
import { View, Text, Button, TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import { Picker } from "@react-native-picker/picker"
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

const UserLoginScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [physcialAdress, setPhyscialAdress] = useState('')
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState('')


  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false)
  const [selectedCity, setSelectedCity] = useState('istanbul')
  const cities = [
    { label: 'Adana', value: 'adana' },
    { label: 'Adıyaman', value: 'adiyaman' },
    { label: 'Afyonkarahisar', value: 'afyonkarahisar' },
    { label: 'Ağrı', value: 'agri' },
    { label: 'Amasya', value: 'amasya' },
    { label: 'Ankara', value: 'ankara' },
    { label: 'Antalya', value: 'antalya' },
    { label: 'Artvin', value: 'artvin' },
    { label: 'Aydın', value: 'aydin' },
    { label: 'Balıkesir', value: 'balikesir' },
    { label: 'Bilecik', value: 'bilecik' },
    { label: 'Bingöl', value: 'bingol' },
    { label: 'Bitlis', value: 'bitlis' },
    { label: 'Bolu', value: 'bolu' },
    { label: 'Burdur', value: 'burdur' },
    { label: 'Bursa', value: 'bursa' },
    { label: 'Çanakkale', value: 'canakkale' },
    { label: 'Çankırı', value: 'cankiri' },
    { label: 'Çorum', value: 'corum' },
    { label: 'Denizli', value: 'denizli' },
    { label: 'Diyarbakır', value: 'diyarbakir' },
    { label: 'Edirne', value: 'edirne' },
    { label: 'Elazığ', value: 'elazig' },
    { label: 'Erzincan', value: 'erzincan' },
    { label: 'Erzurum', value: 'erzurum' },
    { label: 'Eskişehir', value: 'eskisehir' },
    { label: 'Gaziantep', value: 'gaziantep' },
    { label: 'Giresun', value: 'giresun' },
    { label: 'Gümüşhane', value: 'gumushane' },
    { label: 'Hakkari', value: 'hakkari' },
    { label: 'Hatay', value: 'hatay' },
    { label: 'Isparta', value: 'isparta' },
    { label: 'Mersin', value: 'mersin' },
    { label: 'İstanbul', value: 'istanbul' },
    { label: 'İzmir', value: 'izmir' },
    { label: 'Kars', value: 'kars' },
    { label: 'Kastamonu', value: 'kastamonu' },
    { label: 'Kayseri', value: 'kayseri' },
    { label: 'Kırklareli', value: 'kirklareli' },
    { label: 'Kırşehir', value: 'kirsehir' },
    { label: 'Kocaeli', value: 'kocaeli' },
    { label: 'Konya', value: 'konya' },
    { label: 'Kütahya', value: 'kutahya' },
    { label: 'Malatya', value: 'malatya' },
    { label: 'Manisa', value: 'manisa' },
    { label: 'Kahramanmaraş', value: 'kahramanmaras' },
    { label: 'Mardin', value: 'mardin' },
    { label: 'Muğla', value: 'mugla' },
    { label: 'Muş', value: 'mus' },
    { label: 'Nevşehir', value: 'nevsehir' },
    { label: 'Niğde', value: 'nigde' },
    { label: 'Ordu', value: 'ordu' },
    { label: 'Rize', value: 'rize' },
    { label: 'Sakarya', value: 'sakarya' },
    { label: 'Samsun', value: 'samsun' },
    { label: 'Siirt', value: 'siirt' },
    { label: 'Sinop', value: 'sinop' },
    { label: 'Sivas', value: 'sivas' },
    { label: 'Tekirdağ', value: 'tekirdag' },
    { label: 'Tokat', value: 'tokat' },
    { label: 'Trabzon', value: 'trabzon' },
    { label: 'Tunceli', value: 'tunceli' },
    { label: 'Şanlıurfa', value: 'sanliurfa' },
    { label: 'Uşak', value: 'usak' },
    { label: 'Van', value: 'van' },
    { label: 'Yozgat', value: 'yozgat' },
    { label: 'Zonguldak', value: 'zonguldak' },
    { label: 'Aksaray', value: 'aksaray' },
    { label: 'Bayburt', value: 'bayburt' },
    { label: 'Karaman', value: 'karaman' },
    { label: 'Kırıkkale', value: 'kirikkale' },
    { label: 'Batman', value: 'batman' },
    { label: 'Şırnak', value: 'sirnak' },
    { label: 'Bartın', value: 'bartin' },
    { label: 'Ardahan', value: 'ardahan' },
    { label: 'Iğdır', value: 'igdir' },
    { label: 'Yalova', value: 'yalova' },
    { label: 'Karabük', value: 'karabuk' },
    { label: 'Kilis', value: 'kilis' },
    { label: 'Osmaniye', value: 'osmaniye' },
    { label: 'Düzce', value: 'duzce' },
  ]

  const handleLogin =async () => {
    if(username.length > 3 && password.length > 8){
      try {
        const response = await axios.post('https://gavindevjourney.com/mobile/userLogin',{username,password}, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (response.status === 200) {
          alert("giriş başarılı")
          const token = response.data.token
          await AsyncStorage.setItem('userToken', token)
          navigation.navigate('Home')
          setTimeout(() => {
            setIsRegistering(false)
          }, 2000);
  
        } else {
          setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status);
        }
      } catch (error) {
        const statusCode = error.message.split(" ")[error.message.split(" ").length - 1]
        if(statusCode == "400"){
          alert("kullanıcı adı veya şifre yanlış")
        }else if(statusCode == "401"){
          alert("kullanıcı adı veya şifre yanlış")
        }
        else{
          console.log(error)
          alert("server error")
        }
      }
    }else{
      alert("kullanıcı adı en az 3 karakter ve şifre en az 8 karakter olmalı")
    }
    
  }

  const handleRegister = async () => {
   if(password === passwordAgain && phoneNumber.length > 10 && phoneNumber.length < 14){
    console.log("şifree")
    try {
      const response = await axios.post('https://gavindevjourney.com/userRegister',{ name,surname,username,password,email,city : selectedCity,phoneNumber,physcialAddress : physcialAdress}, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        alert("kayıt başarılı")
        setTimeout(() => {
          setIsRegistering(false)
        }, 2000);

      } else {
        setError('Sunucudan beklenmeyen bir yanıt alındı: ' + response.status);
      }
    } catch (error) {
      console.log(error)
      setError('Axios hatası: ' + error.message);
    }
   }else{
    alert("şifreler uyuşmuyor")
   }


  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Kayıt Ol' : 'Kullanıcı Girişi'}</Text>

      {!isRegistering && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Kullanıcı Adı"
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            secureTextEntry
            onChangeText={setPassword}
            onValueChange={setPassword}
          />
          <Button title="Giriş Yap" onPress={handleLogin} />
        </>
      )}

      {/* Kayıt Formu */}
      {isRegistering && (
        <>
          {/* Kayıt için gerekli input alanları */}
          <Text>ad</Text>
          <TextInput
            style={styles.input}
            placeholder="ad"
            onChangeText={setName}
          />
             <Text>soyad</Text>
          <TextInput
            style={styles.input}
            placeholder="soyad"
            onChangeText={setSurname}
          />
          <Text>kullanıcı adı</Text>
          <TextInput
            style={styles.input}
            placeholder="kullancı adı"
            onChangeText={setUsername}
          />
          <Text>email adresi</Text>
          <TextInput
            style={styles.input}
            placeholder="email adresi"
            onChangeText={setEmail}
          />
         
          <Text style={styles.label}>Şehir Seçin:</Text>
          <Picker
            selectedValue={selectedCity}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
          >
        {cities.map((city) => (
          <Picker.Item key={city.value} label={city.label} value={city.value} />
        ))}
      </Picker>
          <Text>telefon numarası</Text>
          <TextInput
            style={styles.input}
            placeholder="telefon numarası"
            maxLength={14}
            keyboardType="numeric"
            onChangeText={setPhoneNumber}
          />
            <Text>fiziksel adres</Text>
          <TextInput
            style={styles.input}
            placeholder="fiziksel adres"
            onChangeText={setPhyscialAdress}
          />
          <Text>şifre</Text>
          <TextInput
            style={styles.input}
            placeholder="şifre"
            secureTextEntry
            onChangeText={setPassword}
          />
          <Text>tekrar şifre</Text>
          <TextInput
            style={styles.input}
            placeholder="tekrar şifre"
            secureTextEntry
            onChangeText={setPasswordAgain}
          />
          <Button title="Kayıt Ol" onPress={handleRegister} />
        </>
      )}

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.registerLink}>
          {isRegistering ? 'Zaten hesabınız var mı? Giriş Yap' : 'Hesabınız yok mu? Kayıt Ol'}
        </Text>
      </TouchableOpacity>
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
export default UserLoginScreen
