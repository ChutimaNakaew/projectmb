import React from "react";
import {View, StyleSheet, Text, Image, ScrollView, TouchableOpacity} from "react-native";


const Tab3 =(props) => {
  
    return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.div}>
            <Text style={styles.text}>Cardio</Text>
            <TouchableOpacity onPress={()=> {props.navigation.navigate("Cardio")}}>
              <Image
            style={styles.image}
            source={{
              uri:'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/image.png?alt=media&token=1ad0bab8-1854-495d-94ad-910a53961d55'
            }}
            />
            </TouchableOpacity >
            </View>
            <View style={styles.div}>
            <TouchableOpacity onPress={()=> {props.navigation.navigate("HIIT")}}>
            <Text style={styles.text}>HIIT</Text>
            <Image
            style={styles.image}
            source={{
              uri:'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/image%20(1).png?alt=media&token=150f79cc-93c7-4257-9526-012830545e49'
            }}
            />
            </TouchableOpacity>
            </View>

            <View style={styles.div}>
            <TouchableOpacity onPress={()=> {props.navigation.navigate("Weight_Training")}}>
            <Text style={styles.text}>Weight Training</Text>
            <Image
            style={styles.image}
            source={{
              uri:'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/image%20(2).png?alt=media&token=8e11542c-5395-4742-9c1f-6738e548c357'
            }}
            />
            </TouchableOpacity>
            </View>
            
            <View style={styles.div}>
            <TouchableOpacity onPress={()=> {props.navigation.navigate("Pilates")}}>
            <Text style={styles.text}>Pilates</Text>
            <Image
            style={styles.image}
            source={{
              uri:'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/image%20(3).png?alt=media&token=3d4a72d4-21d8-4eb3-88b7-cd461f1930cc'
            }}
            />
            </TouchableOpacity>
            </View>

            <View style={styles.div}>
            <TouchableOpacity onPress={()=> {props.navigation.navigate("Yoga")}}>
            <Text style={styles.text}>Yoga</Text>
            <Image
            style={styles.image}
            source={{
              uri:'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/yoga2.png?alt=media&token=2d52dc38-045d-48b1-88c4-2583e6a71e57'
            }}
            />
            </TouchableOpacity>
            </View>

            <View style={styles.div}>
            <TouchableOpacity onPress={()=> {props.navigation.navigate("Aerobic")}}>
            <Text style={styles.text}>Aerobic Exercise</Text>
            <Image
            style={styles.image}
            source={{
              uri:'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/aerobic2.png?alt=media&token=b7d9581e-1e7f-4410-9a13-5b1b7962d1a8'
            }}
            />
            </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
        );

};

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#fff',
      alignItems:'center',
      // justifyContent:'center',
      // marginHorizontal:10,
    },
    div:{
      padding:15,
      marginBottom:20,
    },
    text: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // marginBottom:-60,
      // marginTop:10,
      fontSize:30,
    },
    image:{
      
      width:360,
      height:140,
      resizeMode:'contain',
      borderRadius:50,
      marginBottom:-30,    
    }
  });
export default Tab3;
