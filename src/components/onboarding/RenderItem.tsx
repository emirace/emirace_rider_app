import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import { OnboardingItem } from '../../Screens/Onboarding';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const WIDTH = Dimensions.get('screen').width;

const RenderItem = ({
  item,
  index,
  x,
}: {
  item: OnboardingItem;
  index: number;
  x: SharedValue<number>;
}) => {
  const circleAnimatiin = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
      [1, 4, 4],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <View style={styles.content}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={item.backgroundImage}
          style={[styles.backgroundImage]}
        />
        <LinearGradient
          colors={['transparent', '#000000']}
          style={styles.gradient}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>{item.header}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: WIDTH,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: WIDTH,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 150,
  },
  textContainer: {
    marginBottom: 30,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    // textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'white',
    // textAlign: 'center',
  },
});

export default RenderItem;
