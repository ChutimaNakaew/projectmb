import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { useFonts } from "expo-font"
// import คอมโพเนนต์ที่จำเป็น

import MyNavigator from "./navigation/MyNavigator"
import Login from "./screens/LoginPage"
import Signup from "./screens/SignupPage";

export default function App() {
  // เพิ่มโค้ดส่วนนี้ เพื่อจัดการ Stack Navigation
  return (
    <MyNavigator/>
    // <Login />
    // <Signup/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
})
