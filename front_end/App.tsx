import * as React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './AppComponents/CommonComponents/Search';
import {WikiProvider} from './Context';
import Navigation from './AppComponents/Navigation';
import { RootStackParamList } from './AppComponents/CustomTypes';

import { EntityProperties } from './AppComponents/Screens/EntityProperties';

const client = new ApolloClient({
  uri: 'localhost:3000/graphql',
  cache: new InMemoryCache()
});

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </SafeAreaProvider>
  );
}