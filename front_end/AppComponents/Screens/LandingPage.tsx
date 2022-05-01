import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from "react-native";
import Modal from "react-native-modal";
import { WikiContext } from "../../Context";
import EditProfile from "../CommonComponents/EditProfileForm";
import { Ionicons } from "@expo/vector-icons";

const image = require("../../assets/bg.jpg");

export default function LandingPage() {
  const { username, setLogin, setUserCredentials } =
    React.useContext(WikiContext);
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
      setLogin(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <>
          <View style={styles.topContainer}>
            <Text style={styles.appName}>WikiContribute</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={toggleModal}>
            <Text style={styles.text}>Log into Wikidata to edit</Text>
          </TouchableOpacity>
          <Pressable onPress={() => setLogin(true)} style={{ padding: 10 }}>
            <Text style={{ color: "white" }}>I just want to browse</Text>
          </Pressable>
        </>
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#006699",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  appName: {
    fontSize: 40,
    color: "#a68929",
  },
  topContainer: {
    flex: 0.4,
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
