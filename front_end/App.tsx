import * as React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './AppComponents/CommonComponents/Search';
import {WikiProvider} from './Context';
import Navigation from './AppComponents/Navigation';

import { EntityProperties } from './AppComponents/Screens/EntityProperties';

const client = new ApolloClient({
  uri: 'localhost:3000/graphql',
  cache: new InMemoryCache()
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <Search />
        <WikiProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Navigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Properties" 
              component={EntityProperties} 
              options={{ title: 'Properties' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </WikiProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}