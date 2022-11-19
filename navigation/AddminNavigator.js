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

import AddminFoodDetail from "../screens/AddminFoodDetail"
import AddminFood from "../screens/AddminFood"
import AddminHome from "../screens/AddminHome"
import AddminAddMenu from "../screens/AddminAddMenu"
import AddminBlog from "../screens/AddminBlog"
import AddminAddBlog from "../screens/AddminAddBlog"
import AddminBlogDetail from "../screens/AddminBlogDetail"
import AllUser from "../screens/AllUser"
import UserDetail from "../screens/UserDetail"
import AddminWorkout from "../screens/AddminWorkout"
import AddminWorkoutCategory from "../screens/AddminWorkoutCategory"
import AddminWorkoutDetail from "../screens/AddminWorkoutDetail"
import AddminAddWork from "../screens/AddminAddWork"
// สร้าง navigator ตามโจทย์กำหนด

const Stack = createNativeStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AddminHome" component={AddminHome} options={{ headerShown: false }} />
      <Stack.Screen name="AddminFood" component={AddminFood} options={{ headerShown: false }} />
      <Stack.Screen name="AddminFoodDetail" component={AddminFoodDetail} options={{ headerShown: false }} />
      <Stack.Screen name="AddminAddMenu" component={AddminAddMenu} options={{ headerShown: false }} />
      <Stack.Screen name="AddminBlog" component={AddminBlog} options={{ headerShown: false }} />
      <Stack.Screen name="AddminAddBlog" component={AddminAddBlog} options={{ headerShown: false }} />
      <Stack.Screen name="AddminBlogDetail" component={AddminBlogDetail} options={{ headerShown: false }} />
      <Stack.Screen name="AllUser" component={AllUser} options={{ headerShown: false }} />
      <Stack.Screen name="UserDetail" component={UserDetail} options={{ headerShown: false }} />
      <Stack.Screen name="AddminWorkout" component={AddminWorkout} options={{ headerShown: false }} />
      <Stack.Screen name="AddminWorkoutCategory" component={AddminWorkoutCategory} options={{ headerShown: false }} />
      <Stack.Screen name="AddminWorkoutDetail" component={AddminWorkoutDetail} options={{ headerShown: false }} />
      <Stack.Screen name="AddminAddWork" component={AddminAddWork} options={{ headerShown: false }} />
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
  