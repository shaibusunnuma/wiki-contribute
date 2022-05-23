import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FormItem } from "react-native-form-component";

export default function EditProfileForm({
    handleSubmit,
    userNameValue,
    passwordValue,
    setUserNameValue,
    setPasswordValue,
    isError,
    success,
    toggleModal,
}) {
    if (success) {
        return (
            <View style={[styles.container, { alignItems: "center" }]}>
                <Text style={{ padding: 10 }}>Update Successful</Text>
                <TouchableOpacity style={styles.button} onPress={toggleModal}>
                    <Text style={styles.text}>OK</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text>Username and password are cached on your device and used to make edits.</Text>
            </View>
            {isError !== "no error" && (
                <View style={styles.error}>
                    <Text style={{ color: "red" }}>{isError}</Text>
                </View>
            )}
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
                    secureTextEntry={true}
                    value={passwordValue}
                    onChangeText={(value) => setPasswordValue(value)}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
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
    error: {
        alignItems: "center",
    },
});
