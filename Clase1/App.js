/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Touchable,
  TouchableHighlight,
  TouchableWithoutFeedback

} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex:1, backgroundColor: '#ecf0f1'}}>

      </SafeAreaView>
      {/* <Text>Hola</Text>
      <Button
        onPress={() => {
          console.log("Button press");
        }}
        title="Hola"
        color="#f1c40f"
      /> */}

    </>
  );
};



export default App;
