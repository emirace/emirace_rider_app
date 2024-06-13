import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Appbar, Icon, Text, TextInput } from 'react-native-paper';
import Button from '../../../../components/Button';
import { EditFullNameNavigationProp } from '../../../../type/navigation/stack';

const EditFullName: React.FC<EditFullNameNavigationProp> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="medium">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          titleStyle={{
            fontSize: 30,
            fontWeight: 'bold',
          }}
          title="Edit full name"
        />
      </Appbar.Header>
      <View
        style={{
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <View>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>
            Please enter name as it appears on your identification documenet
          </Text>
          <TextInput
            label="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            style={styles.input}
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            style={styles.input}
          />

          <View>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
              NIN / Passport
            </Text>
            <View style={styles.inputImage}>
              <Icon size={20} source={'image'} />
            </View>
          </View>
        </View>
        <Button mode="contained" style={{ marginBottom: 30 }}>
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginBottom: 20,
  },
  inputImage: {
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    marginBottom: 30,
  },
});

export default EditFullName;
