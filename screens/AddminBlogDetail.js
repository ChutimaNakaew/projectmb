import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, ScrollView, Button, Pressable } from "react-native";
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import firebase from "../Database/firebaseDB";
import uuid from 'react-uuid';
import { Badge, ListItem } from 'react-native-elements'


const UserDetail = ({ navigation, route }) => {
    let [fontsLoaded] = useFonts({
        'FCMuffinRegular': require('../assets/fonts/FCMuffinRegular.otf'),
    });
    const { userKey } = route.params;
    const key = userKey

    const [info, setInfo] = useState({ image: "", kcal: "", posture_name: "", video: "", video_time:0 });

    const dbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('blog').doc(key)

    //     setInfo((previousState) => {
    //         const info = previousState
    //         return {...info, userArr: userArr}
    //       })

    const InputValueUpdate = (val, props) => {
        console.log(val)
        info[props] = val;
        setInfo(info)
        console.log(info)
    }

    const updateUser = () => {
        console.log("รับคำร้องอัพเดท")
        console.log(info)
        const updatedbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('blog').doc(key)
        updatedbRef.set({
            image: info.image,
            detail: info.detail,
            name: info.name,
            background: info.background
        }).then((docRef) => {
            console.log(info)
            setInfo({
                image: "", detail: "", name:"", background:""
            })
            console.log("อัพเดทแล้วจ้า")
            console.log(info)
            navigation.navigate('AddminBlog');
        })
    }

    const DelUser = () => {
        console.log("กำลังลบจ้า");
        const dbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('blog').doc(key)
        dbRef.delete().then((res) => {
            console.log("ลบแล้วจ้า");
            navigation.navigate('AddminBlog');
        })
    }

    // const updateUser(() {
    //     const updatedbRef = firebase.firestore().collection('user').doc(key)
    //     updatedbRef.set({
    //         username: info.username,
    //         email: info.email,
    //         password: info.password
    //     })
    // }
    // )
    //----------------

    //หลัง render จะเรียกใช้งานเมดตอดนี้

    useEffect(() => {
        console.log("ใช้ UseEff");
        dbRef.get().then((res) => {
            if (res.exists) {
                const blog = res.data();
                setInfo({ key: res.id, image: blog.image, detail: blog.detail, name: blog.name, background: blog.background })
            } else {
                console.log("ไม่มีข้อมูลจ้า")
            }
        })
    }, []);

    //ถ้า element ถูกลบออกจะอัพเดท
    // useEffect(() => {
    //     unsub();
    //     return () => {
    //     }
    // }, []);

    // const getCollection = (querySnaphot) => {
    //     const userArr = [];
    //     querySnaphot.forEach((res) => {
    //         const { username, email, password } = res.data();
    //         userArr.push({
    //             key: res.id,
    //             res,
    //             username,
    //             email,
    //             password
    //         })
    //     })
    //     setInfo((previousState) => {
    //         const info = previousState
    //         return {...info, userArr: userArr}
    //       })
    // }
    //----------------


    // const StoreUser = () => {
    //     console.log("เข้าแล้วจ้า")
    //     if (info.username == "") {
    //         alert('Please fill username');
    //     } else {
    //         dbRef.add({
    //             username: info.username,
    //             email: info.email,
    //             password: info.password,
    //             uuid: info.uuid
    //         })
    //         navigation.navigate('QuestionSexPage')
    //     }
    // }

    return (
        <View style={styles.container}>
            {/* ใส่พื้นหลัง */}
            <ImageBackground source={require("../assets/ImageBackground/loginPageBG.png")} resizeMode="cover" style={styles.image}>

                <TouchableOpacity style={styles.buttonBack}
                    onPress={() => navigation.navigate('AddminBlog')}
                >
                    <AntDesign name="arrowleft" size={40} color="white" />

                </TouchableOpacity>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.boxInfo}
                >
                    <Text style={styles.textTitle}>{info.name}</Text>
                    <ScrollView style={styles.scrollView}>
                    <Text style={styles.textNomal}>ชื่อ</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholder={info.name}
                            onChangeText={val => InputValueUpdate(val, 'name')}
                        />

                        <Text style={styles.textNomal}>รูปภาพ</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholder={info.image}
                            onChangeText={val => InputValueUpdate(val, 'img')}
                        />

                        <Text style={styles.textNomal}>รายละเอียด</Text>
                        <TextInput
                        multiline={true}
                        numberOfLines={12}
                        textAlignVertical = "top"
                            style={styles.TextArea}
                            placeholder={info.detail}
                            onChangeText={(val) => InputValueUpdate(val, 'kcal')}
                        />

<Text style={styles.textNomal}>รูปพื้นหลัง</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholder={info.background}
                            onChangeText={(val) => InputValueUpdate(val, 'kcal')}
                        />


                        <TouchableOpacity style={styles.button}
                            onPress={() => updateUser()} >
                            <Text style={styles.textButton}>อัพเดท</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}
                            onPress={() => DelUser()} >
                            <Text style={styles.textButton}>ลบ</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </KeyboardAvoidingView>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
    },
    logo: {
        width: 250,
        height: 250,
        alignSelf: "center",
        marginBottom: 10,
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    boxInfo: {
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "white",
        flex: 0.9,
        width: "85%",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#F2DE77",
        width: "50%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 10,
        borderWidth: 1,
        textColor: "balck",
        marginTop: 10,
        fontFamily: "FCMuffinRegular",
    },
    textTitle: {
        fontFamily: "FCMuffinRegular",
        fontSize: 40,
        marginBottom: 10,
        marginTop: 10,
    },
    textNomal: {
        fontFamily: "FCMuffinRegular",
        fontSize: 25,
        marginBottom: 0,
        alignSelf: "flex-start",
        marginHorizontal: 12,
    },
    textButton: {
        fontFamily: "FCMuffinRegular",
        fontSize: 25,
        marginBottom: 0,
        alignSelf: "center",
    },
    scrollView: {
        height: "100%",
        width: "100%",
    },
    TextInput: {
        height: 40,
        width: "90%",
        marginTop: 2,
        marginHorizontal: 12,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "lightgrey",
        fontFamily: "FCMuffinRegular",
    },
    buttonBack: {
        backgroundColor: "black",
        width: 70,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 10,
        borderWidth: 1,
        textColor: "balck",
        marginTop: 10,
        fontFamily: "FCMuffinRegular",
        position: "absolute",
        top: 60,
        left: 20,
        zIndex: 1,
    },TextArea: {
        height: 200,
        width: "90%",
        marginTop: 2,
        marginHorizontal: 12,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "lightgrey",
        fontFamily: "FCMuffinRegular",
      }
})
export default UserDetail;