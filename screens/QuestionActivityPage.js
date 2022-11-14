import React from "react";
import {
    StyleSheet,
    ImageBackground,
    Image,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Button,
    Pressable,
} from "react-native";
import { useFonts } from "expo-font";

const QuestionActivityPage = () => {
    const [fontsLoaded] = useFonts({
        FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
    });
    return (
        <View style={styles.container}>
            {/* ใส่พื้นหลัง */}
            <ImageBackground
                source={require("../assets/ImageBackground/QuestionActivityBG.png")}
                resizeMode="cover"
                style={styles.image}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.boxInfo}
                >
                    <Text style={styles.textTitle}>กิจกรรมในแต่ละวัน</Text>
                    <ScrollView style={styles.scrollView}>
                        <Pressable style={styles.buttonAct}>
                            <Text style={styles.textButton}>นั่งอยู่กับที่และไม่ออกกำลังกายเลย</Text>
                        </Pressable>

                        <Pressable style={styles.buttonAct}>
                            <Text style={styles.textButton}>ออกกำลังกายหรือเล่นกีฬาเล็กน้อย ประมาณอาทิตย์ละ 1-3 วัน</Text>
                        </Pressable>

                        <Pressable style={styles.buttonAct}>
                            <Text style={styles.textButton}>ออกกำลังกายหรือเล่นกีฬาปานกลาง ประมาณอาทิตย์ละ 3-5 วัน</Text>
                        </Pressable>

                        <Pressable style={styles.buttonAct}>
                            <Text style={styles.textButton}>ออกกำลังกายหรือเล่นกีฬาอย่างหนัก ประมาณอาทิตย์ละ 6-7 วัน</Text>
                        </Pressable>

                        <Pressable style={styles.buttonAct}>
                            <Text style={styles.textButton}>ออกกำลังกายหรือเล่นกีฬาอย่างหนักทุกวันเช้าเย็น</Text>
                        </Pressable>

                        <Pressable style={styles.button}>
                            <Text style={styles.textButton}>เข้าสู่โปรแกรม</Text>
                        </Pressable>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: 270,
        height: 270,
        alignSelf: "center",
        marginBottom: 20,
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
        marginTop: 50,
        fontFamily: "FCMuffinRegular",
    },
    textTitle: {
        fontFamily: "FCMuffinRegular",
        fontSize: 60,
        marginBottom: 20,
        marginTop: 20,
    },
    textNomal: {
        fontFamily: "FCMuffinRegular",
        fontSize: 25,
        marginBottom: 0,
        alignSelf: "start",
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
    },
    buttonAct: {
        backgroundColor: "pink",
        width: "90%",
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 10,
        borderWidth: 1,
        textColor: "balck",
        marginTop: 20,
        fontFamily: "FCMuffinRegular",
    },
});
export default QuestionActivityPage;
