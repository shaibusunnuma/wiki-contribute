import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feed, EntityProperties, MissingProperties } from "../Screens";

const FeedStack = createNativeStackNavigator();

export const FeedStackScreen = () => (
    <FeedStack.Navigator initialRouteName="Feed">
        <FeedStack.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
        <FeedStack.Screen name="Properties" component={EntityProperties} options={{ title: "Properties" }} />
        <FeedStack.Screen
            name="MissingProperties"
            component={MissingProperties}
            options={{ title: "Missing Properties" }}
        />
    </FeedStack.Navigator>
);
