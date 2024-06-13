import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  TextInput,
  Text,
  Appbar,
  useTheme,
  IconButton,
  List,
  Divider,
} from 'react-native-paper';
import Button from '../../../../components/Button';
import { UserInfoNavigationProp } from '../../../../type/navigation/stack';

const UserInfo: React.FC<UserInfoNavigationProp> = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View>
      <Appbar.Header mode="medium">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          titleStyle={{
            fontSize: 30,
            fontWeight: 'bold',
          }}
          title="User Info"
        />
        <Button onPress={() => navigation.push('Vehicle')}>Save</Button>
      </Appbar.Header>
      <View
        style={[
          styles.imageContainer,
          { backgroundColor: colors.elevation.level1 },
        ]}
      >
        <Image src="" style={styles.image} />
        <Text style={styles.label}>Profile phone</Text>
        <IconButton icon="pen" style={styles.edit} />
      </View>
      <View style={{ padding: 20 }}>
        <List.Item
          title="Full name"
          description="Item description"
          onPress={() => navigation.push('EditFullName')}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={styles.label}
          descriptionStyle={styles.description}
        />
        <Divider />

        <List.Item
          title="email"
          description="Item description"
          onPress={() => navigation.push('EditEmail')}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={styles.label}
          descriptionStyle={styles.description}
        />
        <Divider />
        <List.Item
          title="location"
          description="Item description"
          onPress={() => navigation.push('EditLocation')}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={styles.label}
          descriptionStyle={styles.description}
        />
        <Divider />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    padding: 20,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 80,
    backgroundColor: 'black',
  },
  label: {
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'uppercase',
    paddingVertical: 10,
  },
  edit: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  description: {
    fontWeight: '600',
  },
});

export default UserInfo;
