import React, { useState } from 'react';
import { StyleSheet, ImageBackground, Image, View,TouchableOpacity, Text, TextInput, KeyboardAvoidingView, ScrollView, Button, Pressable} from "react-native";
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import firebase from "../Database/firebaseDB";
import uuid from 'react-uuid';


const SignupPage = ({navigation}) => {
  let [fontsLoaded] = useFonts({
    'FCMuffinRegular': require('../assets/fonts/FCMuffinRegular.otf'),
  });

  const [info, setInfo] = useState({username:"", email:"", password:"", uuid: uuid()});
  const [username, setUsername] = useState("");

  const dbRef = firebase.firestore().collection('user');

  const InputValueUpdate = (val, props) =>{
    info[props] = val;
    setInfo(info)
    console.log(info)
  }

  const StoreUser = () =>{
    console.log("เข้าแล้วจ้า")
    if (info.username == "") {
      alert('Please fill username');
    }else {
      dbRef.add({
        username: info.username,
        email: info.email,
        password: info.password,
        uuid: info.uuid
      })
      navigation.navigate('QuestionSexPage')
    }
    } 


  return (
    <View style={styles.container}>
      {/* ใส่พื้นหลัง */}
      <ImageBackground source={require("../assets/ImageBackground/loginPageBG.png")} resizeMode="cover" style={styles.image}>

      <Pressable style={styles.buttonBack} onPress={() => navigation.navigate('FristScreen')}>
      <AntDesign name="arrowleft" size={40} color="white" />
      </Pressable>
      
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.boxInfo}
    >
      <Text style={styles.textTitle}>สมัครสมาชิก</Text>
      <ScrollView style={styles.scrollView}>
      <Image
        style={styles.logo}
        source={require('../assets/WORKY_LOGO.gif')}
      />

<Text style={styles.textNomal}>ชื่อผู้ใช้</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="ชื่อผู้ใช้"
        onChangeText={val => InputValueUpdate(val, 'username')}
      />

      <Text style={styles.textNomal}>อีเมล</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="อีเมล"
        onChangeText={val => InputValueUpdate(val, 'email')}
      />

<Text style={styles.textNomal}>รหัสผ่าน</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="รหัสผ่าน"
        onChangeText={(val) => InputValueUpdate(val, 'password')}
      />

      <TouchableOpacity style={styles.button}
      onPress={() => StoreUser()} >
      <Text style={styles.textButton}>ลงทะเบียน</Text>
      </TouchableOpacity>

      </ScrollView>
      </KeyboardAvoidingView>

      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginBottom: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  boxInfo: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    flex: 0.9,
    width: "85%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#F2DE77",
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    textColor: "balck",
    marginTop: 10,
    fontFamily: "FCMuffinRegular",
  },
  textTitle: {
    fontFamily: "FCMuffinRegular",
    fontSize: 60,
    marginBottom: 10,
    marginTop: 10,
  },
  textNomal: {
    fontFamily: "FCMuffinRegular",
    fontSize: 25,
    marginBottom: 0,
    alignSelf: "flex-start",
    marginHorizontal: 12,
  },
  textButton: {
    fontFamily: "FCMuffinRegular",
    fontSize: 25,
    marginBottom: 0,
    alignSelf: "center",
  },
  scrollView: {
    height: "100%",
    width: "100%",
  },
  TextInput: {
    height: 40,
    width: "90%",
    marginTop: 2,
    marginHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "lightgrey",
    fontFamily: "FCMuffinRegular",
  },
  buttonBack: {
    backgroundColor: "black",
    width: 70,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    textColor: "balck",
    marginTop: 10,
    fontFamily: "FCMuffinRegular",
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
})
export default SignupPage
