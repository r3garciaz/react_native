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
  Image,
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
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            {/* <View style={styles.sectionContainer}> */}
            <View style={[
              styles.sectionContainer, {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }]} >
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <Text style={styles.sectionTopTitle}>Reinaldo García</Text>
                <Text style={styles.sectionTopSubTitle}>
                  37
                </Text>
              </View>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{
                  uri: 'https://picsum.photos/seed/picsum/200',
                }}
              />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={{ fontSize: 25, color: '#808080', marginBottom: 15 }}>Bio</Text>
              <Text style={{ fontSize: 30 }}>Desarrollador Informático</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={{ fontSize: 25, color: '#808080', marginBottom: 15 }}>Descripción</Text>
              <View style={{
                flex:1,
                // flexWrap: "wrap",
                flexDirection:"column",
                alignContent:"flex-start"
              }}>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus sequi animi eum corrupti, iste dignissimos nemo numquam rem sed aliquam placeat tempora excepturi nobis consequuntur reprehenderit nihil unde. Fuga commodi
                </Text>
                <Text>
                  laboriosam dolore aperiam, sapiente vero dolorum qui atque molestiae eveniet neque enim provident quibusdam amet esse nisi molestias placeat quam sequi voluptates illo eligendi libero iure! Dolorem saepe, quas culpa suscipit sed enim recusandae fugit laudantium fugiat labore quis. Laboriosam sit maiores amet illo atque ipsa exercitationem incidunt facilis consectetur pariatur! Error ad earum iusto. Pariatur numquam veniam architecto earum libero nesciunt totam sed corporis iste, eligendi sequi ad aspernatur.
              </Text>

              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  image: {
    borderRadius: 100,
    backgroundColor: 'gray',
    width: 90,
    height: 90,
  },
  body: {
    backgroundColor: '#a5a594',
  },
  sectionContainer: {
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTopTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: '400',
  },
  sectionTopSubTitle: {
    color: Colors.white,
    fontSize: 20,
  }
});

export default App;
