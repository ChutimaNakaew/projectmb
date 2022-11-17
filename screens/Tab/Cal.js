import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ImageBackground, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../../Database/firebaseDB"

const Cal = ({ props, navigation }) => {
  
  // const [food, setFood] = useState([])
  // const foodRef = firebase.firestore().collection("food")

  // useEffect(() => {
  //   foodRef.onSnapshot((querySnapshot) => {
  //     const food = []
  //     querySnapshot.forEach((doc) => {
  //       const { name, kcal, img } = doc.data()
  //       food.push({
  //         id: doc.id,
  //         name,
  //         kcal,
  //         img,
  //       })
  //     })
  //     setFood(food)
  //   })
  // }, [])

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


// --------------ดึงข้อมูลKcalมาแสดงผลจ้า------------------------
  const [history, setHistory] = useState([])
  const workoutRef = firebase.firestore().collection("user").doc("u1").collection("addWorkout");
  useEffect(() => {
    workoutRef.onSnapshot((querySnapshot) => {
      const history = []
      querySnapshot.forEach((doc) => {
        const { kcal } = doc.data()
        history.push({
          id: doc.id,
          kcal,
        })
      })
      setHistory(history)
    })
  }, [])
  let total = 0;
  history.forEach(item => {
    total += item.kcal
  });
  
// --------------------------------------------------------------


  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ flex: 2, marginTop: 40 }}>
      <View style={{ alignItems: "flex-end", marginTop: 10, marginRight: 10 }}>
        <TouchableOpacity
          style={{ backgroundColor: "#bbb", width: 100, padding: 10, borderRadius: 15 }}
          onPress={() => {
            navigation.navigate("HistoryMenu")
          }}
        >
          <Text style={styles.text}>ประวัติ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddMenuNavigator")
          }}
          style={{ backgroundColor: "#bbb", width: 100, padding: 10, borderRadius: 15, marginTop: 10 }}
        >
          <Text style={styles.text}>บันทึกเมนู</Text>
        </TouchableOpacity>
      </View>
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
        <Text style={[styles.text, { fontSize: 30, marginTop: 45, marginBottom: 20 }]}>{total}</Text>
        <Text style={{ borderBottomColor: "black", borderBottomWidth: 1, width: 240, alignSelf: "center" }}></Text>
        <Text style={[styles.text, { fontSize: 30, marginTop: 20 }]}>2430</Text>
      </TouchableOpacity>
      <FlatList
        data={showMenu}
        numColumns={2}
        renderItem={({ item }) => (
          <View>
            <View
              style={styles.gridItem}
              onPress={() => {
                props.onSelect()
              }}
            >
              <ImageBackground source={{ uri: item.img }} style={{ flex: 1 }} resizeMode="cover">
                <View style={[styles.container, { flexDirection: "row" }]}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.title} numberOfLines={1}>
                    { } {item.kcal} Kcal
                  </Text>
                </View>
              </ImageBackground>
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
    fontSize: 18,
    textAlign: "center",
  },
  gridItem: {
    flex: 1,
    margin: 5,
    height: 120,
    width: 185,
  },
  container: {
    flex: 1,
    // borderRadius: 10,
    // shadowColor: "black",
    // shadowOpacity: 0.26,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 10,
    // elevation: 3,
    // padding: 5,
    justifyContent: "space-between",
    alignItems: "flex-end",
    // flexWrap: "wrap",
  },
  title: {
    fontFamily: "FCMuffinRegular",
    fontSize: 16,
    textAlign: "center",
    flexWrap: "wrap",
    flex: 1,
    backgroundColor: "#rgba(217, 217, 217, 0.8)",
  },
})
export default Cal
