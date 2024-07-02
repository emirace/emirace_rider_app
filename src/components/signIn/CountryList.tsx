import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Appbar, Searchbar, Text } from "react-native-paper";

interface Props {
  handleSelect: (value: string) => void;
  closeModal: () => void;
}
interface Countries {
  label: string;
  code: string;
  disabled?: boolean;
}

export const countryFlags: Record<string, any> = {
  "+234": require("../../../assets/images/flag.jpg"),
  "+1": require("../../../assets/images/us.png"),
};

export const countries: Countries[] = [
  { label: "Nigeria", code: "+234" },
  { label: "United State", code: "+1", disabled: true },
  // Add more countries as needed
];

const CountryList: React.FC<Props> = ({ closeModal, handleSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Countries[]>([]);
  const scrollY = new Animated.Value(0);

  //  // Function to render each item in the FlatList
  const renderItem = ({ item }: { item: Countries }) => (
    <TouchableOpacity
      style={[styles.dropdownItem, item.disabled && { opacity: 0.3 }]}
      onPress={() => {
        if (item.disabled) return;
        handleSelect(item.code);
        closeModal();
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={countryFlags[item.code]} style={styles.flagIcon} />
        <Text style={{ fontSize: 20 }}>{item.label}</Text>
      </View>
      <Text style={{ fontSize: 20 }}>{item.code}</Text>
    </TouchableOpacity>
  );

  // Update filteredData when searchQuery changes
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = countries.filter(
      (item) =>
        item.label.toLowerCase().includes(lowerCaseQuery) ||
        item.code.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ zIndex: 10 }}>
        <Appbar.BackAction onPress={closeModal} />
        <Appbar.Content
          title="Select your Country"
          titleStyle={{ fontWeight: "bold" }}
        />
      </Appbar.Header>
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <Animated.View
          style={[
            styles.searchBarContainer,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 100], // Adjust the range as needed
                    outputRange: [0, -90], // Adjust the translateY value as needed
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </Animated.View>
        {filteredData.length === 0 ? (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>No countries found.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.label}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, paddingTop: 70 }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    zIndex: 2,
  },
  noResultContainer: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
  },
  noResultText: {
    fontSize: 18,
    // fontWeight: 'bold',
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  flagIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    borderRadius: 15,
  },
});

export default CountryList;
