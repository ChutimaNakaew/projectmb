import React from "react";
import {
    StyleSheet,
    ImageBackground,
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Pressable,
} from "react-native";
import { useFonts } from "expo-font";

const QuestionSexPage = () => {
    const [fontsLoaded] = useFonts({
        FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
    });
    return (
        <View style={styles.container}>
            {/* ใส่พื้นหลัง */}
            <ImageBackground
                source={require("../assets/ImageBackground/QuestionSexPageBG.png")}
                resizeMode="cover"
                style={styles.image}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.boxInfo}
                >
                    <Text style={styles.textTitle}>เลือกเพศของคุณ</Text>
                    <ScrollView style={styles.scrollView}>
                        <Pressable style={styles.buttonF}>
                            <Text style={styles.textButton}>👩🏻 ผู้หญิง</Text>
                        </Pressable>

                        <Pressable style={styles.buttonM}>
                            <Text style={styles.textButton}>👱🏼‍♂️ ผู้ชาย</Text>
                        </Pressable>

                        <Pressable style={styles.button}>
                            <Text style={styles.textButton}>ต่อไป</Text>
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
        borderRadius: "10%",
        backgroundColor: "white",
        flex: 0.44,
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
    buttonF: {
        backgroundColor: "pink",
        width: "50%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 10,
        borderWidth: 1,
        textColor: "balck",
        marginTop: 20,
        fontFamily: "FCMuffinRegular",
    },
    buttonM: {
        backgroundColor: "lightblue",
        width: "50%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 10,
        borderWidth: 1,
        textColor: "balck",
        marginTop: 20,
        fontFamily: "FCMuffinRegular",
    }
});
export default QuestionSexPage;
