'use strict';

import React, { Component } from 'react'
import { TabNavigator } from 'react-navigation'
import AnimationDemo from '../Animation/AnimationDemo'
import NavDemo from './NavDemo'
import Ionicons from 'react-native-vector-icons/Ionicons'

const RootTabs = TabNavigator({
   Navigation: {
       screen: NavDemo,
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
    Animation: {
        screen: AnimationDemo,
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