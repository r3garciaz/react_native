import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Button, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../../components/Commons/TextInput';
import AddPhoto from '../../components/Photo/AddPhoto';
import {ThemeContext} from '../../context/Theme';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

class Summary extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);

    this.getFromStorage();

    this.state = {
      profileData: {
        name: null,
        email: null,
        phone: null,
      },
      photo: null,
    };
  }

  componentDidMount = async () => {
    this.getFromStorage();
  };

  getFromStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('@profile:key');
      if (data !== null) {
        this.setState({profileData: JSON.parse(data)});
      }
    } catch (error) {
      console.log('getFromStorage: ', error);
    }
  };

  setToStorage = async () => {
    try {
      const jsonValue = JSON.stringify(this.state.profileData);
      await AsyncStorage.setItem('@profile:key', jsonValue);
      Alert.alert('Perfil', '¡Guardado!');
    } catch (error) {
      console.log('setToStorage: ', error);
    }
  };

  updateProfile = async (id, valor) => {
    const newState = {
      ...this.state,
      profileData: {
        ...this.state.profileData,
        [id]: valor,
      },
    };
    this.setState(newState);
  };

  render() {
    const {
      mainTheme: {backgroundColor, textColor},
    } = this.context;

    return (
      <>
        <SafeAreaInsetsContext.Consumer>
          {(insets) => (
            <KeyboardAwareScrollView
              contentContainerStyle={[
                styles.container,
                {paddingTop: insets.top, backgroundColor},
              ]}>
              <AddPhoto uri={this.state?.photo} />
              <TextInput
                value={this.state?.profileData?.name}
                placeholder="Escribe tu nombre"
                labelTag="Nombre"
                autoCapitalize="words"
                onChange={(text) => this.updateProfile('name', text)}
              />
              <TextInput
                value={this.state?.profileData?.email}
                placeholder="Escribe tu correo"
                autoCapitalize="none"
                labelTag="Correo"
                onChange={(text) => this.updateProfile('email', text)}
              />
              <TextInput
                value={this.state?.profileData?.phone}
                placeholder="Escribe tu teléfono"
                labelTag="Teléfono"
                keyboardType="phone-pad"
                onChange={(text) => this.updateProfile('phone', text)}
              />
              <Button
                title="Guardar Perfil"
                onPress={() => this.setToStorage()}
                color={textColor}
              />
            </KeyboardAwareScrollView>
          )}
        </SafeAreaInsetsContext.Consumer>
      </>
    );
  }
}
export default Summary;
