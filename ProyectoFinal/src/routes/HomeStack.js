import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/Home/Home';
import Charts from '../screen/Home/Charts';
import Indicators from '../screen/Home/Indicators';

const HomeStack = createStackNavigator();

const HomeNavigation = () => (
  <HomeStack.Navigator headerMode="none" initialRouteName="Indicators">
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Charts" component={Charts} />
    <HomeStack.Screen name="Indicators" component={Indicators} />
  </HomeStack.Navigator>
);

export default HomeNavigation;
