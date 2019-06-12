import React from "react";
import { View, StyleSheet } from "react-native";

function moveToBottom(component) {
  return <View styles={styles.container}>{component}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    marginBottom: 36
  }
});

export default moveToBottom;
