import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SplashScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: '800',
  },
});

export default Splash;
