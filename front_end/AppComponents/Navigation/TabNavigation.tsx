import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { FeedStackScreen } from "./ScreenStacks";
import { Map, Notifications, LandingPage, Settings } from "../Screens";
import { WikiContext } from "../../Context";
import { Snackbar } from "react-native-paper";

const Tab = createBottomTabNavigator();

export default (): JSX.Element => {
    const { login, showSnackBar, snackBarMessage, setShowSnackBar } = React.useContext(WikiContext);
    if (!login) {
        return <LandingPage />;
    }
    return (
        <>
            <Tab.Navigator
                id="tabStack"
                initialRouteName="MapTab"
                screenOptions={{
                    tabBarStyle: { backgroundColor: "#006699" },
                }}
            >
                <Tab.Screen
                    name="MapTab"
                    component={Map}
                    options={{
                        tabBarLabel: "Map",
                        headerShown: false,
                        tabBarActiveTintColor: "white",
                        tabBarInactiveTintColor: "#81BAD6",
                        tabBarIcon: ({ color }) => <Entypo name="location" size={26} color={color} />,
                        title: "Map",
                    }}
                />

                <Tab.Screen
                    name="FeedTab"
                    component={FeedStackScreen}
                    options={{
                        headerShown: false,
                        tabBarLabel: "List",
                        tabBarActiveTintColor: "white",
                        tabBarInactiveTintColor: "#81BAD6",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={26} />
                        ),
                    }}
                />

                {/* <Tab.Screen
                    name="NotificationsTab"
                    component={Notifications}
                    options={{
                        tabBarLabel: "Updates",
                        tabBarActiveTintColor: "white",
                        tabBarInactiveTintColor: "#81BAD6",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bell" color={color} size={26} />,
                        title: "Notifications",
                    }}
                /> */}
                <Tab.Screen
                    name="SettingsTab"
                    component={Settings}
                    options={{
                        tabBarLabel: "Settings",
                        tabBarActiveTintColor: "white",
                        tabBarInactiveTintColor: "#81BAD6",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" color={color} size={26} />,
                        title: "Settings",
                    }}
                />
            </Tab.Navigator>
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
                duration={4000}
                action={{
                    label: "Dismiss",
                    onPress: () => setShowSnackBar(false),
                }}
            >
                {snackBarMessage}
            </Snackbar>
        </>
    );
};
