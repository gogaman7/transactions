import React from "react";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { AppRegistry } from "react-native";

import { Router, Switch, Route, Redirect } from "./components/Routing";

// our libs/components
import Transactions from "./components/Transactions";
import Accounts from "./components/Accounts";
import Settings from "./components/Settings";
import Screen from "./components/Screen";

const configHelper = require("./lib/config").default;

const customFetch = (uri, options) => {
  const newUri = configHelper.getUri();
  return fetch(newUri, options);
};

const httpLink = createHttpLink({ fetch: customFetch });

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: configHelper.getToken()
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
  // for SSR, use:
  // cache: new Cache().restore(window.__APOLLO_STATE__ || {})
});

const ApolloApp = () => (
  <Router>
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route
          path="/home"
          render={() => {
            if (!configHelper.hasRequiredSettings()) {
              return <Redirect to="/settings" />;
            } else if (!configHelper.hasSelectedAccountNumber()) {
              return <Redirect to="/accounts" />;
            } else {
              const transactionsPath = `/transactions/account/${configHelper.getSelectedAccountNumber()}`;
              return <Redirect to={transactionsPath} />;
            }
          }}
        />
        <Route
          path="/accounts"
          render={() => (
            <Screen>
              <Accounts backPath="/home" />
            </Screen>
          )}
        />
        } />
        <Route
          path="/transactions/account/:accountNumber"
          render={({ match }) => (
            <Screen>
              <Transactions match={match} />
            </Screen>
          )}
        />
        <Route
          path="/transactions"
          render={() => {
            const transactionsPath = `/transactions/account/${configHelper.getSelectedAccountNumber()}`;
            return <Redirect to={transactionsPath} />;
          }}
        />
        <Route
          path="/settings"
          render={() => (
            <Screen>
              <Settings backPath="/home" />
            </Screen>
          )}
        />
      </Switch>
    </ApolloProvider>
  </Router>
);

AppRegistry.registerComponent("ApolloApp", () => ApolloApp);

AppRegistry.runApplication("ApolloApp", {
  rootTag: document.getElementById("root")
});
