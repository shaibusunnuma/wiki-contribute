import React from "react";
import MapView, { Marker, Region, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { WikiContext } from "../../Context";
import { Fold } from "react-native-animated-spinkit";

import { Mark } from "../CustomTypes";

export default function Map({ navigation }) {
    const { region, entities, markers, setMarkers, setUserLocation } = React.useContext(WikiContext);

    // const onRegionChanged = (region: Region) => {
    //   setRegion(region);
    // }

    const createMarkers = () => {
        const markers: Mark[] = [];
        entities.forEach((entity) => {
            const marker: Mark = {
                coordinates: {
                    latitude: +entity.lat.value,
                    longitude: +entity.long.value,
                },
                title: entity.placeLabel.value,
                description:
                    entity.placeDescription === undefined ? entity.placeLabel.value : entity.placeDescription.value,
                QID: entity.place.value.split("/")[4], //TODO : replace hardcoded index.
            };
            markers.push(marker);
        });
        setMarkers(markers);
    };

    React.useEffect(() => {
        if (entities.length !== 0) {
            createMarkers();
        }
    }, [entities]);

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {region.latitude !== undefined ? (
                <MapView
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                    //onRegionChange={onRegionChanged}
                    initialRegion={region}
                >
                    {markers.map((marker, index) => {
                        return (
                            <Marker
                                key={index}
                                coordinate={marker.coordinates}
                                image={require("../../assets/marker_map_icon.png")}
                            >
                                <Callout
                                    tooltip
                                    onPress={() =>
                                        navigation.navigate("FeedTab", {
                                            screen: "Properties",
                                            initial: false,
                                            params: { entity: marker },
                                        })
                                    }
                                >
                                    <View style={styles.calloutView}>
                                        <Text>
                                            {marker.title.length > 15
                                                ? marker.title.slice(0, 15) + "..."
                                                : marker.title}
                                            {"\n"}
                                            {marker.description.length > 15
                                                ? marker.description.slice(0, 15) + "..."
                                                : marker.description}
                                        </Text>
                                    </View>
                                </Callout>
                            </Marker>
                        );
                    })}
                </MapView>
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ padding: 10 }}>
                        <Fold size={48} color="#006699" />
                    </View>
                    <Text>Loading WikiData...</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    calloutView: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 8,
    },
});
