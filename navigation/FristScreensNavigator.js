import React from "react"
// import library ที่จำเป็น
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { NavigationContainer, StackActions } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import FristScreen from "../screens/FristScreen"
import SignupPage from "../screens/SignupPage"
import LoginPage from "../screens/LoginPage"
import QuestionSexPage from "../screens/QuestionSexPage"
import AllUser from "../screens/AllUser"
import UserDetail from "../screens/UserDetail"
import LogOut from "../screens/LogOut"


// สร้าง navigator ตามโจทย์กำหนด

const Stack = createNativeStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FristScreen" component={FristScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: false }} />
      <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name="QuestionSexPage" component={QuestionSexPage} options={{ headerShown: false }} />
      <Stack.Screen name="AllUser" component={AllUser} options={{ headerShown: false }} />
      <Stack.Screen name="UserDetail" component={UserDetail} options={{ headerShown: false }} />
      <Stack.Screen name="LogOut" component={LogOut} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function MyStack2() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AllUser" component={AllUser} options={{ headerShown: false }} />
      <Stack.Screen name="UserDetail" component={UserDetail} options={{ headerShown: false }} />
      <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default function FristScreensNavigator() {
    return (
      <NavigationContainer>
        <MyStack/>
      </NavigationContainer>
    )
  }
  