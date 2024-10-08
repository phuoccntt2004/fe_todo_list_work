import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TabNavigator from './TabNavigator';
import { DetailWorkScreen, UpdateWorkScreen } from '../screens';

const MainNavigator = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Main' component={TabNavigator}/>
            <Stack.Screen name='DetailWorkScreen' component={DetailWorkScreen}/>
            <Stack.Screen name='UpdateWorkScreen' component={UpdateWorkScreen}/>
        </Stack.Navigator>
    )
}

export default MainNavigator