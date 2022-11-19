import React from "react";
import { StyleSheet, ImageBackground, Image, View, Text, TextInput, KeyboardAvoidingView, ScrollView, Button, Pressable} from "react-native";
import { useFonts } from 'expo-font';

const LoginPage = () => {
  const [fontsLoaded] = useFonts({
    'FCMuffinRegular': require('../assets/fonts/FCMuffinRegular.otf'),
  });
  return (
    <View style={styles.container}>
      {/* ใส่พื้นหลัง */}
      <ImageBackground source={require("../assets/ImageBackground/loginPageBG.png")} resizeMode="cover" style={styles.image}>
      
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.boxInfo}
    >
      <Text style={styles.textTitle}>ลงชื่อเข้าใช้</Text>
      <ScrollView style={styles.scrollView}>
      <Image
        style={styles.logo}
        source={require('../assets/WORKY_LOGO.gif')}
      />

      <Text style={styles.textNomal}>อีเมล</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="อีเมล"
      />

<Text style={styles.textNomal}>รหัสผ่าน</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Password"
      />

      <Pressable style={styles.button}>
      <Text style={styles.textButton}>เข้าสู่ระบบ</Text>
      </Pressable>

      </ScrollView>
      
      </KeyboardAvoidingView>

      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo:{
    width: 270,
    height: 270,
    alignSelf: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  boxInfo: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    flex: 0.82,
    width: "85%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "lightblue",
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    fontFamily: "FCMuffinRegular",
  },
  textTitle: {
    fontFamily: "FCMuffinRegular",
    fontSize: 60,
    marginTop: 20,
  },
  textNomal: {
    fontFamily: "FCMuffinRegular",
    fontSize: 25,
    marginBottom: 0,
    alignSelf: "flex-start",
    marginHorizontal: 12
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
  }
});
export default LoginPage;