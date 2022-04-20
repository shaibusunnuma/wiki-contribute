//@ts-nocheck
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../CustomTypes";
import { Feed, Notifications, Settings } from "../Screens";
import { EntityProperties } from "../Screens/EntityProperties";

const SettingsStack = createNativeStackNavigator();
const FeedStack = createNativeStackNavigator();
const NotificationStack = createNativeStackNavigator();
export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const FeedStackScreen = () => (
  <FeedStack.Navigator>
    <FeedStack.Screen
      name="Feed"
      component={Feed}
      options={{ headerShown: false }}
    />
    <FeedStack.Screen
      name="Properties"
      component={EntityProperties}
      options={{ title: "Properties" }}
    />
  </FeedStack.Navigator>
);

export const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="Settings" component={Settings} />
  </SettingsStack.Navigator>
);

export const NotificationsStackScreen = () => (
  <NotificationStack.Navigator>
    <NotificationStack.Screen name="Notifications" component={Notifications} />
  </NotificationStack.Navigator>
);
