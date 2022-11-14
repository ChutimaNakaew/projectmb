import React, { Component, useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList } from "react-native"
import Search from "../Components/Search"
import { useFonts } from "expo-font"
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import firebase from "../Database/firebaseDB"

const AddMenu = ({ props, navigation }) => {
  const addFood = firebase.firestore().collection("user").doc("u1").collection("addFood")
  const [showMenu, setAddMenu] = useState([])
  useEffect(() => {
    addFood.orderBy("date", "desc").onSnapshot((querySnapshot) => {
      const showMenu = []
      querySnapshot.forEach((doc) => {
        const { name, kcal, id, date, img } = doc.data()
        showMenu.push({
          key: doc.id,
          name,
          kcal,
          id,
          date,
          img,
        })
      })
      setAddMenu(showMenu)
    })
  }, [])

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ backgroundColor: "#e1e8ee", flex: 2, marginTop: 50 }}>
      <Search />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AllMenu")
          }}
          style={{ backgroundColor: "lightblue", padding: 10, width: 120, borderRadius: 15, marginLeft: 30, marginVertical: 10 }}
        >
          <Text style={styles.text}>เมนูอาหาร</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: "lightblue", padding: 10, width: 120, borderRadius: 15, marginLeft: 100, marginVertical: 10 }}>
          <Text style={styles.text}>เมนูของฉัน</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.text, { textAlign: "left", margin: 10 }]}>เมนูวันนี้</Text>

      <FlatList
        data={showMenu}
        numColumns={1}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#2C2C2C",
              marginHorizontal: 30,
              marginVertical: 10,
              shadowColor: "#171717",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Image style={styles.image} source={{ uri: item.img }} />
            <View style={{ flexDirection: "column", justifyContent: "center", flex: 2, }}>
              <Text style={[styles.text, {color: "#fff"}]}>{item.name}</Text>
              <Text style={[styles.text, {color: "#fff"}]}>{item.kcal} Kcal</Text>
            </View>
            <TouchableOpacity
              style={{
                // backgroundColor: "#ff3f5b",
                // borderRadius: 50,
                // width: 39,
                // padding: 10,
                // height: 39,
                marginRight: 4,
                marginBottom: 4,
                alignSelf: "flex-end",
              }}
            >
              {/* <AntDesign name="delete" size={20} color="#fff" /> */}
              <MaterialCommunityIcons name="delete-circle" size={32} color="#ff3f5b" />
            </TouchableOpacity>
          </View>
        )}
      />
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
    resizeMode: "cover",
    flex: 2,
  },
})
export default AddMenu
