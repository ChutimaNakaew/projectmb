import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList } from "react-native"
import Search from "../Components/Search"
import { useFonts } from "expo-font"
import { AntDesign } from "@expo/vector-icons"

const AddMenu = (props) => {
  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ backgroundColor: "#e1e8ee" }}>
      <Search />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ backgroundColor: "lightblue", padding: 10, width: 120, borderRadius: 15, marginLeft: 30, marginVertical: 10 }}>
          <Text style={styles.text}>เมนูอาหาร</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: "lightblue", padding: 10, width: 120, borderRadius: 15, marginLeft: 100, marginVertical: 10 }}>
          <Text style={styles.text}>เมนูของฉัน</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.text, { textAlign: "left", margin: 10 }]}>เมนูวันนี้</Text>
      <View style={{ flexDirection: "row", backgroundColor: "#bbb", marginHorizontal: 20 }}>
        <Image
          style={styles.image}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/image.png?alt=media&token=1ad0bab8-1854-495d-94ad-910a53961d55",
          }}
        />
        <View style={{ flexDirection: "column", justifyContent: "center", flex: 2 }}>
          <Text style={[styles.text, { marginLeft: 0 }]}>ข้าวผัดกะเพรา</Text>
          <Text style={[styles.text, { marginLeft: 0 }]}>450 Kcal</Text>
        </View>
        <TouchableOpacity style={{backgroundColor: "#ff3f5b", borderRadius: 50, width: 39, padding: 10, height: 39, marginRight: 4, marginBottom: 4, alignSelf: "flex-end"}}>
          <AntDesign name="delete" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "FCMuffinRegular",
    fontSize: 22,
    textAlign: "center",
  },
  image: {
    width: 180,
    height: 200,
    // resizeMode: "contain",
    // borderRadius: 50,
    // marginBottom: -70,
  },
})
export default AddMenu
