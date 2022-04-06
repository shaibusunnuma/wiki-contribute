import React from 'react';
import { Text, SafeAreaView} from 'react-native';
import {Entity} from '../CustomTypes'

//@ts-ignore
export function EntityProperties({route}) {
  const {entity} = route.params;
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details</Text>
    </SafeAreaView>
  );
}

