//@ts-nocheck
import React from "react";
import { SafeAreaView, Dimensions, StyleSheet } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";

export default function Search({ searchFunction }) {
  return (
    <>
      <SafeAreaView style={styles.header_safe_area}>
        <SearchBar
          style={styles.search_bar}
          placeholder="Search here"
          onPress={() => console.log("search")}
          onChangeText={(text) => searchFunction(text)}
          onClearPress={() => searchFunction("")}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1,
  },
  search_bar: {
    marginBottom: 8,
  },
});
