/**
 * @providesModule AudioPlayerManager
 * @flow
 */

'use strict';

// User Guild: https://facebook.github.io/react-native/docs/linking-libraries-ios.html

import React from 'react'
import { NativeModules } from 'react-native'

var { AudioPlayerManager } = NativeModules;

export default class NativeAudioPlayerManager {
    static play(path) {
        console.log('play in NativeAudionPlayerManager');
        AudioPlayerManager.play(path, (errorMessage) => {
            if (errorMessage) {
                console.log('NativeAudioPlayerManager' + errorMessage);
            }
        });
    }

    static playWithURL(url) {
        AudioPlayerManager.playWithURL(url, (errorMessage) => {
            if (errorMessage) {
                console.log('NativeAudioPlayerManager' + errorMessage);
            }
        });
    }

    static pause() {
        AudioPlayerManager.pause();
    }

    static stop() {
        AudioPlayerManager.stop();

        if (this.subscription) {
            this.subscription.remove();
        }
    }
}