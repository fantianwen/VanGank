/**
 * Created by RadAsm on 16/8/29.
 */
'use strict'
import React,{ Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    BackAndroid,
    StatusBar,
    ViewPagerAndroid,
    View,
    ProgressBarAndroid,
    Text,
    ListView,
    Image,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';

import {
    IndicatorViewPager,
    PagerTitleIndicator,
    PagerTabIndicator
} from 'rn-viewpager';

import RequestUtils from './utils/RequestUtils'
import WebViewPage from './WebViewPage'

var _homePageContext;
var latestContent;
var pageNo = 1;

class HomePage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        _homePageContext = this;

        this.state = {
            loaded: false,
            androidHistoryDataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2)=>row1 !== row2
            })
        };
    }

    componentDidMount() {

        this._getAndroidData();
    }

    _getAndroidData() {

        RequestUtils.getAndroidData(pageNo)
            .then((androidList)=> {
                _homePageContext.setState({
                    loaded: true,
                    androidHistoryDataSource: this.state.androidHistoryDataSource.cloneWithRows(androidList)
                });
            })

    }

    _getLatestData() {
        RequestUtils.getLatestDate()
            .then((value)=> {
                RequestUtils.getTodayContent(value[0])
                    .then((response)=> {
                        latestContent = response;
                        _homePageContext.setState({
                            loaded: true,
                            latestContent: latestContent
                        });
                    })
            })
            .catch((errorMsg)=> {
                alert('error:' + errorMsg);
            })
    }


    _showLoadingView() {
        return (
            <View>

                <ProgressBarAndroid styleAttr='LargeInverse'
                                    color='green'
                />

            </View>
        );
    }


    render() {

        if (!this.state.loaded) {

            return this._showLoadingView();

        } else {
            return (

                <View style={styles.root}>

                    <IndicatorViewPager
                        style={styles.indicatorViewPagerRoot}
                        indicator={this._renderTitleIndicator()}
                        initialPage={0}
                    >
                        <View style={styles.androidHistoryContainer}>

                            <ListView

                                dataSource={_homePageContext.state.androidHistoryDataSource}
                                renderRow={_homePageContext._renderAndroidHistoryDataRow}

                            />

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
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['Android', 'IOS', '福利']}/>;
    }


    _parseImageUri(androidHistoryItem) {
        if (androidHistoryItem.hasOwnProperty('images')) {
            return androidHistoryItem.images[0] + "?imageView2/0/w/53";
        }
        return "http://img.gank.io/1dce0d48-99aa-4d68-83bc-d3f08b68c1c3?imageView2/0/w/53";
    }

    _onPressAndroidItem(androidHistoryItem) {
        _homePageContext.props.navigator.push({
            component: WebViewPage,
            passProps: {
                androidHistoryItem
            }
        });
    }

    _renderAndroidHistoryDataRow(androidHistoryItem, sectionId, rowId) {

        return (

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>_homePageContext._onPressAndroidItem(androidHistoryItem)}
            >

                <View
                    style={styles.androidHistoryItem}
                >

                    <Image
                        style={styles.androidHistoryItemImage}
                        source={{uri:_homePageContext._parseImageUri(androidHistoryItem)}}
                    >

                    </Image>

                    <Text
                        style={styles.androidHistoryItemDesc}
                    >
                        {androidHistoryItem.desc}

                    </Text>

                </View>

            </TouchableOpacity>

        );

    }

}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },

    loadingViewContainer: {
        flex: 1,
        backgroundColor: 'gray'
    },

    test: {
        flex: 1,
        fontSize: 20,
        color: 'green',
    },

    indicatorViewPagerRoot: {
        flex: 1
    },

    androidHistoryItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    androidHistoryItemImage: {
        width: 53,
        height: 81
    },

    androidHistoryItemDesc: {
        textAlign: 'center'
    },

    androidHistoryContainer: {
        backgroundColor: '#FFB6C1'
    }

});

module.exports = HomePage
