import Menu from "./Menu";
import { View, StyleSheet } from "react-native";
import React from "react";

// our util
import moveToBottom from "./utils/moveToBottom";

export default props => (
  <View style={styles.container}>
    {props.children}
    {moveToBottom(<Menu />)}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start"
  }
});
