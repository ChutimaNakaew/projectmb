import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, ImageBackground, Button, useWindowDimensions, TouchableOpacity, Pressable, Dimensions } from "react-native";
import { useFonts } from "expo-font"
import YoutubePlayer from "react-native-youtube-iframe";
// import Video from 'react-native-video';
import { Video, AVPlaybackStatus } from 'expo-av';
const screen = Dimensions.get('window');

const Video_posture = ({ route, navigation }) => {
    const { width: screenWidth } = useWindowDimensions()
    const { postureId } = route.params;
    const { postureName } = route.params;
    const { postureVideo } = route.params;
    const { postureKcal } = route.params;

    const pos_id = postureId
    const pos_name = postureName
    const pos_video = postureVideo
    const pos_kal = postureKcal

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
    // let CountTime;
    function incrementCount(press) {
        // let second 
        // let CountTime;
        console.log(press)
        // if (press === 'start') {
        let CountTime = setInterval(() => {

            let second = state.count++
            setState({ count: second });
            console.log(state.count)
        }

            , 1000);

        console.log({ CountTime })
        setState({ CountTime })
        // }
        // else if (press === 'stop'){
        //     console.log(state.CountTime)
        //     clearInterval(CountTime);
        //     console.log({ state })

        // }

        // setState({
        //     count: state.count + 1
        // });
        // state.count = 10;

        // if (!CountTime) {
        //     CountTime = setInterval(add, 1000);

        // CountTime = setInterval(function () {
        // let second = (Number(state.count) + 1).toString()

        // console.log(state.count);
        // state.count++
        // setState({
        //     count: state.count

        // });

        // }, 1000);
    }
    // setState({ CountTime })
    // setState({ isStart: true })



    function add() {
        state.count++
        setState({
            count: state.count

        });
    }


    function decrementCount(press) {
        console.log(press)
        if (press === 'stop') {
            console.log(state.CountTime)
            clearInterval(state.CountTime);
            console.log({ state })
            // setState({
            //     isStart: false
            // });
            // CountTime = null;
            // console.log({ CountTime })
        }
        // clearInterval(incrementCount);
        // setState({
        //     count: state.count - 1,
        // });
    }

    // return (
    // <div>
    //     <h1>{state.count}</h1>

    //     <button onClick={incrementCount}>Increment</button>
    //     <button onClick={decrementCount}>Decrement</button>
    // </div>
    // );
    // };

    const formatNumber = number => `0${number}`.slice(-2);

    const getRemaining = (time) => {
        const mins = Math.floor(time / 60);
        const secs = time - mins * 60;
        return { mins: formatNumber(mins), secs: formatNumber(secs) };
    }
    const [remainingSecs, setRemainingSecs] = useState(0);
    // const [totalKcal, setTotalKcal] = useState(0);
    // const totalKcal = 0
    const [isActive, setIsActive] = useState(false);
    const { mins, secs } = getRemaining(remainingSecs);
    toggle = () => {
        setIsActive(!isActive);
    }

    reset = () => {
        console.log('total' + remainingSecs)
        setRemainingSecs(0);
        setIsActive(false);

    }

    record = () => {
        let totalKcal = ((pos_kal) * (remainingSecs / 60)) //หาร60เพราะคิดเป็นper minute
        // setTotalKcal(totalKcal => (totalKcal + pos_kal)*(remainingSecs/60));
        console.log('you time second is : ' + remainingSecs)
        console.log('this posture Kcal is : ' + pos_kal)
        console.log('Your burn Calory is : ' + totalKcal)

    }
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setRemainingSecs(remainingSecs => remainingSecs + 1);
                console.log(remainingSecs)
            }, 1000);
        } else if (!isActive && remainingSecs !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, remainingSecs]);
    return (

        <View style={styles.container}>
            {/* <Text>
                {pos_id}

            </Text> */}
            
            {/* <Text style={styles.text}>
                {pos_video}

            </Text> */}
            <Text style={styles.textTitle}>{pos_name}</Text>
            <YoutubePlayer
                height={300}
                play={true}
                videoId={pos_video}
            />
            
            {/* <View > */}
            <View style={styles.subcontainer}>
                <Text style={styles.time}>{`${mins}:${secs}`}</Text>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={this.toggle} style={styles.buttonStart}>
                        <Text style={styles.text}>{isActive ? 'หยุด' : 'เริ่ม'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.reset} style={styles.buttonReset}>
                        <Text style={styles.text}>รีเซต</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={styles.btn2}>
                        <TouchableOpacity onPress={this.record} style={styles.buttonRecord}>
                            <Text style={styles.text}>บันทึก</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* <Button title="Stop" onClick={() => { incrementCount('stop') }} ></Button> */}
            {/* </View> */}
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
        flex:1,
        padding: 5,
        // backgroundColor:'#000',
    },
    subcontainer:{
        marginTop:-20,
    },
    textTitle: {
        fontSize: 40,
        // textAlign:'center',
        // fontWeight: "bold",
        // justifyContent: "center",
        marginBottom: 10,
        fontFamily: "FCMuffinRegular",
        // color:'white'
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
        height: 150,
    },
    time: {
        fontSize: 70,
        textAlign: 'center',
        marginTop: -10,
        marginBottom: 5,
        // color:'white'
    },
    buttonStart: {
        borderWidth: 10,
        borderColor: '#68b97a',
        width: 110,
        height: 65,
        borderRadius: screen.width / 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonReset: {
        borderWidth: 10,
        borderColor: '#f09090',
        width: 110,
        height: 65,
        borderRadius: screen.width / 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonRecord: {
        borderWidth: 10,
        borderColor: '#7fa4eb',
        width: 110,
        height: 65,
        borderRadius: screen.width / 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10,
    },
    btn2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
});
export default Video_posture;