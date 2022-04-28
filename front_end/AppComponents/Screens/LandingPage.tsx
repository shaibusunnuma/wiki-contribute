import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from "react-native";

const image = require("../../assets/bg.jpg");

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.topContainer}>
          <Text style={styles.appName}>WikiContribute</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Create account")}
        >
          <Text style={styles.text}>Log into Wikidata to edit</Text>
        </TouchableOpacity>
        <Pressable
          onPress={() => console.log("navigation")}
          style={{ padding: 10 }}
        >
          <Text style={{ color: "white" }}>I just want to browse</Text>
        </Pressable>
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
    fontSize: 30,
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
