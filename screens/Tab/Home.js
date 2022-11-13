import React from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"
// import { useFonts, Mali_400Regular, Mali_700Bold } from "@expo-google-fonts/mali"
import { useFonts } from "expo-font";

const Home = (props) => {
  const [weight, onChangeWeight] = React.useState(null)
  const [height, onChangeHeight] = React.useState(null)

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 5, }}>
        <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 30, alignSelf: "center" }}>16 </Text>
        <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 30, alignSelf: "center" }}>ตุลาคม </Text>
        <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 30, alignSelf: "center" }}>2556</Text>
      </View>

      <TouchableOpacity style={styles.btnCalendar}>
        <Text style={{fontFamily: "FCMuffinRegular", fontSize: 18}}>ปฎิทิน</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image style={styles.img} source={require("../../assets/body.png")} />
        <View>
          <TouchableOpacity style={styles.bmi}>
            <Text style={styles.text}>BMI : 20</Text>
            <Text style={styles.line}></Text>
            <Text style={[styles.text, { fontSize: 30 }]}>สมส่วน</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.goalWeight}>
            <Text style={styles.text}>Goal Weight</Text>
            <Text style={[styles.text, { fontSize: 30 }]}>45</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <TouchableOpacity style={styles.boxInfo}>
          <Text style={[styles.text, { fontSize: 24 }]}>ฟ้า</Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.text}>น้ำหนัก: </Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={onChangeWeight}
              // placeholder="Enter Your Weight"
              keyboardType="numeric"
            ></TextInput>
            <Text style={styles.text}>ส่วนสูง: </Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={onChangeHeight}
              // placeholder="Enter Your Height"
              keyboardType="numeric"
            ></TextInput>
          </View>
          <Text style={styles.resultInfo}>นั่งทำงานอยู่กับที่และไม่ได้ออกกำลังกาย</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resultWorkout}>
        <Text style={styles.text}>
          <Ionicons name="ios-trophy" size={20} color="#ffb81c" />
          บันทึกการออกกำลังกาย
        </Text>
      </TouchableOpacity>

      <View style={{ margin: 10, flexDirection: "row" }}>
        <View style={{ flexDirection: "column", marginRight: 120 }}>
          <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 30, marginTop: 10 }}>Total Workout</Text>
          <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 30, color: "red", marginLeft: 25 }}>325 KCAL</Text>
        </View>
        <TouchableOpacity style={{ backgroundColor: "lightpink", width: 115, height: 115, borderRadius: 100 }}>
          <Text style={[styles.text, { marginTop: 10 }]}>XXX</Text>
          <Text style={{ borderBottomColor: "black", borderBottomWidth: 1, width: 115, alignSelf: "center", marginBottom: 10 }}></Text>
          <Text style={styles.text}>2430</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginTop: 5,
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "FCMuffinRegular",
  },
  btnCalendar: {
    backgroundColor: "#bbb",
    padding: 5,
    borderRadius: 10,
    marginRight: 10,
    alignSelf: "flex-end",
  },
  img: {
    width: 100,
    height: 200,
  },
  bmi: {
    backgroundColor: "lightblue",
    alignSelf: "flex-end",
    width: 200,
    margin: 5,
    padding: 10,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    margin: 2,
  },
  goalWeight: {
    backgroundColor: "lightblue",
    alignSelf: "flex-end",
    width: 150,
    marginRight: 30,
    padding: 10,
  },
  boxInfo: {
    backgroundColor: "lightblue",
    width: 300,
    alignSelf: "center",
    margin: 5,
  },
  input: {
    width: 50,
    margin: 5,
    textAlign: "center",
  },
  resultInfo: {
    backgroundColor: "lightpink",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    margin: 10,
    textAlign: "center",
    fontFamily: "FCMuffinRegular",
  },
  resultWorkout: {
    backgroundColor: "lightblue",
    width: 160,
    alignSelf: "center",
    margin: 5,
    padding: 10,
    textAlign: "center",
    borderRadius: 15,
  },
})
export default Home
