import { Alert } from "react-native";

export default (clearCache, cacheInstance) =>
  Alert.alert("Alert Title", "Are you sure you want to clear" + cacheInstance, [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () => {
        clearCache(cacheInstance);
        Alert.alert("Cache Cleared");
      },
    },
  ]);
