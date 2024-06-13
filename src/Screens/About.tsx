import { View, Text } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { AboutNavigationProp } from '../type/navigation/drawer';

const About: React.FC<AboutNavigationProp> = ({ navigation }) => {
  return (
    <View>
      <Appbar.Header mode="medium">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          titleStyle={{
            fontSize: 30,
            fontWeight: 'bold',
          }}
          title="About"
        />
      </Appbar.Header>
      <Text>About</Text>
    </View>
  );
};

export default About;
