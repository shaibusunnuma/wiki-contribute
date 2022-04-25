import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { FormItem } from "react-native-form-component";
import WikiContext from "../../Context";

export default function EditProfileForm() {
  const { setUserCredentials } = React.useContext(WikiContext);
  const [userNameValue, setUserNameValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  setUserCredentials(userNameValue, passwordValue);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text>
          Username and password are cached on your device and used to make
          edits.
        </Text>
      </View>
      <View>
        <FormItem
          label="Wikidata Username"
          textInputStyle={styles.input}
          showErrorIcon={false}
          value={userNameValue}
          onChangeText={(value) => setUserNameValue(value)}
        />
        <FormItem
          label="WikiData password"
          textInputStyle={styles.input}
          value={passwordValue}
          onChangeText={(value) => setPasswordValue(value)}
        />
        <Pressable
          style={styles.button}
          onPress={() => setUserCredentials(userNameValue, passwordValue)}
        >
          <Text style={styles.text}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

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
  info: {
    justifyContent: "center",
    paddingBottom: 10,
  },
});
