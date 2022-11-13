import React from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useFonts } from "expo-font";

import { CATEGORIES } from "../../data/dummy-data"
import MenuGrid from "../../Components/MenuGrid"

const Cal = ({ props, navigation }) => {
  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  const renderGridItem = (itemData) => {
    return (
      <MenuGrid
        id={itemData.item.id}
        title={itemData.item.title}
        color={itemData.item.color}
      />
    )
  }

  return (
    <View>
      <View style={{ alignItems: "flex-end", marginTop: 50, marginRight: 10 }}>
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
            navigation.navigate("AddMenu")
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
        <Text style={[styles.text, { fontSize: 30, marginTop: 45, marginBottom: 20 }]}>XXX</Text>
        <Text style={{ borderBottomColor: "black", borderBottomWidth: 1, width: 240, alignSelf: "center" }}></Text>
        <Text style={[styles.text, { fontSize: 30, marginTop: 20 }]}>2430</Text>
      </TouchableOpacity>

      <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={3} />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "FCMuffinRegular",
    fontSize: 18,
    textAlign: "center",
  },
})
export default Cal
