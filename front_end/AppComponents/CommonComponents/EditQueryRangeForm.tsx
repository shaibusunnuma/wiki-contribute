import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FormItem } from "react-native-form-component";
import { WikiContext } from "../../Context";

export default ({ toggleModal, SetQueryRange }) => {
  const [value, setValue] = React.useState("");
  // const { SetQueryRange } = React.useContext(WikiContext);

  return (
    <View style={styles.container}>
      <FormItem
        label="Query Range"
        textInputStyle={styles.input}
        isRequired
        showErrorIcon={false}
        value={value}
        onChangeText={(value) => setValue(value)}
        asterik
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          SetQueryRange(value);
          toggleModal();
        }}
      >
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  input: {
    paddingHorizontal: 10,
    height: 43,
    margin: 0,
    borderWidth: 0.5,
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
