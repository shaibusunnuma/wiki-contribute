import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { WikiContext } from "../../Context";

export default () => {
  const { username, password } = React.useContext(WikiContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
          }}
        />
        <Text style={styles.username}>username</Text>
        <Text>*********</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "white" },
  header: {
    backgroundColor: "#47a375",
    height: 200,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
    marginTop: 10,
  },
  username: {
    fontSize: 20,
  },
});
