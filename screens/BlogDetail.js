import React from "react";
import {View, StyleSheet, Text, ScrollView} from "react-native";
import { useFonts } from "expo-font"

const BlogDetail =({route, navigation}) => {
  const {blogId} = route.params;
  const {blogdetail} = route.params;
  const {blogName} = route.params;
  const blogid = blogId;
  const blog_detail = blogdetail
  const blog_name = blogName

  console.log(blogid)
  
  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  
    return (
      
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.textTitle}> {blog_name} </Text>
            <Text style={styles.text}> {blog_detail} </Text>
            </ScrollView>
        </View>
        );

};

const styles = StyleSheet.create({
  container:{
    padding:20,
  },
  textTitle:{
    fontSize:16,
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