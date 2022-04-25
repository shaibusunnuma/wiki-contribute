//@ts-nocheck
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import Modal from "react-native-modal";
import WikiContext from "../../Context";
import EditProfile from "../CommonComponents/EditProfileForm";
import { Ionicons } from "@expo/vector-icons";

export default () => {
  const { username, password } = React.useContext(WikiContext);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
          }}
        />
        <TouchableOpacity onPress={toggleModal}>
          <View style={styles.userInfo}>
            <Text style={styles.username}>{username}</Text>
            <Text>*********</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible}>
        <EditProfile />
        <View style={{ padding: 10, alignItems: "center" }}>
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons name="close-circle-outline" size={50} color="#cccccc" />
          </TouchableOpacity>
        </View>
      </Modal>
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
  userInfo: {
    alignItems: "center",
  },
});
