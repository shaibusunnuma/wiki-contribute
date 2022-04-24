import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { FormItem } from "react-native-form-component";

export default ({
  editProperty,
  oldValue,
  setOldValue,
  newValue,
  setNewValue,
}) => {
  return (
    <View style={styles.container}>
      <FormItem
        label="Old Value"
        textInputStyle={styles.input}
        isRequired
        value={oldValue}
        onChangeText={(value) => setOldValue(value)}
        asterik
      />
      <FormItem
        label="New Value"
        textInputStyle={styles.input}
        isRequired
        value={newValue}
        onChangeText={(value) => setNewValue(value)}
        asterik
      />
      <Pressable style={styles.button} onPress={editProperty}>
        <Text style={styles.text}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 50,
    padding: 20,
    backgroundColor: "#E6E6E6",
  },
  input: {
    paddingHorizontal: 10,
    height: 43,
    margin: 0,
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
});
