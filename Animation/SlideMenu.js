'use strict';

import React, { Component } from 'react'
import {
    Dimensions,
    LayoutAnimation,
    PanResponder,
    View,
    StyleSheet,
} from 'react-native'
var screenWidth = Dimensions.get('window').width;


export default class SlideMenu extends Component {

    constructor(props) {
        super(props);

        // bind methods
        // this.moveFinished = this.moveFinished.bind(this);
    }

    componentWillMount() {
        this._offset = 0;
        this._panGesture = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
                    Math.abs(gestureState.dx) > 10;
            },
            onPanResponderGrant: (evt, gestureState) => this.left = 0,
            onPanResponderMove: (evt, gestureState) => this.moveCenterView(gestureState.dx),
            onPanResponderRelease: this.moveFinished.bind(this),
            onPanResponderTerminate: this.moveFinished.bind(this),
        });
    }

    componentDidMount() {
        console.log('Component Did Mount');
    }

    moveCenterView(left) {
        console.log('moveCenterView');
       if (!this._center)
           return;

       // 左移时保证 centerView 不会超过左屏幕边界，即 style= (left > 0)
       if ((this._offset + left) < 0) {
           this.left = -this._offset;
       }
       else {
           this.left = left;
       }
       this._center.setNativeProps({left: this._offset + this.left});
    }

    // 滑动结束时判断位移，然后决定 view 的最终坐标
    moveFinished() {
        console.log('moveFinished');

        if (!this._center)
            return;

        var offset = this._offset + this.left;
        if (this._offset === 0) {
            if (offset > screenWidth * 0.25) {
                this._offset = screenWidth * 0.75;
            }
        }
        else {
            if (offset < screenWidth * 0.5) {
                this._offset = 0;
            }
        }

        LayoutAnimation.configureNext(animations.layout.easeInEaseOut);
        // 更新组件的属性
        this._center.setNativeProps({left: this._offset});
    }
/*
    updateCenter(center) {
        // console.log(center);
        console.log('updateCenter');
        if (center) {
            this._center = center;
        }
    }
*/
    render() {
        var centerView = this.props.renderCenterView ? this.props.renderCenterView() : null;
        var leftView = this.props.renderLeftView ? this.props.renderLeftView() : null;

        /*
                ref 定义组件的引用名称，实现局部刷新，提高性能
                将组件作为参数赋值给
        */
        return(
            <View style={[styles.center, this.props.style]}>
                <View style={styles.left}>
                    {leftView}
                </View>

                <View style={[styles.center, {left: this._offset}]}
                      // ref={(center) => {
                      //      console.log('update center');
                      //      this._center = center;}}

                     // ref = {this.updateCenter}
                    ref={center => this._center = center}
                      {...this._panGesture.panHandlers}
                >
                    {centerView}
                </View>
           </View>
        );
    }
}

var styles = StyleSheet.create({
   container: {
       flex: 1,
   },
    center: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    left: {
        position: 'absolute',
        margin: 0,
        backgroundColor: '#FFFFFF',
    },
});

var animations = {
    layout: {
        spring: {
            duration: 750,
            create: {
                duration: 300,
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
              type: LayoutAnimation.Types.spring,
              springDamping: 400,
            },
        },
        easeInEaseOut: {
          duration: 300,
          create: {
              type: LayoutAnimation.Types.easeInEaseOut,
              property: LayoutAnimation.Properties.scaleXY,
          },
            update: {
                delay: 100,
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        },
    },
};