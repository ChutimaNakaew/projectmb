import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ImageBackground, ScrollView, Image } from "react-native"
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"
// import { Timestamp } from "@firebase/firestore";

const HistoryMenu = ({ props, route }) => {
  // const thisday = new Date(route.params.currentDate)
  const total_kcal = route.params.total_kcal
  const thisday = route.params.fDate
  // const day = Timestamp.fromDate(new Date()).toDate();
  // console.log("thisday " + thisday + "/" + total_kcal)
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

  const sameday = showMenu.filter((item) => {
    const date = new Date(item.date.toDate().toISOString())
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const menuDate = day + "/" + month + "/" + year
    return menuDate == thisday
  })

  return (
    <View style={[styles.text, { flex: 2 }]}>
      <TouchableOpacity
        style={{
          backgroundColor: "lightpink",
          width: 250,
          height: 250,
          borderRadius: 200,
          alignSelf: "center",
          margin: 10,
          borderColor: "#f25e97",
          borderWidth: 5,
        }}
      >
        <Text style={[styles.text, { fontSize: 30, marginTop: 45, marginBottom: 20 }]}>{total_kcal}</Text>
        <Text style={{ borderBottomColor: "black", borderBottomWidth: 1, width: 240, alignSelf: "center" }}></Text>
        <Text style={[styles.text, { fontSize: 30, marginTop: 20 }]}>2430</Text>
      </TouchableOpacity>

      <FlatList
        data={sameday}
        numColumns={1}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#ccc",
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
              <Text style={[styles.text, { color: "#000" }]}>{item.name}</Text>
              <Text style={[styles.text, { color: "#000" }]}>{item.kcal} Kcal</Text>
            </View>
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
export default HistoryMenu
