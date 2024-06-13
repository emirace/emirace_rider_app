import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useTheme } from 'react-native-paper';

const WIDTH = Dimensions.get('screen').width;
interface Prop {
  index: number;
  x: SharedValue<number>;
}

const Dot = ({ index, x }: Prop) => {
  const { colors } = useTheme();
  const animateDotStyle = useAnimatedStyle(() => {
    const width = interpolate(
      x.value,
      [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
      [10, 20, 10],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      x.value,
      [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );
    return { width, opacity };
  });
  return (
    <Animated.View
      style={[
        styles.paginationDot,
        animateDotStyle,
        { backgroundColor: colors.primary },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
});

export default Dot;
