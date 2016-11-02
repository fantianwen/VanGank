/**
 * Created by RadAsm on 16/8/26.
 */
'use strict';

import React,{ Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    BackAndroid,
    StatusBar,
    View
} from 'react-native';

import HomePageTest from './jscore/test/HomePageTest'

import HomePage from './jscore/HomePage'
import ViewPagerTest from './jscore/test/ViewPagerTest'
import RNViewPagerTest from './jscore/test/RNViewPagerTest'
import WebViewPage from './jscore/WebViewPage'

class VanGank extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this.handleBack = this._handleBack.bind(this);
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    }

    _handleBack() {
        var navigator = this.navigator;

        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
        return false;

    }

    render() {
        return (
            <View style={{flex:1}}>

                <StatusBar backgroundColor='transparent'
                >

                </StatusBar>

                <Navigator
                    ref={component=>this.navigator = component}
                    initialRoute={{
                        component:HomePage
                    }}
                    renderScene={(route, navigator) => { // 用来渲染navigator栈顶的route里的component页面
                          // route={component: xxx, name: xxx, ...}， navigator.......route 用来在对应界面获取其他键值
                          return <route.component navigator={navigator} {...route} {...route.passProps}/>
                           // {...route.passProps}即就是把passProps里的键值对全部以给属性赋值的方式展开 如：test={10}
                       }}
                >


                </Navigator>


            </View>
        );
    }

}

AppRegistry.registerComponent('VanGank', ()=>VanGank);