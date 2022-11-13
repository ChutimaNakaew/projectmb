import React from "react"
// import library ที่จำเป็น
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { NavigationContainer, StackActions } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

// import screen ที่เกี่ยวข้อง
import Home from "../screens/Tab/Home"
import Cal from "../screens/Tab/Cal"
import tab3 from "../screens/Tab/tab3"
import tab4 from "../screens/Tab/tab4"
import CustomHeaderButton from "../Components/CustomHeaderButton"
import AddMenu from "../screens/AddMenu"
import HistoryMenu from "../screens/HistoryMenu"
import cardio from "../screens/Cardio"
import hiit from "../screens/HIIT"
import weight_training from "../screens/Weight_Training"
import pilates from "../screens/Pilates"
import yoga from "../screens/Yoga"
import aerobic from "../screens/Aerobic"
import BlogDetail from "../screens/BlogDetail"

// สร้าง navigator ตามโจทย์กำหนด
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const info_type = createNativeStackNavigator()
const Blogdetail = createNativeStackNavigator()
// const MealsNavigator = createNativeStackNavigator()
// const FavNavigator = createNativeStackNavigator()
// const FiltersNavigator = createNativeStackNavigator()
const MainNavigator = createDrawerNavigator()

function CalNavigator() {
  return (
    <Stack.Navigator initialRouteName="Cal">
      <Stack.Screen name="Cal" component={Cal} options={{ headerShown: false }} />
      <Stack.Screen name="AddMenu" component={AddMenu} options={{ title: "" }} />
      <Stack.Screen name="HistoryMenu" component={HistoryMenu} options={{ title: "" }} />
    </Stack.Navigator>
  )
}

function Myinfo_type() {
  return (
    <info_type.Navigator initialRouteName="Catagories">
      <info_type.Screen
        name="Catagories"
        component={tab3}
        options={
          {
            // title: ""
          }
        }
      />
      <info_type.Screen
        name="Cardio"
        component={cardio}
        // screenOptions={{          }}
      />
      <info_type.Screen
        name="HIIT"
        component={hiit}
        // screenOptions={{          }}
      />
      <info_type.Screen
        name="Weight_Training"
        component={weight_training}
        // screenOptions={{          }}
      />
      <info_type.Screen
        name="Pilates"
        component={pilates}
        // screenOptions={{          }}
      />
      <info_type.Screen
        name="Yoga"
        component={yoga}
        // screenOptions={{          }}
      />
      <info_type.Screen
        name="Aerobic"
        component={aerobic}
        // screenOptions={{          }}
      />
    </info_type.Navigator>
  )
}
function Myblogdetail() {
  return (
    <Blogdetail.Navigator initialRouteName="Blog">
      <Blogdetail.Screen
        name="Blog"
        component={tab4}
        options={
          {
            // title: ""
          }
        }
      />
      <Blogdetail.Screen
        name="BlogDetail"
        component={BlogDetail}
        screenOptions={
          {
            // headerTintColor: "white",
            // headerC
          }
        }
      />
    </Blogdetail.Navigator>
  )
}

// สร้าง Navigator หลัก
export default function MyNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="คำนวณแคล">
        <Tab.Screen
          name="หน้าหลัก"
          component={Home}
          options={{
            title: "",
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="" iconName="settings-sharp" onPress={() => {}} />
              </HeaderButtons>
            ),
            tabBarIcon: () => {
              return <Ionicons name="home-outline" size={24} color="black" />
            },
            tabBarLabel: "Home",
            // headerShown: false,
          }}
        />
        <Tab.Screen
          name="คำนวณแคล"
          component={CalNavigator}
          options={{
            tabBarIcon: () => {
              return <Ionicons name="calculator-outline" size={24} color="black" />
            },
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="ออกกำลังกาย"
          component={Myinfo_type}
          options={{
            tabBarIcon: () => {
              return <Ionicons name="barbell-outline" size={24} color="black" />
            },
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="บล็อก"
          component={Myblogdetail}
          options={{
            tabBarIcon: () => {
              return <Ionicons name="newspaper-outline" size={24} color="black" />
            },
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
