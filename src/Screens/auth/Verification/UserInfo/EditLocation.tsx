import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Appbar, Icon, Text, TextInput } from 'react-native-paper';
import Button from '../../../../components/Button';
import { EditLocationNavigationProp } from '../../../../type/navigation/stack';

const EditLocation: React.FC<EditLocationNavigationProp> = ({ navigation }) => {
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
          title="Edit your address"
        />
      </Appbar.Header>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          Please enter address as it appears on your prove of address documenet
        </Text>
        <TextInput
          label="Number"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />
        <TextInput
          label="Street"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />

        <TextInput
          label="Landmark"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />
        <TextInput
          label="Local Government Area"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />
        <TextInput
          label="State"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Add prove of address
          </Text>
          <View style={styles.inputImage}>
            <Icon size={20} source={'image'} />
          </View>
        </View>
      </ScrollView>
      <Button
        mode="contained"
        style={{ marginBottom: 30, marginHorizontal: 20 }}
      >
        Save
      </Button>
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

export default EditLocation;
