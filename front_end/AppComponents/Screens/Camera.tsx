import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ImageBackground } from "react-native";
import { MaterialIcons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";

export default function ({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState<any>(null);
    let camera: Camera;

    const __takePicture = async () => {
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            setPreviewVisible(true);
            setCapturedImage(data);
        }
    };

    // const __savePhoto = async () => {
    //   if (capturedImage) {
    //     const asset = await MediaLibrary.createAssetAsync(capturedImage.uri);
    //     console.log(asset);
    //   }
    // };

    const __toggleFlash = () => {
        if (flash === Camera.Constants.FlashMode.off) {
            setFlash(Camera.Constants.FlashMode.on);
        } else if (flash === Camera.Constants.FlashMode.on) {
            setFlash(Camera.Constants.FlashMode.off);
        } else {
            setFlash(Camera.Constants.FlashMode.auto);
        }
    };

    const __retakePicture = () => {
        setPreviewVisible(false);
        setCapturedImage(null);
    };

    const __toggleCamera = () => {
        setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera. Allow access to camera in settings.</Text>;
    }
    return (
        <SafeAreaView style={styles.container}>
            {previewVisible && capturedImage ? (
                <CameraPreview
                    photo={capturedImage}
                    //savePhoto={__savePhoto}
                    retakePicture={__retakePicture}
                    navigation={navigation}
                />
            ) : (
                <Camera
                    ref={(r) => {
                        camera = r;
                    }}
                    style={styles.camera}
                    type={type}
                    flashMode={flash}
                >
                    <View style={styles.sideContainer}>
                        <TouchableOpacity onPress={__toggleFlash}>
                            <Entypo
                                name="flash"
                                size={30}
                                color={flash === Camera.Constants.FlashMode.on ? "#F7CA18" : "white"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={__toggleCamera}
                            style={{
                                marginTop: 20,
                            }}
                        >
                            <MaterialIcons name="flip-camera-ios" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.closeContainer}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <Entypo name="cross" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View
                            style={{
                                alignSelf: "center",
                                flex: 1,
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity onPress={__takePicture} style={styles.capturebutton} />
                        </View>
                    </View>
                </Camera>
            )}
        </SafeAreaView>
    );
}

const CameraPreview = ({ photo, retakePicture, navigation }) => {
    return (
        <View
            style={{
                backgroundColor: "transparent",
                flex: 1,
                width: "100%",
                height: "100%",
            }}
        >
            <ImageBackground
                source={{ uri: photo && photo.uri }}
                style={{
                    flex: 1,
                }}
            >
                <View style={styles.closeContainer}>
                    <TouchableOpacity style={styles.closebutton} onPress={() => navigation.pop()}>
                        <Entypo name="cross" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomContainer}>
                    <View
                        style={{
                            alignSelf: "flex-end",
                            flex: 1,
                            alignItems: "center",
                        }}
                    ></View>
                    <View
                        style={{
                            alignSelf: "center",
                            flex: 1,
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity onPress={() => {}} style={styles.submitbutton}>
                            <Text style={styles.text}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            alignSelf: "flex-end",
                            flex: 1,
                            alignItems: "flex-end",
                        }}
                    >
                        <TouchableOpacity onPress={retakePicture} style={styles.retakebutton}>
                            <MaterialCommunityIcons name="camera-retake" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    camera: {
        flex: 1,
    },
    bottomContainer: {
        position: "absolute",
        bottom: 10,
        flexDirection: "row",
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        padding: 20,
        justifyContent: "space-between",
    },
    sideContainer: {
        position: "absolute",
        right: "5%",
        top: "5%",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "black",
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 20,
    },
    closeContainer: {
        position: "absolute",
        left: "5%",
        top: "5%",
    },
    capturebutton: {
        width: 70,
        height: 70,
        bottom: 0,
        borderRadius: 50,
        backgroundColor: "#fff",
    },
    submitbutton: {
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 50,
        elevation: 3,
        backgroundColor: "#fff",
    },
    retakebutton: {
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        width: 60,
        paddingHorizontal: 0,
        borderRadius: 50,
        backgroundColor: "#fff",
    },
    closebutton: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
    },
    text: {
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
    },
});
