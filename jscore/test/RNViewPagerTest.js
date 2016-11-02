import {StyleSheet, View, Text} from 'react-native';
import React, {Component} from 'react';
import {IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator,PagerTabIndicator} from 'rn-viewpager';

class RNViewPagerTest extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <IndicatorViewPager
                    style={{height:200}}
                    indicator={this._renderDotIndicator()}
                >
                    <View style={{backgroundColor:'cadetblue'}}>
                        <Text>page one</Text>
                    </View>
                    <View style={{backgroundColor:'cornflowerblue'}}>
                        <Text>page two</Text>
                    </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Text>page three</Text>
                    </View>
                </IndicatorViewPager>

                <IndicatorViewPager
                    style={{flex:1,marginTop:10}}
                    indicator={this._renderTitleIndicator()}
                >
                    <View style={{backgroundColor:'cadetblue'}}>
                        <Text>page one</Text>
                    </View>
                    <View style={{backgroundColor:'cornflowerblue'}}>
                        <Text>page two</Text>
                    </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Text>page three</Text>
                    </View>
                </IndicatorViewPager>

                <IndicatorViewPager
                    style={{flex:1,marginTop:10}}
                    indicator={this._renderTabIndicator()}
                >
                    <View style={{backgroundColor:'cadetblue'}}>
                        <Text>page one</Text>
                    </View>
                    <View style={{backgroundColor:'cornflowerblue'}}>
                        <Text>page two</Text>
                    </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Text>page three</Text>
                    </View>
                </IndicatorViewPager>
            </View>
        );
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['one', 'two', 'three']}/>;
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3}/>;
    }

    _renderTabIndicator() {
        let tabs = [{
            text: 'Home',
            iconSource: require('../imgs/ic_tab_circle.png'),
            selectedIconSource: require('../imgs/ic_tab_circle.png')
        }, {
            text: 'Message',
            iconSource: require('../imgs/ic_tab_circle.png'),
            selectedIconSource: require('../imgs/ic_tab_circle.png')
        }, {
            text: 'Profile',
            iconSource: require('../imgs/ic_tab_circle.png'),
            selectedIconSource: require('../imgs/ic_tab_circle.png')
        }];
        return <PagerTabIndicator tabs={tabs}/>;
    }

}

module.exports = RNViewPagerTest