import React from "react";
import { useMutation } from "@apollo/client";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { FormItem } from "react-native-form-component";
import { CREATE_PROPERTY_MUTATION } from "../../GraphQL/Mutations";
import { WikiContext } from "../../Context";

export default () => {
  const [propertyID, setPropertyID] = React.useState("");
  const [value, setValue] = React.useState("");
  const { username, password, QID } = React.useContext(WikiContext);

  const [addProperty, { error }] = useMutation(CREATE_PROPERTY_MUTATION);

  //TODO: pass in user inputs
  const createProperty = () => {
    addProperty({
      variables: {
        username: "Shaibu108",
        password: "Brainiac@108",
        id: "Q494",
        property: "P196",
        value: "Q38",
      },
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FormItem
        label="Property ID"
        textInputStyle={styles.input}
        isRequired
        value={propertyID}
        onChangeText={(propertyID) => setPropertyID(propertyID)}
        asterik
      />
      <FormItem
        label="Value"
        textInputStyle={styles.input}
        isRequired
        value={value}
        onChangeText={(value) => setValue(value)}
        asterik
      />
      <Pressable style={styles.button} onPress={createProperty}>
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
