import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Search from './AppComponents/Search';
import {MyTabs} from './AppComponents/Navigation/TabNavigation';
import {WikiProvider} from './Context/Context';

export default function App() {

  return (
    <>
      <Search />
      <NavigationContainer>
        <WikiProvider>
          <MyTabs />
        </WikiProvider>
      </NavigationContainer>
    </>
  );
}