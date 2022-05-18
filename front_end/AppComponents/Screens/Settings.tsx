import React from "react";
import Modal from "react-native-modal";
import { WikiContext } from "../../Context";
import createAlert from "../CommonComponents/Alert";
import EditQueryRangeForm from "../CommonComponents/EditQueryRangeForm";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet } from "react-native";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import { SectionRow, SettingsPage, NavigateRow, BaseRow, SwitchRow } from "react-native-settings-view";
import EditProfile from "../CommonComponents/EditProfileForm";

export default ({ navigation }) => {
    const {
        clearCache,
        username,
        queryRange,
        setAnonymous,
        setTrackLocation,
        entitiesCacheSize,
        propertiesCacheSize,
        SetQueryRange,
        setUserCredentials,
    } = React.useContext(WikiContext);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [modalType, setModalType] = React.useState("cache");
    const [userNameValue, setUserNameValue] = React.useState(username);
    const [passwordValue, setPasswordValue] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState("no error");
    const [cacheSize, setCacheSize] = React.useState(((propertiesCacheSize + entitiesCacheSize) / 1048576).toFixed(3));

    const toggleHandler = (type: string) => {
        setIsModalVisible(!isModalVisible);
        setModalType(type);
    };

    const toggleProfileModal = () => {
        setIsModalVisible(!isModalVisible);
        setModalType("Profile");
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
        }
    };

    const clearCacheHandler = (cacheInstance: string) => {
        clearCache(cacheInstance);
        if (cacheInstance === "all") setCacheSize("0.00");
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    React.useEffect(() => {
        //console.log("entitiesCacheSize", entitiesCacheSize);
        setCacheSize(((propertiesCacheSize + entitiesCacheSize) / 1048576).toFixed(3));
    }, [entitiesCacheSize, propertiesCacheSize]);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
            <TouchableOpacity onPress={toggleProfileModal} style={styles.userInfoSection}>
                <View style={{ flexDirection: "row", marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
                        }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title
                            style={[
                                styles.title,
                                {
                                    marginTop: 15,
                                    marginBottom: 5,
                                },
                            ]}
                        >
                            {username}
                        </Title>
                        <Caption style={styles.caption}>@j_doe</Caption>
                    </View>
                </View>
            </TouchableOpacity>
            <SettingsPage style={{ flex: 1 }}>
                <SectionRow>
                    <NavigateRow
                        text="Privacy Policy"
                        leftIcon={{
                            name: "folder-lock",
                            type: "material-community",
                        }}
                        onPress={() => console.log("policy")}
                    />
                    <NavigateRow
                        text="Contact us"
                        leftIcon={{
                            name: "users",
                            type: "font-awesome",
                        }}
                        onPress={() => console.log("contact")}
                    />
                    <BaseRow
                        text="Query range"
                        leftIcon={{
                            name: "globe",
                            type: "font-awesome",
                        }}
                        rightContent={
                            <View style={{ width: 100 }}>
                                <Text style={{ textAlign: "right" }}>{queryRange}</Text>
                            </View>
                        }
                        onPress={() => toggleHandler("queryRange")}
                    />
                    <SwitchRow
                        text="Track location"
                        disabled
                        leftIcon={{
                            name: "my-location",
                            type: "material-icons",
                        }}
                        onValueChange={(isEnabled: boolean) => setTrackLocation(isEnabled)}
                    />
                    <SwitchRow
                        text="Anonymouse mode"
                        disabled
                        leftIcon={{
                            name: "account-cowboy-hat",
                            type: "material-community",
                        }}
                        onValueChange={(isEnabled: boolean) => setAnonymous(isEnabled)}
                    />
                    <BaseRow
                        text="Clear Cache"
                        leftIcon={{
                            name: "brush",
                            type: "material-community-icons",
                        }}
                        rightContent={
                            <View style={{ width: 100 }}>
                                <Text style={{ textAlign: "right" }}>{cacheSize} GB</Text>
                            </View>
                        }
                        onPress={() => toggleHandler("cache")}
                    />
                    <BaseRow
                        text="Sign Out"
                        style={{ paddingVertical: 5 }}
                        rightContent={<FontAwesome name="sign-out" size={24} color="black" />}
                        onPress={() => console.log("Sign Out")}
                    />
                </SectionRow>
            </SettingsPage>
            <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "gray" }}>Version v1.0.0</Text>
            </View>
            <Modal isVisible={isModalVisible}>
                <View>
                    {modalType === "queryRange" && (
                        <EditQueryRangeForm toggleModal={toggleModal} SetQueryRange={SetQueryRange} />
                    )}
                    {modalType === "cache" && (
                        <CacheView
                            propertiesCacheSize={propertiesCacheSize}
                            entitiesCacheSize={entitiesCacheSize}
                            clearCache={clearCacheHandler}
                            toggleModal={toggleModal}
                        />
                    )}
                    {modalType === "Profile" && (
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
                    )}

                    <View style={{ padding: 10, alignItems: "center" }}>
                        <TouchableOpacity onPress={toggleModal}>
                            <Ionicons name="close-circle-outline" size={50} color="#cccccc" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const CacheView = ({ propertiesCacheSize, entitiesCacheSize, clearCache, toggleModal }) => {
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
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: "500",
    },
});
