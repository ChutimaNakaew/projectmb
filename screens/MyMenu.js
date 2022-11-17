import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, ScrollView } from "react-native"
import { Ionicons, AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"
// import { SearchBar } from "react-native-elements"

const MyMenu = ({ navigation }) => {
  const [input, setInput] = useState("")
  const [showMenu, setShowMenu] = useState("")
  const myMenu = firebase.firestore().collection("user").doc("u1").collection("myMenu")
  const addFood = firebase.firestore().collection("user").doc("u1").collection("addFood")
  // const [data, setData] = useState("")
  const [food, setFood] = useState([])

  // useEffect(()=>{
  //   if(data == ""){
  //     return setData(food)
  //   } 
  // })

  useEffect(() => {
    myMenu.onSnapshot((querySnapshot) => {
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

  const add = (item) => {
    // check have this menu
    if (item.name && item.id && item.kcal && item.img) {
      // get timestamp
      const timestamp = firebase.firestore.FieldValue.serverTimestamp()
      const data = {
        name: item.name,
        date: timestamp,
        kcal: item.kcal,
        id: item.id,
        img: item.img,
      }
      addFood
        .add(data)
        .then(() => {
          console.log("Add " + item.name)
          alert("✅ เพิ่มเมนู " + "'" + item.name + "'")
        })
        .catch((err) => {
          alert(err)
        })
    }
  }

  const delMenu = (item) => {
    myMenu
      .doc(item.id)
      .delete()
      .then(() => {
        console.log("Delete " + item.name)
        alert("❌ ลบเมนู " + "'" + item.name + "'")
      })
      .catch((err) => {
        alert(err)
      })
  }

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ flex: 2, backgroundColor: "#e1e8ee" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CreateMenu")
        }}
        style={{ backgroundColor: "#D9D9D9", padding: 10, width: 120, borderRadius: 15, marginRight: 10, marginVertical: 10, alignSelf: "flex-end" }}
      >
        <Text style={styles.text}>สร้างเมนู</Text>
      </TouchableOpacity>

      <FlatList
        data={food}
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
            <View style={{ justifyContent: "space-between" }}>
              <TouchableOpacity
                onPress={() => add(item)}
                style={{
                  marginRight: 4,
                  marginTop: 4,
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                }}
              >
                <FontAwesome5 name="plus-circle" size={26} color="#61B15A" />
              </TouchableOpacity>
              <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("UpdateMyMenu", {item})}
                  style={{
                    marginRight: 4,
                    marginBottom: 4,
                    alignContent: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <MaterialCommunityIcons name="pencil-circle" size={32} color="#4a88da" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => delMenu(item)}
                  style={{
                    marginRight: 4,
                    marginBottom: 4,
                    alignContent: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <MaterialCommunityIcons name="delete-circle" size={32} color="#ff3f5b" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default MyMenu

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
