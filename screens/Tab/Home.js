import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from "react-native"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../../Database/firebaseDB"
import DateTimePicker from "@react-native-community/datetimepicker"
import { authentication } from "../../Database/firebase"
import { Picker } from "@react-native-community/picker"

const Home = ({ props, navigation }) => {
  const user_id = authentication.currentUser?.uid
  const userRef = firebase.firestore().collection('user').where('uuid', '==', user_id);
  const [info, setInfo] = useState([])

  useEffect(() => {
    userRef.onSnapshot((querySnapshot) => {
      const info = []
      querySnapshot.forEach((doc) => {
        const { activity, age, email, goal_weight, height, password, sex, username, weight, role } = doc.data()
        info.push({
          id: doc.id,
          activity,
          age,
          email,
          goal_weight,
          height,
          password,
          sex,
          username,
          weight,
          role
        })
      })
      setInfo(info)
    })
  }, [])
  console.log(info)

  // bmi((item) =>{
  let bmi_num = (0)
  let text_bmi = ''
  let bmr = 0
  let activity = ''
  let TDEE = 0
  const [bmi, setBmi] = useState(0)
  info.forEach((item) => {
    console.log('you activity is '+ item.activity)
    // console.log(item.weight)
    let bmi = ((parseFloat(item.weight) * 10000) / (parseFloat(item.height) * parseFloat(item.height))).toFixed(2)
    bmi_num += Number(bmi)
    if (bmi_num < 18.5) {
      text_bmi += 'ผอม'
    }
    else if (bmi_num >= 18.5 && bmi_num < 25) {
      text_bmi += 'สมส่วน'
    }
    else if (bmi_num >= 25 && bmi_num < 30) {
      text_bmi += 'อ้วน'
    }
    else if (bmi_num >= 30) {
      text_bmi += 'อ้วนมาก'
    }

    if(item.sex = 'men'){
      bmr += 66+(13.7*item.weight)+(5*item.height)-(6.8*item.age)
    }
    else if(item.sex = 'women'){
      bmr += 665+(9.6*item.weight)+(1.8*item.height)-(4.7*item.age)
    }

    if(item.activity = 'นั่งอยู่กับที่และไม่ออกกำลังกายเลย'){
      activity += 1.2
      TDEE += Number((bmr*activity).toFixed(0))
    }
    else if(item.activity === 'ออกกำลังกายอาทิตย์ละ 1-3 วัน'){
      activity += 1.375
      TDEE += Number((bmr*activity).toFixed(0))
    }
    else if(item.activity === 'ออกกำลังกายอาทิตย์ละ 3-5 วัน'){
      activity += 1.55
      TDEE += Number((bmr*activity).toFixed(0))
    }
    else if(item.activity === 'ออกกำลังกายอาทิตย์ละ 6-7 วัน'){
      activity += 1.725
      TDEE += Number((bmr*activity).toFixed(0))
    }
    else if(item.activity === 'ออกกำลังกายทุกวันเช้าเย็น'){
      activity += 1.9
      TDEE += Number((bmr*activity).toFixed(0))
    }
    
    // console.log(item.sex)
  })
  console.log('bmi is ' + bmi_num)
  console.log('you are '+ text_bmi)
  console.log('BMR : '+bmr)
  console.log('you activity is '+ activity)
  console.log('TDEE : '+ TDEE)
  // console.log('you activity is'+ )
  // })

  // console.log(user_id)
  const [weight, onChangeWeight] = React.useState(null)
  const [height, onChangeHeight] = React.useState(null)

  // -----------------------------------ปฎิทินจ้า----------------------------------------------------------------------------
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState("date")
  const [show, setShow] = useState(false)
  const [text, setText] = useState("Empty")
  const [getdate, setGetdate] = useState("")

  const [act, setAct] = useState("")

  // ---------------------------------set default ของปฎฺิทิน--------------------------
  useEffect(() => {
    var date = new Date().getDate() //Current Date
    var month = new Date().getMonth() + 1 //Current Month
    var year = new Date().getFullYear() //Current Year
    setGetdate(date + "/" + month + "/" + year)
  }, [])
  // ------------------------------------------------------------
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "androi")
    setDate(currentDate)

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear()

    setText(fDate)
    console.log(fDate)
    setGetdate((getdate) => (getdate = fDate)) //---------------------วันที่ที่เลือกจะถูกเก็บค่าไว้ที่ getdate
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  // ----------------------------------------------------------------------จบปฎิทิน---------------------------------

  // --------------ดึงข้อมูลKcal workoutมาแสดงผลจ้า------------------------
  const [history, setHistory] = useState([])
  // const [history_food, setHistory_food] = useState([])
  const workoutRef = firebase.firestore().collection("user").doc("u1").collection("addWorkout")
  // const addfoodRef = firebase.firestore().collection("user").doc("u1").collection("addFood")
  //-------------------------KCAl workout---------------------
  useEffect(() => {
    workoutRef.onSnapshot((querySnapshot) => {
      const history = []
      querySnapshot.forEach((doc) => {
        const { kcal, date } = doc.data()
        history.push({
          id: doc.id,
          kcal,
          date,
        })
      })
      setHistory(history)
    })
  }, [])
  //------------------------------------------------------
  //-------------------KCAL food-------------------------
  // useEffect(() => {
  //   addfoodRef
  //   .orderBy("date", "desc")
  //   .onSnapshot((querySnapshot) => {
  //     const history_food = []
  //     querySnapshot.forEach((doc) => {
  //       const { kcal, date } = doc.data()
  //       history_food.push({
  //         id: doc.id,
  //         kcal,
  //         date,
  //       })
  //     })
  //     setHistory_food(history_food)
  //   })
  // }, [])

  // console.log(history_food);
  const addFood = firebase.firestore().collection("user").doc("u1").collection("addFood")
  const [showMenu, setAddMenu] = useState([])
  useEffect(() => {
    addFood.orderBy("date", "desc").onSnapshot(async (querySnapshot) => {
      const showMenu = []
      await querySnapshot.forEach((doc) => {
        const { name, kcal, id, date, img } = doc.data()
        showMenu.push({
          key: doc.id,
          name,
          kcal,
          id,
          date,
          img,
        })
      })
      setAddMenu(showMenu)
    })
  }, [])

  //---------------------------------------------------
  let total = 0
  history.forEach((item) => {
    if (item.date !== null) {
      const date_kcal = new Date(item.date.toDate().toISOString())
      // console.log("date_kcal: " + date_kcal)
      const year_kcal = date_kcal.getFullYear()
      const month_kcal = date_kcal.getMonth() + 1
      const dt_kcal = date_kcal.getDate()

      if (dt_kcal < 10) {
        dt_kcal = "0" + dt_kcal
      }
      if (month_kcal < 10) {
        month_kcal = "0" + month_kcal
      }
      const date_picker = dt_kcal + "/" + month_kcal + "/" + year_kcal
      if (date_picker === getdate) {
        // console.log("same")
        total += item.kcal
      }
    }
  })

  const sameday = showMenu.filter((item) => {
    if (item.date !== null) {
      const date = new Date(item.date.toDate().toISOString())
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const menuDate = day + "/" + month + "/" + year
      return menuDate == getdate
    }
  })

  let Kcal_food = 0
  sameday.forEach((item) => {
    Kcal_food += item.kcal
  })
  let total_workout = total.toFixed(2)
  let total_kcal = (Kcal_food - total).toFixed(2)

  console.log("food " + Kcal_food)
  console.log("workout " + total)
  console.log("all " + total_kcal)
  // --------------------------------------------------------------

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  let role = ""
  info.forEach((item) => {
    role = item.role
  })

  if(role === "addmin"){
    return(
      <Text>"Addmin"</Text>
    )
  }else{
    return (
      <View>
        {/* <Text style={styles.textNomal}></Text> */}
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 5 }}>
          {/* {show &&} */}
          <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 30, alignSelf: "center" }}>
            {" "}
            {getdate}{" "}
          </Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicket"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
  
        <TouchableOpacity style={styles.btnCalendar} onPress={() => showMode("date")}>
          <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 18 }}>ปฎิทิน</Text>
        </TouchableOpacity>
  
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image style={styles.img} source={require("../../assets/body.png")} />
          <View>
            <TouchableOpacity style={styles.bmi}>
              <Text style={styles.text}>BMI : {bmi_num}</Text>
              <Text style={styles.line}></Text>
              <Text style={[styles.text, { fontSize: 30 }]}>{text_bmi}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.goalWeight}>
              <Text style={styles.text}>Goal Weight</Text>
              {info.map((item, key) => (
                <Text key={key} style={[styles.text, { fontSize: 30 }]}>{item.goal_weight} </Text>)
              )}
              {/* <Text style={[styles.text, { fontSize: 30 }]}>45</Text> */}
            </TouchableOpacity>
          </View>
        </View>
  
        <View>
          <TouchableOpacity style={styles.boxInfo}>
            {/* <Text style={[styles.text, { fontSize: 24 }]}>ฟ้า</Text> */}
            {info.map((item, key) => (
              <Text key={key} style={[styles.text, { fontSize: 24 }]}> {item.username} </Text>)
            )}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              {/* <Text style={styles.text}>น้ำหนัก: {info_weight}</Text> */}
              {info.map((item, key) => (
                <Text key={key} style={styles.text} >น้ำหนัก: {item.weight} </Text>)
              )}
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={onChangeWeight}
                // placeholder="Enter Your Weight"
                keyboardType="numeric"
              ></TextInput>
              {info.map((item, key) => (
                <Text key={key} style={styles.text}>ส่วนสูง: {item.height} </Text>)
              )}
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={onChangeHeight}
                // placeholder="Enter Your Height"
                keyboardType="numeric"
              ></TextInput>
            </View>
            <Picker
              style={styles.pickerStyle}
              selectedValue={act}
              mode="dialog"
              onValueChange={(val) => setAct(val)}
            >
              <Picker.Item label="นั่งทำงานอยู่กับที่และไม่ได้ออกกำลังกายเลย" value="1.2" />
              <Picker.Item label="ออกกำลังกายอาทิตย์ละ 1-3 วัน" value="1.375" />
              <Picker.Item label="ออกกำลังกายอาทิตย์ละ 3-5 วัน" value="1.55" />
              <Picker.Item label="ออกกำลังกายอาทิตย์ละ 6-7 วัน" value="1.725" />
              <Picker.Item label="ออกกำลังกายทุกวันเช้าเย็น" value="1.9" />
            </Picker>
  
            {/* <Text style={styles.resultInfo}>นั่งทำงานอยู่กับที่และไม่ได้ออกกำลังกาย</Text> */}
          </TouchableOpacity>
        </View>
  
        <TouchableOpacity
          style={styles.resultWorkout}
          onPress={() => {
            navigation.navigate("Calender_workout", { date_pick: getdate })
          }}
        >
          <Text style={styles.text}>
            <Ionicons name="ios-trophy" size={20} color="#ffb81c" />
            บันทึกการออกกำลังกาย
          </Text>
        </TouchableOpacity>
  
        <View style={{ margin: 10, flexDirection: "row" }}>
          <View style={{ flexDirection: "column", marginRight: 120 }}>
            <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 30, marginTop: 10 }}>
              Total Workout
            </Text>
            <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 30, color: "red" }}>
              {" "}
              {total_workout} KCAL
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("คำนวณแคล")
            }}
            style={{ backgroundColor: "lightpink", width: 115, height: 115, borderRadius: 100 }}
          >
            <Text style={[styles.text, { marginTop: 10 }]}> {total_kcal} </Text>
  
            <Text
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: 115,
                alignSelf: "center",
                marginBottom: 10,
              }}
            ></Text>
            <Text style={styles.text}>{TDEE} </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  }


const styles = StyleSheet.create({
  pickerStyle: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "gray",
    color: "#fff",

  },
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