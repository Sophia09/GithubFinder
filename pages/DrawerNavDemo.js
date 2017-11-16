'use strict';

import React, { Component } from 'react'
import { DrawerNavigator } from 'react-navigation'
import NavDemo from './NavDemo'
import ProfileScreen from './ProfileScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'

const RootDrawer = DrawerNavigator({
    Home: {
        screen: NavDemo,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? 'ios-home' : 'ios-home-outline'}
                    size={20}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            drawerLabel: 'Profile',
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