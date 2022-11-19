import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { useFonts } from "expo-font"
// import คอมโพเนนต์ที่จำเป็น

import MyNavigator from "./navigation/MyNavigator"
import Login from "./screens/LoginPage"
import Signup from "./screens/SignupPage";
import TallPage from "./screens/QuestionTallPage";
import QuestionAgePage from "./screens/QuestionAgePage";
import QuestionActivityPage from "./screens/QuestionActivityPage";
import FristScreensNavigator from "./navigation/FristScreensNavigator";
import FristScreen from "./screens/FristScreen";
import AllUser from "./screens/AllUser";
import AddminFood from "./screens/AddminFood";
import AddminNavigator from "./navigation/AddminNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    'FCMuffinRegular': require('./assets/fonts/FCMuffinRegular.otf'),
  });
  // เพิ่มโค้ดส่วนนี้ เพื่อจัดการ Stack Navigation
  return (
    <MyNavigator/>
    // <Login />
    // <QuestionActivityPage/>
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
