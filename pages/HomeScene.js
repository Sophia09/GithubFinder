'use strict';

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
    Button,
    requireNativeComponent,
} from 'react-native'

import NativeAudioPlayerManager from '../Libraries/AudioPlayerManager/AudioPlayerManager.ios'

// requireNativeComponent 会自动把这个组件提供给 'RNTColorfulViewManager'
var NativeColorfulView = requireNativeComponent('RNTColorfulView', ColorfulView);

export class ColorfulView extends Component {
    static propTypes = {
        isRed: PropTypes.bool.isRequired,
    };

    static defaultProps = {
      isRed: true,
    };

    render() {
        return <NativeColorfulView {...this.props} />
    }
}

export default class HomeScene extends Component<{}> {

    showNewPage() {
        // navigate is a method
        const { navigate } = this.props.navigation;

        // pass a 'user' param into the route
        navigate('FromRightScene', { user: 'Sophia' });
    }

    playAudio() {

        // NativeAudioPlayerManager.play('');
        NativeAudioPlayerManager.playWithURL('');
    }

    render() {

        return (
            <View style={[styles.scene, {backgroundColor: '#DAF6FF'}]}>
                <TouchableHighlight onPress={this.showNewPage.bind(this)}>
                    <Text>
                        page is the initial root. Click to navigate to a new page.
                    </Text>
                </TouchableHighlight>

                <Button onPress={() => this.props.navigation.navigate('FromRightScene', { user: 'Button' })}
                        title="Use Navigate"
                />

                <Button onPress={this.playAudio.bind(this)}
                        title='Play Audio'/>

                <ColorfulView style={styles.colorfulView} isRed={true}/>
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
        flex: 1,
    },
    colorfulView: {
      width: 50,
      height: 50,
    },
});