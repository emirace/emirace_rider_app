import { View, Text } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { SupportNavigationProp } from '../type/navigation/drawer';

const Support: React.FC<SupportNavigationProp> = ({ navigation }) => {
  return (
    <View>
      <Appbar.Header mode="medium">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          titleStyle={{
            fontSize: 30,
            fontWeight: 'bold',
          }}
          title="Support"
        />
      </Appbar.Header>
      <Text>Support</Text>
    </View>
  );
};

export default Support;
