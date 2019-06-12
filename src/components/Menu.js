import React from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import { Redirect } from "./Routing";

import "./fontawesome";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => (
  <View>
    <View style={styles.headerRow}>
      <View style={styles.iconLabelRow}>
        <View style={styles.icon}>
          <FontAwesomeIcon icon={["fas", "home"]} size="3x" />
        </View>
        <Text style={styles.iconLabel}>HOME</Text>
      </View>

      <View style={[styles.iconLabelRow, styles.iconLabelRowSubsequent]}>
        <View>
          <FontAwesomeIcon icon={["fas", "cog"]} size="3x" />
        </View>
        <Text style={styles.iconLabel}>SETTINGS</Text>
      </View>

      <View style={[styles.iconLabelRow, styles.iconLabelRowSubsequent]}>
        <View>
          <FontAwesomeIcon icon={["fas", "swatchbook"]} size="3x" />
        </View>
        <Text style={styles.iconLabel}>ACCOUNTS</Text>
      </View>

      <View style={[styles.iconLabelRow, styles.iconLabelRowSubsequent]}>
        <View>
          <FontAwesomeIcon icon={["fas", "history"]} size="3x" />
        </View>
        <Text style={styles.iconLabel}>TRANSACTIONS</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  icon: {
    marginLeft: 5
  },

  iconLabelRow: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 2
  },

  iconLabelRowSubsequent: {
    marginLeft: 50
  },

  iconLabel: {
    marginTop: 5
  },

  headerRow: {
    height: 100,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "lightblue",
    padding: 30
  }
});
