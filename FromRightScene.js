'use strict';

import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

export default class FromRightScene extends Component<{}> {

    render() {
        return(
        <View style={[styles.scene, {backgroundColor: '#FFF1EB'}]}>
            <Text>
                page is triggered by push method.
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