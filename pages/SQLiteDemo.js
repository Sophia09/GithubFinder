import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import NativeSqLiteManager from '../SQLiteManager/index'

export default class SQLiteDemo extends Component {
    render() {
        // NativeSqLiteManager.test();
        NativeSqLiteManager.initDatabase((result) => {
            console.log('first record in Person = ' + result[0]['name'] );
        });
        return(
            <View style={styles.container}>
                <Text style={styles.guide}>SQLite Demo</Text>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    guide: {
        padding: 5,
        paddingTop: 40,
    },
});

