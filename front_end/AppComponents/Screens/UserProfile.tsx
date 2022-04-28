import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Modal from "react-native-modal";
import { WikiContext } from "../../Context";
import EditProfile from "../CommonComponents/EditProfileForm";
import { Ionicons } from "@expo/vector-icons";

export default () => {
  const { username, setUserCredentials } = React.useContext(WikiContext);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [userNameValue, setUserNameValue] = React.useState(username);
  const [passwordValue, setPasswordValue] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState("no error");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setIsError("no error");
    setSuccess(false);
    setUserNameValue("");
    setPasswordValue("");
  };

  const handleSubmit = () => {
    if (!userNameValue || !passwordValue) {
      setIsError("Username and password are required");
    } else {
      setUserCredentials(userNameValue, passwordValue);
      setSuccess(true);
    }
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
        <EditProfile
          userNameValue={userNameValue}
          passwordValue={passwordValue}
          setUserNameValue={setUserNameValue}
          setPasswordValue={setPasswordValue}
          handleSubmit={handleSubmit}
          isError={isError}
          success={success}
          toggleModal={toggleModal}
        />
        <View style={{ padding: 10, alignItems: "center" }}>
          <TouchableOpacity onPress={toggleModal}>
            {/* @ts-ignore */}
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
