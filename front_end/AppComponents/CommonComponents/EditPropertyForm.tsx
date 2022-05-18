import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FormItem } from "react-native-form-component";
import { Circle } from "react-native-animated-spinkit";

export default ({ editProperty, newValue, setNewValue, success, loading, toggleModal, isError, feedback }) => {
    if (success && !loading) {
        return (
            <View style={[styles.container, { alignItems: "center" }]}>
                <Text style={{ padding: 10 }}>{feedback}</Text>
                <TouchableOpacity style={styles.button} onPress={toggleModal}>
                    <Text style={styles.text}>OK</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={{ alignItems: "center" }}>
                    <Circle size={48} color="#006699" />
                </View>
            ) : (
                <>
                    {isError !== "no error" && (
                        <View style={styles.error}>
                            <Text style={{ color: "red" }}>{isError}</Text>
                        </View>
                    )}
                    <FormItem
                        label="New Value"
                        textInputStyle={styles.input}
                        isRequired
                        value={newValue}
                        onChangeText={(value) => setNewValue(value)}
                        asterik
                    />
                    <TouchableOpacity style={styles.button} onPress={editProperty}>
                        <Text style={styles.text}>Submit</Text>
                    </TouchableOpacity>
                </>
            )}
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
    error: {
        alignItems: "center",
    },
});
