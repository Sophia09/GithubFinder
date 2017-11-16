'use strict';

import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

export default class FromRightScene extends Component<{}> {

    // Nav options can be defined as a function of the screen's props

    static navigationOptions = ({ navigation }) => ({
        headerTitle: `${navigation.state.params.user} used navigate`,
    });

    render() {
        // The screen's current route is passed in to 'props.navigation.state'
        const { params } = this.props.navigation.state;

        return(
        <View style={[styles.scene, {backgroundColor: '#FFF1EB'}]}>
            <Text>
                page is triggered by push method.
            </Text>
            <Text>
                Page from {params.user}
            </Text>
        </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scene: {
        padding: 10,
        paddingTop: 74,
        flex: 1,
    }
});