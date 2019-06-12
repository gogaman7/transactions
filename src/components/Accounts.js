import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Redirect } from "./Routing.native";

import { Query } from "react-apollo";
import gql from "graphql-tag";

// our libs
const config = require("../lib/config").default;

const GetAccountsQuery = gql`
  query {
    getAccounts {
      accountNumber
      accountTypeName
    }
  }
`;

const AccountRow = props => (
  <TouchableHighlight
    style={styles.button}
    onPress={() => props.onPress(props.account.accountNumber)}
  >
    <Text>{props.account.accountTypeName}</Text>
  </TouchableHighlight>
);

const AccountsList = props => (
  <View style={styles.accountList}>
    {props.accounts.map(a => (
      <AccountRow key={a.accountNumber} onPress={props.onPress} account={a} />
    ))}
  </View>
);

class Accounts extends Component {
  constructor(props) {
    super(props);

    var haveNoBackPath = false;
    if (!this.props.backPath) {
      haveNoBackPath = true;
    }

    this.state = {
      haveNoBackPath,
      allDone: false
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress(acountNumber) {
    console.log(`selected account with acountNumber: ${acountNumber}`);
    config.setSelectedAccountNumber(acountNumber);
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

    return (
      <Query query={GetAccountsQuery}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>${error.message}</div>;

          return (
            <View>
              <View style={styles.accountListHeader}>
                <Text>Select account</Text>
              </View>
              <AccountsList
                onPress={this.onPress}
                accounts={data.getAccounts}
              />
            </View>
          );
        }}
      </Query>
    );
  }
}

export default Accounts;

const styles = StyleSheet.create({
  accountListHeader: {
    padding: 10,
    marginBottom: 50
  },
  accountList: {
    paddingBottom: 20,
    marginLeft: 50
  },
  button: {
    alignItems: "flex-start",
    //backgroundColor: "#0DA0A0",
    padding: 10,
    width: 300,
    marginBottom: 20
  }
});
