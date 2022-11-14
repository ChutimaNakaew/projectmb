import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, ImageBackground, Button, useWindowDimensions, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font"
import YoutubePlayer from "react-native-youtube-iframe";
// import Video from 'react-native-video';
import { Video, AVPlaybackStatus } from 'expo-av';


const Video_posture = ({ route, navigation }) => {
    const { width: screenWidth } = useWindowDimensions()
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

    // CounterApp ()  {
    const [state, setState] = useState({
        count: 0,
        isStart: false,
        minutes_Counter: '00',
        seconds_Counter: '00',
    });
    function timer() {
        let time = setInterval(() => {
            let second = (Number(state.seconds_Counter) + 1).toString()
            let minute = state.minutes_Counter


            if (Number(state.seconds_Counter) == 59) {
                minute = (Number(state.minutes_Counter) + 1).toString()
                second = '00'
            }

            setState({
                minutes_Counter: minute.length == 1 ? '0' + minute : minute,
                seconds_Counter: second.length == 1 ? '0' + second : second,

            })
        }, 1000)

        setState({ time })
        setState({ isStart: true })
        console.log({ state })
    }
    function stop() {
        console.log({ state })
        clearInterval(state.time);
        setState({ isStart: false });
    }

    const incrementCount = () => {
        setState({
            count: state.count + 1,
        });
    }

    const decrementCount = () => {
        setState({
            count: state.count - 1,
        });
    }

    // return (
    // <div>
    //     <h1>{state.count}</h1>

    //     <button onClick={incrementCount}>Increment</button>
    //     <button onClick={decrementCount}>Decrement</button>
    // </div>
    // );
    // };
     
    return (

        <View style={styles.container}>
            {/* <Text>
                {pos_id}

            </Text> */}
            <Text style={styles.textTitle}>
                {pos_name}

            </Text>
            {/* <Text style={styles.text}>
                {pos_video}

            </Text> */}
            <YoutubePlayer
                height={300}
                play={true}
                videoId={pos_video}
            />
            <View >

            <View >
                    <Text style={styles.time}>{state.minutes_Counter + " : " + state.seconds_Counter}</Text>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity>
                        <Button title="START" onPress={() => { timer() }} disabled={state.isStart}></Button>
                    </TouchableOpacity>
                </View>
                <View >
                    <TouchableOpacity>
                        <Button title="STOP" onPress={() => { stop() }}></Button>
                    </TouchableOpacity>
                </View>
                {/* <Text>{state.count}</Text>

                <Button title="Increment" onPress={() => { incrementCount }}></Button>
                <Button title="Decrement" onPress={() => { decrementCount }}></Button> */}
            </View>
            {/* <Video
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
             */}
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
    },
    time: {
        fontSize: 50,
        textAlign: 'center',
    }
});
export default Video_posture;