import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, ScrollView, Alert } from "react-native"
import { Ionicons, AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"
import * as ImagePicker from "expo-image-picker"

const CreateMenu = ({ navigation }) => {
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [show, setShow] = useState(true)
  const [inputName, setInputName] = useState("")
  const [inputCal, setInputCal] = useState(0)
  // const [food, setFood] = useState([])
  const myMenu = firebase.firestore().collection("user").doc("u1").collection("myMenu")

  // useEffect(() => {
  //   myMenu.onSnapshot((querySnapshot) => {
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

  const add = () => {
    const name = inputName
    const cal = Number(inputCal)
    const img = image
    // check have this menu
    if (name && cal && img) {
      // get timestamp
      const timestamp = firebase.firestore.FieldValue.serverTimestamp()
      const data = {
        name: name,
        date: timestamp,
        kcal: cal,
        img: img.uri,
      }
      myMenu
        .add(data)
        .then(() => {
          console.log("Add " + name)
          alert("✅ เพิ่มเมนู " + "'" + name + "'")
          navigation.navigate("MyMenu")
        })
        .catch((err) => {
          alert(err)
        })
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    const source = { uri: result.uri }
    console.log(source)
    setImage(source)
  }

  const uploadImage = async () => {
    setUploading(true)
    const response = await fetch(image.uri)
    const blob = await response.blob()
    const fileName = image.uri.substring(image.uri.lastIndexOf("/") + 1)
    var ref = firebase.storage().ref().child(fileName).put(blob)

    try {
      await ref
    } catch (e) {
      console.log(e)
    }
    setUploading(false)
    // Alert.alert("Photo uploaded !")
    setImage(null)
  }

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      {show ? (
        <TouchableOpacity onPressIn={pickImage} onPressOut={() => setShow(!show)}>
          <Image style={{ width: 320, height: 200 }} source={{ uri: "https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg" }} />
        </TouchableOpacity>
      ) : null}
      <View>
        {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}
        <Text style={[styles.text, { textAlign: "left", marginTop: 15 }]}>ชื่อเมนู</Text>
        <TextInput
          onChangeText={(text) => setInputName(text)}
          style={[styles.text, { width: 320, backgroundColor: "#ddd", padding: 10, borderRadius: 20, marginVertical: 5 }]}
        ></TextInput>

        <Text style={[styles.text, { textAlign: "left" }]}>ปริมาณแคลอรี่</Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            onChangeText={(num) => setInputCal(num)}
            keyboardType="numeric"
            style={[styles.text, { width: 220, backgroundColor: "#ddd", padding: 10, borderRadius: 20, marginVertical: 5 }]}
          ></TextInput>
          <Text style={[styles.text, { width: 95, backgroundColor: "#ddd", padding: 10, borderRadius: 20, marginLeft: 5, marginVertical: 5 }]}>
            Kcal
          </Text>
        </View>
        <TouchableOpacity
          style={{ width: 320, backgroundColor: "#ddd", padding: 10, borderRadius: 20, marginVertical: 5 }}
          onPressIn={uploadImage}
          onPressOut={add}
        >
          <Text style={styles.text}>สร้างเมนู</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CreateMenu

const styles = StyleSheet.create({
  text: {
    fontFamily: "FCMuffinRegular",
    fontSize: 24,
    textAlign: "center",
  },
})
