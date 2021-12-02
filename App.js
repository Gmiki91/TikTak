import React from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MainScreenWrapper from './screens/MainScreenWrapper';
import Stats from './screens/Stats';

const Tab = createBottomTabNavigator();
const App = () => {
  const options = {headerShown:false};
   return (
    <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen
            name="Main"
            component={MainScreenWrapper}
            options={{...options,  tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="timer" color={color} size={size} />
            ),}}/>
          <Tab.Screen
            name="Stats"
            component={Stats}
            options={{...options,  tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="poll" color={color} size={size} />
            ),}}/>
        </Tab.Navigator>

    </NavigationContainer>
  )
   }

  export default App;