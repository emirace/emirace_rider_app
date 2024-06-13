import { Platform, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import MapView, {
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { darkMap, lightMap } from "../../constant/map";
import useTheme from "../../context/ThemeContext";
import { useLocation } from "../../context/Location";
import { Marker } from "./Marker";

const Map = () => {
  const { themeMode } = useTheme();
  const mapViewRef = React.useRef<MapView | null>(null);
  const { location, heading } = useLocation();

  useEffect(() => {
    if (location && mapViewRef.current) {
      const region: Region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005, // Zoom closer to the location
        longitudeDelta: 0.005,
      };
      mapViewRef.current.animateToRegion(region, 1000); // Animate over 1 second
    }
  }, [location]);

  return (
    <MapView
      ref={mapViewRef}
      provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={styles.map}
      customMapStyle={themeMode === "dark" ? darkMap : lightMap}
      rotateEnabled={false}
    >
      {location && (
        <Marker
          currentLocation={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            heading: heading?.trueHeading,
          }}
          rounded
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjfC2G0DZgHsNbml5F0GoWhFS3eElD1aSYQiPNabQ&s"
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
