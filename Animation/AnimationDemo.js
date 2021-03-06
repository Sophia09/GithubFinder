'use strict';

import React, { Component } from 'react'
import SlideMenu from './SlideMenu'
import LeftComponent from './LeftComponent'
import CenterComponent from './CenterComponent'

export default class AnimationDemo extends Component {
    render() {
        return(
            // set props of SlideMenu
            <SlideMenu renderCenterView={() => <CenterComponent />}
            renderLeftView={() => <LeftComponent />}
            />
        );
    }
}