import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { ListItem } from "@rneui/base";
import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { FeedStackParamList, Entity } from "../CustomTypes";

export type Props = NativeStackScreenProps<FeedStackParamList, "Properties">;

interface EntityListItemProps {
  entity: Entity;
  navigation: NativeStackNavigationProp<
    FeedStackParamList,
    "Properties",
    undefined
  >;
  setQID: (qid: string) => void;
}

export default ({ entity, navigation, setQID }: EntityListItemProps) => (
  <ListItem
    //@ts-ignore
    Component={TouchableOpacity}
    containerStyle={styles.itemContainer}
    onPress={() => {
      const placeValue = entity.place.value.split("/");
      setQID(placeValue[placeValue.length - 1]);
      navigation.push("Properties", { entity: entity });
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
    backgroundColor: "white",
    padding: 20,
    marginVertical: 1,
    marginHorizontal: 5,
  },
  item: {
    width: "100%",
    margin: 0,
  },
  title: {
    fontSize: 18,
  },
});
