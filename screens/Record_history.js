import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, ScrollView } from "react-native"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"

const History = ({ props, navigation }) => {
    const [history, setHistory] = useState([])
    // const [total, setTotal] = useState([])
    const workoutRef = firebase.firestore().collection("user").doc("u1").collection("addWorkout");
    const sumRef = firebase.firestore().collection("user").doc("u1").collection("TotalWorkout");

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
    history.forEach(item => {
        total += item.kcal
    });
    // console.log("Total: ", total);
    sumRef.add({
        sumKcal: total
    }).then(() => {
        // console.log("Success to Add SUM")
    })
        .catch((err) => {
            alert(err)
        })

    // -----------------------------------------------------------



    const calculate = (item) => {
        console.log(history)

        // return total;
        // const total = []
        // total.push(item.kcal)

        // item.kcal ++
        // let total = 0
        // console.log('abc------')
        // console.log(total)
        // console.log(item.kcal)
        // console.log(item.kcal)
        // item.kcal++
        // setTotal = setTotal + item.kcal ;
        // console.log(total)
        // {

        // total.map((item) => {
        //     setTotal(total + item.kcal)
        // })}


        // if (item.kcal) {
        // let total = 0;
        // for (let i = 0; i < item.kcal.length; i++) {

        //     setTotal += item.kcal[i]
        // }
        // let final = item.kcal++
        // console.log('final total' + total)
        // }

    }

    let [fontsLoaded] = useFonts({
        FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <View style={{ flex: 2}}>
            {/* <ScrollView > */}
            <FlatList
                data={history}
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

            <Text style={styles.text}> <FontAwesome5 name="fire-alt" size={30} color="#f29811" /> ปริมาณแคลอรี่ที่ลดไปวันนี้ {total} Kcal</Text>


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
        marginBottom:20,
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
export default History