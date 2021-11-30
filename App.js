import React from 'react';
import { StyleSheet, View } from 'react-native';
import {CurrentActivityProvider} from './context/activityContext'; 
import MainScreen from './screens/MainScreen';

const App = () => (
  <View style={styles.main}>
    <CurrentActivityProvider>
      <MainScreen />
    </CurrentActivityProvider>
    {/* stats */}
  </View>
)

const styles = StyleSheet.create({
  main: {
    flex: 1,
  }
})
export default App;