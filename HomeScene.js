'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
} from 'react-native'

export default class HomeScene extends Component<{}> {

    showNewPage() {
        // navigate is a method
        const { navigate } = this.props.navigation;
        navigate('FromRightScene');
    }

    render() {
        return (
            <View style={[styles.scene, {backgroundColor: '#DAF6FF'}]}>
                <TouchableHighlight onPress={this.showNewPage.bind(this)}>
                    <Text>
                        page is the initial root. Click to navigate to a new page.
                    </Text>
                </TouchableHighlight>
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
    },
});