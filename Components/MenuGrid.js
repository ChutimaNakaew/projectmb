import React, { useEffect, useState } from "react"
import { TouchableOpacity, View, Text, StyleSheet, ImageBackground } from "react-native"
import firebase from "../Database/firebaseDB"
import { useFonts } from "expo-font"

const MenuGrid = (props) => {

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => {
        props.onSelect()
      }}
    >
      <ImageBackground source={{ uri: props.img }} style={{ flex: 1 }} resizeMode="cover">
        <View style={[styles.container, { flexDirection: "row" }]}>
          <Text style={styles.title} numberOfLines={1}>
            {props.name}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {} {props.kcal} Kcal
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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

export default MenuGrid
