import { View, Text } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { HistoryNavigationProp } from '../type/navigation/drawer';

const History: React.FC<HistoryNavigationProp> = ({ navigation }) => {
  return (
    <View>
      <Appbar.Header mode="medium">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          titleStyle={{
            fontSize: 30,
            fontWeight: 'bold',
          }}
          title="Ride history"
        />
      </Appbar.Header>
      <Text>History</Text>
    </View>
  );
};

export default History;
