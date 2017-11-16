

'use strict';

import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'

import HomeScene from './HomeScene'
import FromRightScene from './FromRightScene'

const MyNav = StackNavigator({
    Home: {
        screen: HomeScene,
        navigationOptions: {
            headerTitle: 'Root',
        },
    },
    FromRightScene: {
        screen: FromRightScene,
        navigationOptions: {
            // headerTitle: 'Used navigate',
        }
    },
});

export default class NavDemo extends Component<{}> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
             <MyNav />
        );
    }

}
