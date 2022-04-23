//@ts-nocheck
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ListItem, Card } from "@rneui/base";

//@ts-ignore
export default ({ item, setModalType, setIsModalVisible }) => {
  const toggleModal = () => {
    setModalType("add");
    setIsModalVisible(true);
  };

  return (
    <ListItem containerStyle={styles.itemContainer}>
      <Card containerStyle={styles.card}>
        <View style={styles.top}>
          <Text style={styles.property}>{item.property}</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={toggleModal}>
            <MaterialCommunityIcons name="plus" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Card.Divider />
        <Text style={styles.value}>{item.label}</Text>
      </Card>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  card: {
    width: "100%",
    margin: 0,
  },
  property: {
    fontSize: 13,
  },
  value: {
    fontSize: 16,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
