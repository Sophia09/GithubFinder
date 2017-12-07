'use strict';

import React, { Component } from 'react'
import { DrawerNavigator } from 'react-navigation'
import NavDemo from './NavDemo'
import AnimationDemo from '../Animation/AnimationDemo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ButtonController from '../Flux/Component/ButtonController'
import GithubFinder from './GithubFinder'
import SQLiteDemo from './SQLiteDemo'

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
    Flux: {
        screen: ButtonController,
        navigationOptions: {
          drawerLabel: 'Flux',
          drawerIcon: ({tintColor, focused}) => (
              <Ionicons
                  name={focused ? 'ios-return-left' : 'ios-return-left-outline'}
                  size={20}
                  style={{color: tintColor}}
              />
            ),
        },
    },
    Fetch: {
        screen: GithubFinder,
        navigationOptions: {
          drawerLabel: 'Fetch',
          drawerIcon: ({ tintColor, focused }) => (
              <Ionicons
                  name={focused ? 'ios-git-network' : 'ios-git-network-outline'}
                  size={20}
                  style={{color: tintColor}}
              />
          ),
        },
    },
    SQLite: {
        screen: SQLiteDemo,
        navigationOptions: {
          drawerLabel: 'SQLiteDemo',
            drawerIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? 'ios-analytics' : 'ios-analytics-outline'}
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