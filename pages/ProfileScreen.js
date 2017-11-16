'use strict';

import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
} from 'react-native'

export default class ProfileScreen extends Component {
    render() {
        return(
            <View style={[styles.scene, {backgroundColor:'#DAF6FF'}]}>
                <Text style={{backgroundColor: '#FFF1EB'}}>Profile Screen</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    scene: {
        flex: 1,
        padding: 10,
        paddingTop: 74,
    }
});