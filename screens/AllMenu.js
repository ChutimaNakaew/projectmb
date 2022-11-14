import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, ScrollView } from "react-native"
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"

const AllMenu = ({ props, navigation }) => {
  const [food, setFood] = useState([])
  const foodRef = firebase.firestore().collection("food")
  const addFood = firebase.firestore().collection("user").doc("u1").collection("addFood")
  const [addName, setAddName] = useState("")
  const [addKcal, setAddKcal] = useState(0)
  const [addId, setAddId] = useState("")
  const [addImg, setAddImg] = useState("")

  useEffect(() => {
    foodRef.onSnapshot((querySnapshot) => {
      const food = []
      querySnapshot.forEach((doc) => {
        const { name, kcal, img } = doc.data()
        food.push({
          id: doc.id,
          name,
          kcal,
          img,
        })
      })
      setFood(food)
    })
  }, [])

  const add = () => {
    // check have this menu
    if (addName && addId && addKcal && addImg) {
      // get timestamp
      const timestamp = firebase.firestore.FieldValue.serverTimestamp()
      const data = {
        name: addName,
        date: timestamp,
        kcal: addKcal,
        id: addId,
        img: addImg,
      }
      addFood
        .add(data)
        .then(() => {
          setAddName("")
          setAddId("")
          setAddKcal(0)
          setAddImg("")
          console.log("Add " + addName)
        })
        .catch((err) => {
          alert(err)
        })
    }
  }

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <FlatList
      data={food}
      numColumns={1}
      renderItem={({ item }) => (
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#F2F4C0",
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
          <View style={{ flexDirection: "column", justifyContent: "center", flex: 2 }}>
            <Text style={[styles.text, { marginLeft: 0 }]}>{item.name}</Text>
            <Text style={[styles.text, { marginLeft: 0 }]}>{item.kcal} Kcal</Text>
          </View>
          <TouchableOpacity
            onPressOut={add}
            onPressIn={() => (setAddName(item.name), setAddId(item.id), setAddKcal(item.kcal), setAddImg(item.img))}
            style={{
              marginRight: 5,
              marginTop: 5,
              alignSelf: "flex-start",
            }}
          >
            <FontAwesome5 name="plus-circle" size={24} color="#61B15A" />
          </TouchableOpacity>
        </View>
      )}
    />
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
export default AllMenu
