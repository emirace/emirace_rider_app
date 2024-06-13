import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Platform,
  ImageSourcePropType,
  ViewToken,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ActivityIndicator,
  Button,
  Icon,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { OnboardingNavigationProp } from '../type/navigation/stack';
import useAuth from '../context/AuthContext';
import RenderItem from '../components/onboarding/RenderItem';
import Dot from '../components/onboarding/Dot';

export interface OnboardingItem {
  id: string;
  backgroundImage: ImageSourcePropType;
  header: string;
  description: string;
}

const data: OnboardingItem[] = [
  {
    id: '1',
    backgroundImage: require('../../assets/images/splash/splash01.jpg'),
    header: 'Welcome to Emirace',
    description:
      'Embark on a revolutionary shopping experience powered by cryptocurrencies.',
  },
  {
    id: '2',
    backgroundImage: require('../../assets/images/splash/splash02.jpg'),
    header: 'Trade and Exchange',
    description:
      'Easily buy, sell, and exchange cryptocurrencies. Seamlessly manage your digital assets and investments.',
  },
  {
    id: '3',
    backgroundImage: require('../../assets/images/splash/splash03.jpg'),
    header: 'Shop Anytime, Anywhere',
    description:
      'Discover the convenience of using cryptocurrencies for everyday purchases. From goods to services like data, airtime, and gift cards – RKings Exchange has it all.',
  },
];

const WIDTH = Dimensions.get('screen').width;

const Onboarding: React.FC<OnboardingNavigationProp> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme();
  const flatlistRef = useAnimatedRef<FlatList<OnboardingItem>>();
  const x = useSharedValue(0);
  const flatlistIndex = useSharedValue(0);

  const buttonAnimation = useAnimatedStyle(() => {
    return {
      width:
        flatlistIndex.value === data.length - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimation = useAnimatedStyle(() => {
    return {
      opacity:
        flatlistIndex.value === data.length - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatlistIndex.value === data.length - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  const textButtonAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:
            flatlistIndex.value === data.length - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
      opacity:
        flatlistIndex.value === data.length - 1 ? withTiming(1) : withTiming(0),
    };
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatlistIndex.value = viewableItems[0].index;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        ref={flatlistRef}
        data={data}
        renderItem={({ item, index }) => (
          <RenderItem index={index} item={item} x={x} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />

      <Image
        source={require('../../assets/adaptive-icon.png')}
        style={styles.logo}
        alt="logo"
      />
      <View
        style={{
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 40 : 10,
          left: 20,
          right: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={styles.paginationContainer}>
          {data.map((_, i) => (
            <Dot index={i} x={x} key={i} />
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            if (flatlistIndex.value < data.length - 1) {
              flatlistRef.current?.scrollToIndex({
                index: flatlistIndex.value + 1,
              });
            } else {
              navigation.push('SignIn');
            }
          }}
        >
          <Animated.View
            style={[
              styles.button,
              { backgroundColor: colors.primary },
              buttonAnimation,
            ]}
          >
            <Animated.Text style={[styles.textButton, textButtonAnimation]}>
              GET STARTED
            </Animated.Text>
            <Animated.View style={[styles.arrow, arrowAnimation]}>
              <Icon source={'arrow-right'} size={30} color="white" />
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingBottom: 200,
  },
  textContainer: {
    marginBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    // textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'white',
    // textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  activeDot: {},
  buttonsContainer: {
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerText: {
    color: 'white',
  },
  socialIconsContainer: {
    flexDirection: 'row',
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  skip: {
    fontWeight: '600',
    color: 'white',
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 50,
  },
  logo: {
    width: 100,
    height: 100,
    objectFit: 'contain',
    marginBottom: 40,
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arrow: {
    position: 'absolute',
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
  },
});

export default Onboarding;
