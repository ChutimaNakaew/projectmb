import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ImageBackground, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../../Database/firebaseDB"
import DateTimePicker from "@react-native-community/datetimepicker"

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
    addFood.orderBy("date", "desc").onSnapshot( async (querySnapshot) => {
      const showMenu = []
      await querySnapshot.forEach((doc) => {
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

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState("date")
  const [show, setShow] = useState(false)
  const [text, setText] = useState("Empty")
  const [getdate, setGetdate] = useState("")

  useEffect(() => {
    var date = new Date().getDate() //Current Date
    var month = new Date().getMonth() + 1 //Current Month
    var year = new Date().getFullYear() //Current Year
    setGetdate(date + "/" + month + "/" + year)
  }, [])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "androi")
    setDate(currentDate)

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear()
    setGetdate((getdate) => (getdate = fDate)) //---------------------วันที่ที่เลือกจะถูกเก็บค่าไว้ที่ getdate

    navigation.navigate("HistoryMenu", { fDate, total_kcal })
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const sameday = showMenu.filter((item) => {
    if (item.date !== null) {
      const date = new Date(item.date.toDate().toISOString())
      console.log(item.name + ": " + date)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const menuDate = day + "/" + month + "/" + year
      return menuDate == getdate
    }
  })

  // --------------ดึงข้อมูลKcalมาแสดงผลจ้า------------------------
  const [history, setHistory] = useState([])
  const workoutRef = firebase.firestore().collection("user").doc("u1").collection("addWorkout")
  useEffect(() => {
    workoutRef.onSnapshot((querySnapshot) => {
      const history = []
      querySnapshot.forEach((doc) => {
        const { kcal, date } = doc.data()
        history.push({
          id: doc.id,
          kcal,
          date,
        })
      })
      setHistory(history)
    })
  }, [])

  let total = 0
  
  history.forEach((item) => {
    if (item.date !== null){
    const date_kcal = new Date(item.date.toDate().toISOString())
    const year_kcal = date_kcal.getFullYear()
    const month_kcal = date_kcal.getMonth() + 1
    const dt_kcal = date_kcal.getDate()

    if (dt_kcal < 10) {
      dt_kcal = "0" + dt_kcal
    }
    if (month_kcal < 10) {
      month_kcal = "0" + month_kcal
    }
    const date_picker = dt_kcal + "/" + month_kcal + "/" + year_kcal
    if (date_picker === getdate) {
      // console.log("same")
      total += item.kcal
    }
  }
  })

  let Kcal_food = 0
  sameday.forEach((item) => {
    Kcal_food += item.kcal
  })

  let total_kcal = (Kcal_food - total).toFixed(2)
  // console.log("total " + total_kcal)

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
        {show && <DateTimePicker testID="dateTimePicket" value={date} mode={mode} is24Hour={true} display="default" onChange={onChange} />}

        <TouchableOpacity style={{ backgroundColor: "#bbb", width: 100, padding: 10, borderRadius: 15 }} onPress={() => showMode("date")}>
          <Text style={styles.text}>ประวัติ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddMenuNavigator", { screen: "AddMenu", params: { getdate } })
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
        <Text style={[styles.text, { fontSize: 30, marginTop: 45, marginBottom: 20 }]}>{total_kcal}</Text>
        <Text style={{ borderBottomColor: "black", borderBottomWidth: 1, width: 240, alignSelf: "center" }}></Text>
        <Text style={[styles.text, { fontSize: 30, marginTop: 20 }]}>2430</Text>
      </TouchableOpacity>
      <FlatList
        data={sameday}
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
                    {} {item.kcal} Kcal
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
