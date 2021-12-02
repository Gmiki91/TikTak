import React from 'react';
import { CurrentActivityProvider } from '../context/activityContext';
import MainScreen from './MainScreen';
const MainScreenWrapper = props => (
    <CurrentActivityProvider>
        <MainScreen />
    </CurrentActivityProvider>
)

export default MainScreenWrapper;