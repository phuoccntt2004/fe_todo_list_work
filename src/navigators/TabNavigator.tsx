import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddSquare, CopySuccess, Flag, Home2, Profile } from 'iconsax-react-native';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import COLORS from '../assets/colors/Colors';
import { AddNewWork, HomeScreen, PriorityScreen, ProFileScreen, SuccessWork } from '../screens';
import { globalStyle } from '../styles/globalStyle';


const TabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.HEX_BLACK,
                borderColor: COLORS.HEX_BLACK, 
            },
            tabBarIcon: ({ focused, color, size }) => {
                let icon: ReactNode;
                color = focused ? COLORS.WHITE : COLORS.HEX_LIGHT_GREY;
                let backgroundColor = focused ? COLORS.ORANGE : 'transparent';
                let padding = 10;
                let borderRadius = 8;

                switch (route.name) {
                    case 'Home':
                        icon = <Home2 size={size} color={color} variant="Bold" />;
                        break;
                    case 'Priority':
                        icon = <Flag size={size} color={color} variant="Bold" />;
                        break;
                    case 'SuccessWork':
                        icon = <CopySuccess size={size} color={color} variant="Bold" />;
                        break;
                    case 'Profile':
                        icon = <Profile size={size} color={color} variant="Bold" />;
                        break;
                    case 'AddWork':
                        icon = (
                            <View style={[globalStyle.shadow, {
                                width: 55,
                                height: 55,
                                borderRadius: 10,
                                backgroundColor: focused ? COLORS.ORANGE :COLORS.HEX_LIGHT_GREY,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 8,
                                marginTop: 5
                            }]}>
                                <AddSquare size={30} color={COLORS.WHITE} variant='Bold' />
                            </View>
                        );
                        return icon;
                }

                return (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: backgroundColor,
                        borderRadius: borderRadius,
                        padding: padding,
                        paddingEnd: 20,
                        paddingStart: 20
                    }}>
                        {icon}
                    </View>
                );
            },
            tabBarIconStyle: {
                marginTop: 4
            },
            tabBarLabel: () => null, 
        })}>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Priority' component={PriorityScreen} />
            <Tab.Screen name='AddWork' component={AddNewWork} />
            <Tab.Screen name='SuccessWork' component={SuccessWork} />
            <Tab.Screen name='Profile' component={ProFileScreen} />
        </Tab.Navigator>
    )
}

export default TabNavigator;
