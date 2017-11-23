/**
 * @providesModule AudioPlayerManager
 * @flow
 */

'use strict';

// User Guild: https://facebook.github.io/react-native/docs/linking-libraries-ios.html

import React from 'react'
import { NativeModules } from 'react-native'

var AudioPlayerManager = NativeModules.AudioPlayerManager;

var  NativeAudioPlayerManager = {

  play(path) {
    console.log('play in NativeAudionPlayerManager');
      AudioPlayerManager.play(path);
  },

  playWithURL(url) {
    AudioPlayerManager.playWithURL(url);
  },

  pause() {
    AudioPlayerManager.pause();
  },

  stop() {
    AudioPlayerManager.stop();

    if (this.subscription) {
      this.subscription.remove();
    }
  },

}

module.exports = NativeAudioPlayerManager;

