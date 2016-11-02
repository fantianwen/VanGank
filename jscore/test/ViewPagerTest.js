/**
 * Created by RadAsm on 16/9/13.
 */
'use strict'
import React,{ Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ViewPagerAndroid
} from 'react-native';

class ViewPagerTest extends Component {

    render() {
        return (

            <ViewPagerAndroid
                style={viewPagerTestStyles.viewPager}
                initialPage={0}
            >

                <View
                    style={viewPagerTestStyles.pager1}
                >

                    <Text>

                        ViewPager1

                    </Text>

                </View>

                <View
                    style={viewPagerTestStyles.pager2}
                >

                    <Text>

                        ViewPager2

                    </Text>

                </View>

                <View
                    style={viewPagerTestStyles.pager3}
                >

                    <Text>

                        ViewPager3

                    </Text>

                </View>


            </ViewPagerAndroid>

        )
    }
}

const viewPagerTestStyles = StyleSheet.create({

    viewPager: {
        alignItems: 'center',
        padding: 20
    },
    pager1: {
        backgroundColor: 'green'
    },
    pager2: {
        backgroundColor: 'yellow'
    },
    pager3: {
        backgroundColor: 'blue'
    }

});

module.exports = ViewPagerTest