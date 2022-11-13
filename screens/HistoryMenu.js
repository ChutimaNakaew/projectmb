import React from "react";
import {View, StyleSheet, Text} from "react-native";

const HistoryMenu = (props) => {
    return (
        <View style={styles.text}>
            <Text>Welcome to HistoryMenu Screen!!</Text>
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
export default HistoryMenu;