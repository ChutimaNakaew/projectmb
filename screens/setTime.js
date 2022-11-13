import React from "react";
import {View, StyleSheet, Text} from "react-native";

const setTime =(props) => {
    return (
        <View style={styles.text}>
            <Text>Welcome to Tab1 Screen!!</Text>
        </View>
        );

};

const styles = StyleSheet.create({
    text: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
export default setTime;