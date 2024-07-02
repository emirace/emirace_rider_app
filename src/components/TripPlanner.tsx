import { View, StyleSheet } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { Appbar, List, Text } from "react-native-paper";
import { Ride } from "../type/ride";
import { calculateDistance } from "../utils/ride";
import { useLocation } from "../context/Location";

interface Props {
  closePlanner: () => void;
  rides: Ride[];
}

const sortedRidesByProximity = (
  rides: Ride[],
  userLocation: { lat: number; lng: number }
) => {
  const originRides = rides.map((ride) => ({
    ...ride,
    type: "origin",
    location: ride.origin.location,
  }));
  const destinationRides = rides.map((ride) => ({
    ...ride,
    type: "destination",
    location: ride.destination.location,
  }));

  const combinedRides = [...originRides, ...destinationRides];

  return combinedRides.sort((a, b) => {
    const distanceA = calculateDistance(userLocation, a.location);
    const distanceB = calculateDistance(userLocation, b.location);
    return distanceA - distanceB;
  });
};

const TripPlanner: React.FC<Props> = ({ closePlanner, rides }) => {
  const { location } = useLocation();
  const [sortedRides, setSortedRides] = useState<Ride[]>([]);

  useEffect(() => {
    if (location) {
      const userLocation = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
      const sorted = sortedRidesByProximity(rides, userLocation);
      setSortedRides(sorted);
    }
  }, [rides, location]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Action icon="chevron-down" onPress={closePlanner} />
        <Appbar.Content title="Trips" titleStyle={styles.titleStyle} />
      </Appbar.Header>
      <View style={styles.listContainer}>
        {sortedRides.length === 0 ? (
          <Text>No ride available</Text>
        ) : (
          sortedRides.map((ride) => (
            <List.Item
              title={ride.status}
              description={
                ride.type === "origin"
                  ? ride.origin.structured_formatting.main_text
                  : ride.destination.structured_formatting.main_text
              }
              titleStyle={styles.titleStyle2}
              onPress={() => {}}
              left={(props) => <List.Icon {...props} icon="account" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              key={ride._id}
            />
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  titleStyle2: {
    fontWeight: "600",
    fontSize: 18,
    paddingVertical: 10,
  },
});

export default TripPlanner;
