import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Appbar, Icon, Text, TextInput } from 'react-native-paper';
import Button from '../../../../components/Button';
import { VehicleImageNavigationProp } from '../../../../type/navigation/stack';

const VehicleImage: React.FC<VehicleImageNavigationProp> = ({ navigation }) => {
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
          title="Add vehicle photo"
        />
      </Appbar.Header>
      <ScrollView
        style={{
          paddingHorizontal: 20,
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          Please add a clear and acurate image
        </Text>
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Front View</Text>
          <View style={styles.inputImage}>
            <Icon size={20} source={'image'} />
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Rear View</Text>
          <View style={styles.inputImage}>
            <Icon size={20} source={'image'} />
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Side View</Text>
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

export default VehicleImage;
