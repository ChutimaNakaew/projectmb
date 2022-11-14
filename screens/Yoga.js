import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"

const Yoga = ({ props, navigation }) => {
  const [yoga, setYoga] = useState([])
  const workoutRef = firebase.firestore().collection('workout').doc('XXVlurGq69GuDCTFmCU2').collection('exercise').doc('Yoga').collection('Yoga_posture')

  useEffect(() => {
    workoutRef.onSnapshot((querySnapshot) => {
      const yoga = []
      querySnapshot.forEach((doc) => {
        const { posture_name, kcal, id, image, video } = doc.data()
        yoga.push({
          id: doc.id,
          posture_name,
          kcal,
          id,
          image,
          video,
        })
      })
      setYoga(yoga)
    })
  }, [])

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View>
       {/* <ScrollView > */}
       <FlatList
          data={yoga}
          // scrollEnabled={false}
          numColumns={2}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={styles.gridItem}
                onPress={() => { navigation.navigate("Video_posture", { postureId: item.id, postureName: item.posture_name, postureVideo: item.video, postureKcal: item.kcal }) }}
              >
                <Text numberOfLines={1} style={styles.title}>
                      {item.posture_name}
                    </Text>
                <ImageBackground source={{ uri: item.image }} style={styles.img_bg} resizeMode='stretch'>
                  <View style={[styles.container, { flexDirection: "row" }]}>
                    {/* <Text style={styles.title} numberOfLines={1}>
                      {item.posture_name}
                    </Text> */}
                    {/* <Text style={styles.title} numberOfLines={1}>
                      {} {item.kcal} Kcal
                    </Text> */}
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          )}
        />
       {/* </ScrollView> */}
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
    height: 200,
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
    // marginBottom:20
    // flexWrap: "wrap",
  },
  title: {
    fontFamily: "FCMuffinRegular",
    fontSize: 25,
    textAlign: "center",
    flexWrap: "wrap",
    // marginBottom:10,
    // flex: 1,
    // backgroundColor: "#rgba(217, 217, 217, 0.8)",
  },
  img_bg:{
    flex: 1 ,
    width:180,
    height:150
  },
  
})
export default Yoga