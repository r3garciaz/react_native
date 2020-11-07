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
                flex: 1,
                flexDirection: "row",
              }}>
                <View style={{ width: '50%' }}>
                  <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet perspiciatis mollitia sed blanditiis itaque enim, corrupti commodi porro aperiam modi tempore nobis dolore eaque officiis ullam laborum reiciendis dolorum cum, necessitatibus eligendi qui nulla quos. Inventore, eius iusto. Est, nobis nesciunt. Fugiat temporibus porro numquam asperiores, molestias possimus modi autem.
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam doloremque sunt rerum inventore? Aspernatur nobis quod sunt praesentium, temporibus iure fugiat dolore corrupti nesciunt voluptate reiciendis numquam nemo eos officia animi neque quo sint! Reiciendis vitae voluptatem esse enim impedit! Accusamus voluptates ut sapiente veritatis est qui harum ex quaerat.                </Text>
                </View>
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
