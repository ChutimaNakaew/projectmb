import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, ScrollView } from "react-native"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"

const Calender = ({ route, navigation }) => {
    const { date_pick } = route.params;

    const date_cal = date_pick
    const [history, setHistory] = useState([])
    const [date, setDate] = useState('')
    // const [total, setTotal] = useState([])
    const workoutRef = firebase.firestore().collection("user").doc("u1").collection("addWorkout");
    const sumRef = firebase.firestore().collection("user").doc("u1").collection("TotalWorkout");


    // ---------------------------------set default ของปฎฺิทิน--------------------------
    useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        setDate(
            date + '/' + month + '/' + year
        );
    }, []);
    console.log(date)
    //----------------------------------------------------------
    useEffect(() => {
        workoutRef.onSnapshot((querySnapshot) => {
            const history = []
            querySnapshot.forEach((doc) => {
                const { id, date, name, kcal, time } = doc.data()
                history.push({
                    id: doc.id,
                    kcal,
                    id,
                    name,
                    date,
                    time,
                })
            })
            setHistory(history)
        })
    }, [])
    // useEffect(() => {
    //     workoutRef.onSnapshot((querySnapshot) => {
    //         const total = []
    //         querySnapshot.forEach((doc) => {
    //             const { kcal} = doc.data()
    //             total.push({
    //                 id: doc.id,
    //                 kcal,
    //             })
    //         })
    //         setTotal(total)
    //     })
    // }, [])
    // const [total, setTotal] = useState(0)

    const totalCal = history.reduce((total, item) => {
        return total + item.kcal;
    }, 0);
    //    console.log(total)


    //--------------------------------คำนวณจ้า-----------------------
    let total = 0;
    // const [name_posture, setName] = useState('');
    const [time_posture, setTime] = useState('');
    const name_posture = [];
    
    // const time_posture = '';
    history.forEach(item => {
        if(item.date !== null) {
        const date_kcal = new Date(item.date.toDate().toISOString());
        const year_kcal = date_kcal.getFullYear();
        const month_kcal = date_kcal.getMonth() + 1;
        const dt_kcal = date_kcal.getDate();
        

        if (dt_kcal < 10) {
            dt_kcal = '0' + dt_kcal;
        }
        if (month_kcal < 10) {
            month_kcal = '0' + month_kcal;
        }
        const date_picker = (dt_kcal + '/' + month_kcal + '/' + year_kcal)
        if (date_picker === date_cal) {
            console.log('kcal ' + item.kcal)
            // setName(item.name)
            console.log('name is '+item.name)
            // name_posture = item.name
            // console.log(name_posture)
            total += item.kcal
            let obj = {
                name : item.name,
                time: item.time

            }
            name_posture.push(obj)
            console.log(name_posture)
            // setName(name_posture => name_posture = item.name)
            // setTime(time_posture => time_posture = item.time)
            // name_posture = item.name;
            // time_posture = item.time;
        }
        
    }
    });
    let total_workout = total.toFixed(2)
    // console.log("Total: ", total);
    sumRef.add({
        // sumKcal: total
    }).then(() => {
        // console.log("Success to Add SUM")
    })
        .catch((err) => {
            alert(err)
        })

    // -----------------------------------------------------------



    let [fontsLoaded] = useFonts({
        FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <View style={{ flex: 2 }}>
             {/* { name_posture.map((item, key)=>(
         <Text key={key} >{ item.name } </Text>)
         )} */}
            {/* <Text style={styles.title}> {name_posture} </Text> */}
            {/* <ScrollView > */}
            <Text style={{textAlign:'center', marginTop:5, fontFamily: "FCMuffinRegular", fontSize:25}}>- บันทึกการออกกำลังกายประจำวันที่ {date_cal} -</Text>
            <FlatList
                data={name_posture}
                // scrollEnabled={false}
                numColumns={2}
                renderItem={({ item }) => (
                    <View>
                        <View style={styles.gridItem}>
                            <Text style={styles.title}> {item.name} </Text>
                            <Text style={styles.title}> {item.time} min. <FontAwesome5 name="check" size={24} color="#61B15A" /> </Text>

                            {/* <Text  style={styles.title}> {item.kcal} Kcal</Text> */}
                            {/* <TouchableOpacity onPress={() => calculate(item)}><Text>กด</Text></TouchableOpacity> */}


                            {/* <ImageBackground source={{ uri: item.image }} style={styles.img_bg} resizeMode='stretch'> */}
                            {/* <View style={[styles.container, { flexDirection: "row" }]}> */}
                            {/* <Text style={styles.title} numberOfLines={1}>
                        {item.posture_name}
                      </Text> */}
                            {/* <Text style={styles.title} numberOfLines={1}>
                        {} {item.kcal} Kcal
                      </Text> */}
                            {/* </View> */}
                            {/* </ImageBackground> */}
                        </View>

                    </View>
                )}
            />

            <Text style={styles.text}> <FontAwesome5 name="fire-alt" size={30} color="#f29811" /> ปริมาณแคลอรี่ที่ลดไปวันนี้ {total_workout} Kcal</Text>


            {/* </ScrollView> */}
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        // marginTop: 10,
        marginLeft: 20,
        fontFamily: "FCMuffinRegular",
        fontSize: 28,
        marginBottom: 10,
        marginTop:10,
        // textAlign: "start",

    },
    gridItem: {
        //   flex: 1,
        //   margin: 5,
        padding: 17,
        height: 170,
        width: 170,
        backgroundColor: "#faf7dc",
        borderWidth: 5,
        borderColor: '#edeaca',
        margin: 12,
        borderRadius: 120,
        justifyContent: 'center',
        alignItems: 'center'
        //   borderColor:""
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
        //   pa
        //   justifyContent:'center',
        // marginBottom:10,
        // flex: 1,
        // backgroundColor: "#rgba(217, 217, 217, 0.8)",
    },
    img_bg: {
        flex: 1,
        width: 180,
        height: 150
    },

})
export default Calender