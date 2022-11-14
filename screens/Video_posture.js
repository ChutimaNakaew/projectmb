import React, {useEffect, useState} from "react";
import { View, StyleSheet, Text, ScrollView, ImageBackground, Button, useWindowDimensions } from "react-native";
import { useFonts } from "expo-font"
// import Video from 'react-native-video';
import { Video, AVPlaybackStatus } from 'expo-av';


const Video_posture = ({route, navigation}) => {
    const { width: screenWidth} = useWindowDimensions()
    const { postureId } = route.params;
    const { postureName } = route.params;
    const { postureVideo } = route.params;

    const pos_id = postureId
    const pos_name = postureName
    const pos_video = postureVideo

    // const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    //   const {blogImage} = route.params;
    //   const blogid = blogId;
    //   const blog_detail = blogdetail
    //   const blog_name = blogName
    //   const blog_image = blogImage

    //   console.log(blogid)

    let [fontsLoaded] = useFonts({
        FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
    })


    return (

        <View style={styles.container}>
            <Text>
                {pos_id}

            </Text>
            <Text style={styles.textTitle}>
                {pos_name}

            </Text>
            <Text style={styles.text}>
                {pos_video}

            </Text>
            <Video
            // ref={video}
            resizeMode='stretch'
            useNativeControls
            isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
                style={{
                    width: screenWidth,
                    height: (screenWidth * 9) / 16
                }}
                source={{
                    uri: pos_video,
                }}
            />
            
            {/* <ImageBackground source={{ uri: blog_image }}>
            <ScrollView>
            <Text style={styles.textTitle}> {blog_name} </Text>
            <Text style={styles.text}> {blog_detail} </Text>
            </ScrollView>
            </ImageBackground> */}
            {/* <Text>Welcome to Video screen</Text> */}
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    textTitle: {
        fontSize: 30,
        fontWeight: "bold",
        justifyContent: "center",
        marginBottom: 10,
        fontFamily: "FCMuffinRegular",
    },
    text: {
        // flex: 1,
        justifyContent: "center",
        fontSize: 30,
        fontFamily: "FCMuffinRegular",
        // alignItems: "center",
    },
    video: {
        flex: 1,
        alignSelf: 'stretch',
        // alignSelf: 'center',
        width: 320,
        height: 200,
    }
});
export default Video_posture;