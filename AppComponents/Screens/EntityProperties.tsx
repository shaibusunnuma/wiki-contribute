import React from 'react';
import { Text, SafeAreaView} from 'react-native';
import {Entity} from '../CustomTypes'


export function EntityProperties(entity: Entity) {

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details</Text>
    </SafeAreaView>
  );
}

