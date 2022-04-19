import * as React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, from, HttpLink } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './AppComponents/CommonComponents/Search';
import {WikiProvider} from './Context';
import Navigation from './AppComponents/Navigation';
import { RootStackParamList } from './AppComponents/CustomTypes';
import { onError } from "@apollo/client/link/error";

import { EntityProperties } from './AppComponents/Screens/EntityProperties';

const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
            console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      )
    });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink])
});

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ApolloProvider client={client}>
    <SafeAreaProvider>
        <Search />
        <WikiProvider>
        <NavigationContainer>
          {/* @ts-ignore */}
          <RootStack.Navigator id="rootStack" initialRouteName="Home">
            <RootStack.Screen
              name="Home"
              component={Navigation}
              options={{ headerShown: false }}
            />
            <RootStack.Screen 
              name="Properties" 
              component={EntityProperties} 
              options={{ title: 'Properties' }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
        </WikiProvider>
    </SafeAreaProvider>
    </ApolloProvider>
  );
}