import { View, StyleSheet, Animated, Easing, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Divider,
  Icon,
  List,
  Text,
  useTheme,
} from "react-native-paper";
import Button from "./Button";
import * as Progress from "react-native-progress";
import { useRide } from "../context/Ride";

interface Props {
  closeCall: () => void;
}

const WIDTH = Dimensions.get("screen").width;

const CallScreen: React.FC<Props> = ({ closeCall }) => {
  const { colors } = useTheme();
  const { acceptRide, rejectRide, currentRide, loading } = useRide();
  const bounceValue = React.useRef(new Animated.Value(1)).current;
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const updateProgress = () => {
      Animated.timing(animatedProgress, {
        toValue: 1,
        duration: 10000, // Total duration for the progress to reach 1 (10 seconds)
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(declineCall);
    };

    updateProgress();

    return () => {
      animatedProgress.stopAnimation(); // Stop any running animation on unmount
    };
  }, [animatedProgress]);

  useEffect(() => {
    startBounceAnimation(); // Start the bouncing animation on mount
  }, []);

  const startBounceAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.bounce,
        }),
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const acceptCall = async () => {
    if (currentRide) {
      await acceptRide(currentRide?._id);
      closeCall();
    }
  };
  const declineCall = async () => {
    if (currentRide) {
      await rejectRide(currentRide?._id);
      closeCall();
    }
  };

  return (
    <>
      <Animated.View
        style={{
          height: 5,
          width: animatedProgress.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
          }),
          backgroundColor: colors.primary,
          borderRadius: 10,
        }}
      />
      <View style={{ padding: 20, gap: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Avatar.Image
              source={{
                uri: currentRide?.passenger.image,
              }}
            />
            <View>
              <Text>{currentRide?.passenger.name}</Text>
              <Text>{currentRide?.passenger.rating}</Text>
            </View>
          </View>
          <Icon source="phone" size={30} />
        </View>

        <List.Item
          title="Pick Up"
          description="See how far you have gone today"
          titleStyle={styles.titleStyle}
          descriptionStyle={styles.description}
          left={(props) => <List.Icon {...props} icon="timer" />}
          // right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 20,
          }}
        >
          <Button onPress={declineCall}>Decline</Button>
          <Animated.View style={{ transform: [{ scale: bounceValue }] }}>
            <Button
              onPress={acceptCall}
              mode="contained"
              style={{ width: 200 }}
            >
              Accept
            </Button>
          </Animated.View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: "600",
    fontSize: 18,
    textTransform: "capitalize",
    paddingVertical: 10,
  },
  description: {
    fontSize: 18,
  },
});

export default CallScreen;
