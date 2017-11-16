'use strict';

import React, { Component } from 'react'
import { TabNavigator } from 'react-navigation'
import HomeScene from './HomeScene'
import ProfileScreen from './ProfileScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'

const RootTabs = TabNavigator({
   Home: {
       screen: HomeScene,
       navigationOptions: {
         tabBarLabel: 'Home',
         tabBarIcon: ({ tintColor, focused }) => (
             <Ionicons
             name={focused? 'ios-home' : 'ios-home-outline'}
             size={26}
             style={{ color: tintColor }}
             />
         ),
       },
   },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={focused ? 'ios-person' : 'ios-person-outline'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },
    },
});

export default class TabDemo extends Component {
    render() {
        return(
            <RootTabs />
        );
    }
}