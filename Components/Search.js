import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native"
import { ListItem, SearchBar } from "react-native-elements"
import filter from "lodash.filter"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons"

const Search = () => {
  const [food, setFood] = useState([])
  const foodRef = firebase.firestore().collection("food")
  const [input, setInput] = useState("")
  const [data, setData] = useState("")

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

  const renderItem = () => (
    <FlatList
      data={data}
      numColumns={1}
      renderItem={({ item }) => (
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#02F4C0",
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
            onPress={() => add(item)}
            // onPressIn={() => (setAddName(item.name), setAddId(item.id), setAddKcal(item.kcal), setAddImg(item.img))}
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

  // const searchFunction = (text) => {
    // if (text.length > -1 && text !== " ") {
      const updatedData = food.filter((item) => {
        const item_data = `${item.name.toUpperCase()})`
        const text_data = text.toUpperCase()
        return item_data.indexOf(text_data) > -1
      })
      setData(updatedData)
      setInput(text)
    // } else {
    //   setData("")
    // }
  // }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="ค้นหา"
        lightTheme
        round
        value={input}
        onChangeText={(text) => searchFunction(text)}
        // onClear={setData("")}
        // onCancel={setData("")}
        autoCorrect={false}
      />
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
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
