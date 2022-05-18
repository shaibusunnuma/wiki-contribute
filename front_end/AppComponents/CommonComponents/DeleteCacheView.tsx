import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SectionRow, SettingsPage, BaseRow } from "react-native-settings-view";
import createAlert from "../CommonComponents/Alert";
import { MaterialIcons } from "@expo/vector-icons";

export default ({ propertiesCacheSize, entitiesCacheSize, clearCache, toggleModal }) => {
    return (
        <View style={styles.container}>
            <SettingsPage style={{ flex: 1 }}>
                <SectionRow>
                    <BaseRow
                        text="Clear cached Entities"
                        rightContent={
                            <View style={{ width: 100 }}>
                                <Text style={{ textAlign: "right" }}>{(entitiesCacheSize / 1024).toFixed(2)} MB</Text>
                            </View>
                        }
                        onPress={() => {
                            toggleModal();
                            createAlert(clearCache, "entitiesCache");
                        }}
                    />
                    <BaseRow
                        text="Clear cached Properties"
                        rightContent={
                            <View style={{ width: 100 }}>
                                <Text style={{ textAlign: "right" }}>{(propertiesCacheSize / 1024).toFixed(2)} MB</Text>
                            </View>
                        }
                        onPress={() => {
                            toggleModal();
                            createAlert(clearCache, "propertiesCache");
                        }}
                    />
                    <BaseRow
                        text="Clear All"
                        rightContent={<MaterialIcons name="delete-forever" size={34} color="black" />}
                        onPress={() => {
                            toggleModal();
                            createAlert(clearCache, "all");
                        }}
                    />
                </SectionRow>
            </SettingsPage>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 50,
        padding: 20,
        width: "100%",
        backgroundColor: "#ffffff",
        height: 180,
    },
});
