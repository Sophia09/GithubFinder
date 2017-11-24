'use strict';

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    requireNativeComponent
} from 'react-native'


// requireNativeComponent 会自动把这个组件提供给 'RNTColorfulViewManager'
var NativeColorfulView = requireNativeComponent('RNTColorfulView', ColorfulView);

export default class ColorfulView extends Component {
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