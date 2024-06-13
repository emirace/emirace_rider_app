import * as React from "react";
import { Image, ImageStyle, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { latitudeDelta, longitudeDelta } from "../../constant/locationDelta";
import { AnimatedRegion, Marker as MapMarker } from "react-native-maps";

export interface MarkerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  currentLocation: {
    latitude: number;
    longitude: number;
    heading: number | undefined;
  };
  imageUrl: string;
  rounded?: boolean;
}

/**
 * Describe your component here
 */
export const Marker: React.FC<MarkerProps> = ({
  currentLocation,
  imageUrl,
  rounded = false,
}) => {
  const coordinate = React.useRef<any>(
    new AnimatedRegion({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta,
      longitudeDelta,
    })
  ).current;
  const rotation = useSharedValue(0);
  React.useEffect(() => {
    if (currentLocation) {
      const { latitude, longitude } = currentLocation;
      const duration = 5000;

      coordinate
        .timing({
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
          duration,
          toValue: 0,
          useNativeDriver: false,
        })
        .start();

      // Animate rotation
      rotation.value = withTiming(currentLocation.heading ?? 0, {
        duration,
      });
    }
  }, [currentLocation]);
  const markerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  return (
    <MapMarker.Animated coordinate={coordinate} anchor={{ x: 0.5, y: 0.5 }}>
      <Animated.View
        style={[$markerContainer, rounded && $rounded, markerStyle]}
      >
        <Image
          source={{
            uri: imageUrl,
          }}
          style={$markerImage}
        />
      </Animated.View>
    </MapMarker.Animated>
  );
};

const $markerContainer: ViewStyle = {
  width: 20,
  height: 20,
};
const $rounded: ViewStyle = {
  borderRadius: 10,
  overflow: "hidden",
};
const $markerImage: ImageStyle = {
  width: "100%",
  height: "100%",
  resizeMode: "cover",
};
