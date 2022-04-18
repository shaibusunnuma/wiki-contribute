import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ListItem } from "@rneui/base";
import type { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import {RootStackParamList, Entity} from '../CustomTypes'

export type Props = NativeStackScreenProps<RootStackParamList, 'Properties'>;

interface EntityListItemProps {
    entity: Entity;
    navigation: NativeStackNavigationProp<RootStackParamList, "Properties", undefined>;
    route: RouteProp<RootStackParamList, "Properties">;
    setQID: (qid: string) => void;

}

export default ({ entity, navigation, setQID }: EntityListItemProps) => (
  <ListItem 
    //@ts-ignore
    Component={TouchableOpacity}
    containerStyle={styles.itemContainer}
    onPress={() => {
      const placeValue = entity.place.value.split('/')
      setQID(placeValue[placeValue.length - 1]);
      navigation.navigate('Properties',{entity: entity})
    }}
    onLongPress={() => console.log("onLongPress()")}
  >
  <View style={styles.item}>
    <Text style={styles.title}>{entity.placeLabel.value}</Text>
  </View>
    
  </ListItem>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 1,
    marginHorizontal: 5,
  },
  item: {
      width: '100%',
      margin: 0
  },
  title: {
    fontSize: 18,
  },
})