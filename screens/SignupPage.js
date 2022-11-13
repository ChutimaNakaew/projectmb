import React from "react"
import { StyleSheet, ImageBackground, Image, View, Text, TextInput, KeyboardAvoidingView, ScrollView, Button, Pressable } from "react-native"
import { useFonts } from "expo-font"
import { AntDesign } from "@expo/vector-icons"

const SignupPage = () => {

  let [fontsLoaded] = useFonts({
    'FCMuffinRegular': require('../assets/fonts/FCMuffinRegular.otf'),
  });

  return (
    <View style={styles.container}>
      {/* ใส่พื้นหลัง */}
      <ImageBackground source={require("../assets/ImageBackground/loginPageBG.png")} resizeMode="cover" style={styles.image}>
        <Pressable style={styles.buttonBack}>
          <AntDesign name="arrowleft" size={40} color="white" />
        </Pressable>

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.boxInfo}>
          <Text style={styles.textTitle}>สมัครสมาชิก</Text>
          <ScrollView style={styles.scrollView}>
            <Image style={styles.logo} source={require("../assets/WORKY_LOGO.gif")} />

            <Text style={styles.textNomal}>ชื่อผู้ใช้</Text>
            <TextInput style={styles.TextInput} placeholder="ชื่อผู้ใช้" />

            <Text style={styles.textNomal}>อีเมล</Text>
            <TextInput style={styles.TextInput} placeholder="อีเมล" />

            <Text style={styles.textNomal}>รหัสผ่าน</Text>
            <TextInput style={styles.TextInput} placeholder="รหัสผ่าน" />

            <Pressable style={styles.button}>
              <Text style={styles.textButton}>ลงทะเบียน</Text>
            </Pressable>
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
    width: 270,
    height: 270,
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
    // zIndex: -1,
    // position: "relative",
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
    textColor: "balck",
    marginTop: 10,
    fontFamily: "FCMuffinRegular",
  },
  textTitle: {
    fontFamily: "FCMuffinRegular",
    fontSize: 60,
    // fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  textNomal: {
    fontFamily: "FCMuffinRegular",
    fontSize: 25,
    marginBottom: 0,
    // fontWeight: 'bold',
    alignSelf: "flex-start",
    marginHorizontal: 12,
  },
  textButton: {
    fontFamily: "FCMuffinRegular",
    fontSize: 25,
    marginBottom: 0,
    // fontWeight: 'bold',
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
