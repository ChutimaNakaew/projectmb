import React from "react";
import {View, StyleSheet, Text, ScrollView, ImageBackground} from "react-native";
import { useFonts } from "expo-font"

const BlogDetail =({route, navigation}) => {
  const {blogId} = route.params;
  const {blogdetail} = route.params;
  const {blogName} = route.params;
  const {blogImage} = route.params;
  const blogid = blogId;
  const blog_detail = blogdetail
  const blog_name = blogName
  const blog_image = blogImage

  console.log(blogid)
  
  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  
    return (
      
        <View style={styles.container}>
          {/* <ImageBackground source={{ uri: blog_image }}> */}
            <ScrollView>
            <Text style={styles.textTitle}> {blog_name} </Text>
            <Text style={styles.text}> {blog_detail} </Text>
            </ScrollView>
            {/* </ImageBackground> */}
        </View>
        );

};

const styles = StyleSheet.create({
  container:{
    padding:5,
  },
  textTitle:{
    fontSize:30,
    fontWeight:"bold",
    justifyContent: "center",
    marginBottom:10,
    fontFamily: "FCMuffinRegular",
  },
    text: {
      // flex: 1,
      justifyContent: "center",
      fontSize:30,
      fontFamily: "FCMuffinRegular",
      // alignItems: "center",
    },
  });
export default BlogDetail;