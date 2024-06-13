import { View, Text } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { NotificationNavigationProp } from '../type/navigation/drawer';

const Notification: React.FC<NotificationNavigationProp> = ({ navigation }) => {
  return (
    <View>
      <Appbar.Header mode="medium">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          titleStyle={{
            fontSize: 30,
            fontWeight: 'bold',
          }}
          title="Notification"
        />
      </Appbar.Header>
      <Text>Notification</Text>
    </View>
  );
};

export default Notification;
