import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { colors } from "./styles";

import { Redirect } from "./Routing.native";

// our libs
const config = require("../lib/config").default;

export default class Settings extends Component {
  constructor(props) {
    super(props);

    var haveNoBackPath = false;
    if (!this.props.backPath) {
      haveNoBackPath = true;
    }
    this.state = {
      uri: config.getUri() || "",
      token: config.getToken() || "",
      haveNoBackPath,
      allDone: false
    };

    this.setUri = this.setUri.bind(this);
    this.setToken = this.setToken.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
  }

  setUri(uri) {
    config.setUri(uri);
    this.setState({ uri: uri });
  }

  setToken(token) {
    config.setToken(token);
    this.setState({ token: token });
  }

  onBackPress() {
    this.setState({ allDone: true });
  }

  render() {
    if (this.state.haveNoBackPath) {
      return (
        <Text>This component needs to have backPath property configured</Text>
      );
    }

    // once we have allDone state, redirect back to what we were told to
    if (this.state.allDone) {
      return <Redirect to={this.props.backPath} />;
    }

    const allFieldsComplete = !!this.state.uri && !!this.state.token;

    // <Text>Configure your settings</Text>
    return (
      <View style={styles.container}>
        {allFieldsComplete && (
          <View style={styles.backButtonRow}>
            <Button
              onPress={this.onBackPress}
              title="Back"
              accessibilityLabel="Back button"
            />
          </View>
        )}
        <View style={styles.loginFieldRow}>
          <Text style={{ paddingRight: 20, width: 150 }}>GraphQL URL</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: 300
            }}
            // autoFocus={true}
            onChangeText={uri => this.setUri(uri)}
            value={this.state.uri}
          />
        </View>

        <View style={styles.loginFieldRow}>
          <Text style={{ paddingRight: 20, width: 150 }}>GraphQL token</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: 200
            }}
            autoFocus={false}
            secureTextEntry={true}
            onChangeText={token => this.setToken(token)}
            value={this.state.token}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100vh",
    backgroundColor: colors.grey,
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },

  loginFieldRow: {
    flexDirection: "row",
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20
  },

  backButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  }
});
