import React from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import { Redirect } from "./Routing";

import "./fontawesome";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.redirect = this.redirect.bind(this);
  }

  redirect(path) {
    this.setState({ path });
  }

  render() {
    if (this.state.path) {
      return <Redirect to={this.state.path} />;
    }

    return (
      <View>
        <View style={styles.headerRow}>
          <TouchableHighlight
            style={styles.iconLabelRow}
            onPress={() => this.redirect("/home")}
          >
            <View>
              <View style={styles.icon}>
                <FontAwesomeIcon icon={["fas", "home"]} size="3x" />
              </View>
              <Text style={styles.iconLabel}>HOME</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.iconLabelRow}
            onPress={() => this.redirect("/settings")}
          >
            <View style={[styles.iconLabelRowSubsequent]}>
              <View>
                <FontAwesomeIcon icon={["fas", "cog"]} size="3x" />
              </View>
              <Text style={styles.iconLabel}>SETTINGS</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.iconLabelRow}
            onPress={() => this.redirect("/accounts")}
          >
            <View style={[styles.iconLabelRowSubsequent]}>
              <View>
                <FontAwesomeIcon icon={["fas", "swatchbook"]} size="3x" />
              </View>
              <Text style={styles.iconLabel}>ACCOUNTS</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.iconLabelRow}
            onPress={() => this.redirect("/transactions")}
          >
            <View style={[styles.iconLabelRowSubsequent]}>
              <View>
                <FontAwesomeIcon icon={["fas", "history"]} size="3x" />
              </View>
              <Text style={styles.iconLabel}>TRANSACTIONS</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default Menu;

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
