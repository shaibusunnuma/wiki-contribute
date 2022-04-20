//@ts-nocheck
import "react-native-gesture-handler";
import * as React from "react";
import { ApolloProvider } from "@apollo/client";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { WikiProvider } from "./Context";
import Navigation from "./AppComponents/Navigation";
import client from "./GraphQL/Config";
import { RootStack } from "./AppComponents/Navigation/ScreenStacks";
import { StatusBar } from "react-native";

export default function App() {
  StatusBar.setBarStyle("dark-content", true);
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <WikiProvider>
          <NavigationContainer>
            <RootStack.Navigator id="rootStack" initialRouteName="Home">
              <RootStack.Screen
                name="Home"
                component={Navigation}
                options={{ headerShown: false }}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </WikiProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
