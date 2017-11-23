'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import VectorWidget from './VectorWidget'


export default class ReactArtDemo extends Component {
    render() {
        return(
            <View style={styles.container}>
                <VectorWidget style={styles.vector}/>
            </View>
        );
    }
}

var  styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    vector: {
        width: 100,
        height: 100,
    },

});