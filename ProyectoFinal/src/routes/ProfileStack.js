import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Summary from '../screen/Profile/Summary';
import Camera from '../screen/Profile/Camera';

const ProfileStack = createStackNavigator();

const ProfileNavigation = () => (
  <ProfileStack.Navigator headerMode="none">
    <ProfileStack.Screen name="Summary" component={Summary} />
    <ProfileStack.Screen name="Camera" component={Camera} />
  </ProfileStack.Navigator>
);

export default ProfileNavigation;
