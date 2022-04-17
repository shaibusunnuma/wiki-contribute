import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './AppComponents/Search';
import {WikiProvider} from './Context';
import Navigation from './AppComponents/Navigation';

import { EntityProperties } from './AppComponents/Screens/EntityProperties';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
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
    </>
  );
}