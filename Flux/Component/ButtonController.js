'use strict';

import React, { Component } from 'react'
import {

    View,
    StyleSheet,
} from 'react-native'

import ListStore from '../Stores/ListStore2'
import ButtonAction from '../Actions/ButtonAction2'
import MyButton from "./MyButton";

export default class ButtonController extends Component {

    constructor(props) {
        super(props);
        // this.currentListStore = new ListStore();
        this.state = {
          items: ListStore.getAll(),
        };
    }

    componentDidMount() {
        ListStore.addChangeListener(this.itemUpdated.bind(this));
    }

    componentWillUnmount() {
        ListStore.removeChangeListener(this.itemUpdated.bind(this));
    }

    itemUpdated() {
        this.setState({
            items: ListStore.getAll(),
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <MyButton onPress={() => ButtonAction.addNewItem('new item')}
                          items={this.state.items}
                >

                </MyButton>
            </View>

        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 70,
    }
});