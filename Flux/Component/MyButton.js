'use strict';

import React, { Component } from 'react'
import {
    Button,
    View,
    Text,
} from 'react-native'

export default class MyButton extends Component {
    constructor(props) {
        super(props);
        this.items = props.items;
    }

    render() {
        return(
            <View>
                {this.items.map((item, index) => {
                    return <Text key={index}>{item}</Text>
                })}
                <Button onPress={this.props.onPress} title=' Create Item' />
            </View>
        );
    }
}