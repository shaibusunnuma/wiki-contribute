import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FormItem } from "react-native-form-component";
import { Circle } from "react-native-animated-spinkit";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { WikiContext } from "../../Context";

export default ({
    createProperty,
    value,
    setValue,
    isError,
    success,
    toggleModal,
    loading,
    setPropertyID,
    feedback,
}) => {
    const [suggestionsList, setSuggestionsList] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const dropdownController = React.useRef(null);
    const searchRef = React.useRef(null);
    const { propertySuggestionsList } = React.useContext(WikiContext);

    const getSuggestions = React.useCallback(async (text) => {
        if (typeof text !== "string" || text.length < 3) {
            setSuggestionsList(null);
            return;
        }
        setIsLoading(true);
        let i = 0;
        let suggestions = [];
        for (let item of propertySuggestionsList) {
            const itemlabel = item.title.toLowerCase();
            if (itemlabel.indexOf(text.toLowerCase()) > -1) {
                ++i;
                suggestions.push(item);
            }
            if (i === 100) break;
        }
        setSuggestionsList(suggestions);
        setIsLoading(false);
    }, []);

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
                    <Text style={{ fontWeight: "bold" }}>Property</Text>
                    <AutocompleteDropdown
                        // ref={searchRef}
                        clearOnFocus={false}
                        closeOnSubmit={false}
                        controller={(controller) => {
                            dropdownController.current = controller;
                        }}
                        dataSet={suggestionsList}
                        onChangeText={getSuggestions}
                        onSelectItem={(item) => {
                            item && setPropertyID(item.id);
                        }}
                        onClear={() => setPropertyID("")}
                        debounce={600}
                        loading={isLoading}
                        useFilter={false}
                        textInputProps={{
                            placeholder: "Start typing to see suggestions",
                            autoCorrect: false,
                            autoCapitalize: "none",
                            style: {
                                backgroundColor: "#fff",
                                color: "#000",
                                paddingLeft: 10,
                            },
                        }}
                        rightButtonsContainerStyle={{
                            right: 0,
                            top: 0,
                            backgroundColor: "#fff",
                        }}
                        containerStyle={{ paddingBottom: 20 }}
                    />
                    <FormItem
                        label="Value"
                        textInputStyle={styles.input}
                        isRequired
                        value={value}
                        onChangeText={(value) => setValue(value)}
                        asterik
                    />
                    <TouchableOpacity style={styles.button} onPress={createProperty}>
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
        // zIndex: 100,
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
