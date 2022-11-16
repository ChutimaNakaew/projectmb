import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, ScrollView, Alert } from "react-native"
import { Ionicons, AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"
import * as ImagePicker from "expo-image-picker"

const CreateMenu = ({ navigation }) => {
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)

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
    Alert.alert("Photo uploaded !")
    setImage(null)
  }

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
      <TouchableOpacity style={{ width: 120, backgroundColor: "orange" }} onPress={pickImage}>
        <Text>Add</Text>
      </TouchableOpacity>
      <View>
        {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}
        <TouchableOpacity style={{ width: 120, backgroundColor: "pink" }} onPress={uploadImage}>
          <Text>Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CreateMenu

const styles = StyleSheet.create({
  text: {
    fontFamily: "FCMuffinRegular",
    fontSize: 22,
    textAlign: "center",
  },
})
