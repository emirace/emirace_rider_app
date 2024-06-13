import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import { Text, Title, useTheme, Icon, Checkbox } from 'react-native-paper';
import CustomBackdrop from '../../components/CustomBackdrop';
import CountryList, { countryFlags } from '../../components/signIn/CountryList';
import { SignInNavigationProp } from '../../type/navigation/stack';
import Button from '../../components/Button';

const SignIn: React.FC<SignInNavigationProp> = ({ navigation }) => {
  const { colors } = useTheme();
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+234'); // Default country code
  const [privacy, setPrivacy] = useState(false);
  const [term, setTerm] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    }
  };

  const handleCountrySelect = (code: string) => {
    setCountryCode(code);
  };

  const handleContinuePress = () => {
    if (phone) {
      // Perform authentication or navigation logic here
      // For now, just show a snackbar
      navigation.push('Token', { phone });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'space-between', flex: 1 }}>
        <Image
          source={require('../../../assets/adaptive-icon.png')}
          style={styles.logo}
          alt="logo"
        />
        <View style={{ flex: 1 }}>
          <Title style={styles.header}>Enter your number</Title>

          <Text style={styles.instruction} variant="bodyLarge">
            Enter your phone number below and select the country code:
          </Text>

          <View
            style={[
              styles.inputContainer,
              { backgroundColor: colors.elevation.level5 },
            ]}
          >
            <TouchableOpacity
              style={styles.countryCodeButton}
              onPress={openBottomSheet}
            >
              <Image
                source={countryFlags[countryCode]}
                style={styles.flagIcon}
              />
              <Icon source={'chevron-down'} size={25} />
              <Text style={styles.countryCodeText}>{countryCode}</Text>
            </TouchableOpacity>
            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              keyboardType="phone-pad"
              style={[styles.phoneNumberInput, { color: colors.onBackground }]}
              cursorColor={colors.onBackground}
            />
          </View>
        </View>

        <View style={{ marginBottom: 30 }}>
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              I have read and accept the Privacy Policy and agree that my
              personal data will be processed by you
            </Text>
            <Checkbox.Android
              status={privacy ? 'checked' : 'unchecked'}
              onPress={() => {
                setPrivacy(!privacy);
              }}
            />
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              I have read and accept the Terms of Use
            </Text>
            <Checkbox.Android
              status={term ? 'checked' : 'unchecked'}
              onPress={() => {
                setTerm(!term);
              }}
            />
          </View>

          <Button
            mode="contained"
            onPress={handleContinuePress}
            style={styles.continueButton}
            uppercase
            contentStyle={{ height: 50 }}
            disabled={!phone || !privacy || !term}
          >
            Continue
          </Button>
        </View>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['100%']}
        backgroundStyle={{
          backgroundColor: colors.background,
        }}
        enablePanDownToClose={false}
        handleComponent={null}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
      >
        <CountryList
          closeModal={() => bottomSheetModalRef.current?.dismiss()}
          handleSelect={handleCountrySelect}
        />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  instruction: {
    marginBottom: 16,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 20,
    padding: 5,
  },
  phoneNumberInput: {
    flex: 2,
    marginRight: 8,
    fontSize: 30,
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  flagIcon: {
    width: 30,
    borderRadius: 15,
    height: 30,
  },
  countryCodeText: {
    fontSize: 30,
    marginLeft: 10,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 70, // Adjust as needed
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  continueButton: {
    marginTop: 30,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  listText: { fontWeight: '600', flex: 1 },
  logo: {
    width: 100,
    height: 100,
    objectFit: 'contain',
    marginVertical: 40,
    alignSelf: 'center',
  },
});

export default SignIn;
