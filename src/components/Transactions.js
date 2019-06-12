import React, { Component } from "react";
import { Text, View } from "react-native";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const FindTransactionsQuery = gql`
  query findTransactions($accountNumber: String!) {
    findTransactions(
      accountNumber: $accountNumber
      startDate: "20190604"
      endDate: "20190607"
    ) {
      id
      symbol
      netValueEffect
      price
      executedAt
    }
  }
`;

const Transactions = props => (
  <View>
    <Query
      query={FindTransactionsQuery}
      variables={{ accountNumber: props.match.params.accountNumber }}
    >
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>${error.message}</div>;

        return <Text>{data.findTransactions[1].symbol}</Text>;
      }}
    </Query>
  </View>
);

export default Transactions;
