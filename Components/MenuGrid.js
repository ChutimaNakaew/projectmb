import React from "react"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { useFonts, Kodchasan_400Regular } from "@expo-google-fonts/kodchasan"

const MenuGrid = (props) => {
  let [fontsLoaded] = useFonts({
    Kodchasan_400Regular,
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
      <View style={{ ...styles.container, ...{ backgroundColor: props.color }, flexDirection: "row" }}>
        <Text style={styles.title} numberOfLines={2}>
          {props.title}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {props.id}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,
    height: 120,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 5,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "Kodchasan_400Regular",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
})

export default MenuGrid
