/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import Counter from './components/Counter';


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <Counter />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;