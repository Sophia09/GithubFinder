'use strict';

import React, { Component } from 'react'
import { DrawerNavigator } from 'react-navigation'
import NavDemo from './NavDemo'
import AnimationDemo from '../Animation/AnimationDemo'
import Ionicons from 'react-native-vector-icons/Ionicons'

const RootDrawer = DrawerNavigator({
    Navigation: {
        screen: NavDemo,
        navigationOptions: {
            drawerLabel: 'Navigation',
            drawerIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? 'ios-home' : 'ios-home-outline'}
                    size={20}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    Animation: {
        screen: AnimationDemo,
        navigationOptions: {
            drawerLabel: 'Animation',
            drawerIcon: ({tintColor, focused}) => (
                <Ionicons
                   name={focused ? 'ios-person' : 'ios-person-outline'}
                   size={20}
                   style={{color: tintColor}}
                />
            ),
        },
    },
});

export default class DrawerNavDemo extends Component {

    render() {
        return(
            <RootDrawer/>
        );
    }
}