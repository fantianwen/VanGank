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

import WebViewPage from './WebViewPage'
import CommonUtils from './utils/CommonUtls'
import VanGankRequest from './utils/VanRequest'

var _homePageContext;
var latestContent;
var pageNo = 1;
var screenWidth = CommonUtils.getScreenWidth();
var screenHeight = CommonUtils.getScreenHeight();

class HomePage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        _homePageContext = this;

        this.state = {
            loaded: false,
            status: 'OK',//FAIL
            androidHistoryDataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2)=>row1 !== row2
            }),
            iosHistoryDataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2)=>row1 !== row2
            }),
            fuliHistoryDataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2)=>row1 !== row2
            })
        };
    }

    componentDidMount() {
        this._getAllData();
    }

    _getAllData() {

        let vanGankRequest = new VanGankRequest();
        vanGankRequest.requestALL(1, (requestStatus, result)=> {
            if (requestStatus === 'OK') {
                _homePageContext.setState({
                    loaded: true,
                    status: 'OK',
                    androidHistoryDataSource: this.state.androidHistoryDataSource.cloneWithRows(result[0].results),
                    fuliHistoryDataSource: this.state.fuliHistoryDataSource.cloneWithRows(result[1].results)
                });
            } else {
                _homePageContext.setState({
                    loaded: true,
                    status: 'FAIL'
                });
            }
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

    _genAndroidItemRenderView() {
        return (
            <View style={styles.androidHistoryContainer}>

                <ListView
                    dataSource={_homePageContext.state.androidHistoryDataSource}
                    renderRow={_homePageContext._renderAndroidHistoryDataRow}
                    renderSeparator={_homePageContext._renderSeparator}

                />

            </View>
        );
    }

    _gen福利ItemRenderView() {
        return (
            <View style={styles.androidHistoryContainer}>

                <ListView
                    dataSource={_homePageContext.state.fuliHistoryDataSource}
                    renderRow={_homePageContext._renderFuliHistoryDataRow}
                    renderSeparator={_homePageContext._renderSeparator}
                />
            </View>
        );
    }

    render() {

        if (!this.state.loaded) {
            return this._showLoadingView();
        } else {
            if (this.state.status === 'OK') {
                return (
                    <View style={styles.root}>
                        <IndicatorViewPager
                            style={styles.indicatorViewPagerRoot}
                            indicator={this._renderTitleIndicator()}
                            initialPage={0}
                        >
                            {_homePageContext._genAndroidItemRenderView()}
                            {_homePageContext._genAndroidItemRenderView()}
                            {_homePageContext._gen福利ItemRenderView()}
                        </IndicatorViewPager>
                    </View>
                );
            } else {
                return (
                    <View
                        style={styles.error}
                    >
                        <Text
                            style={{
                                flex:1,
                                alignSelf: 'center'
                            }}
                        >
                            访问错误!
                        </Text>
                    </View>
                );
            }
        }
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['Android', 'IOS', '福利']}/>;
    }

    _parseImageUri(androidHistoryItem) {
        if (androidHistoryItem.hasOwnProperty('images')) {
            return androidHistoryItem.images[0] + "?imageView2/0/w/" + Math.floor(screenWidth);
        }
        return "http://o7zh7nhn0.bkt.clouddn.com/hehe.png?imageView2/0/w/" + Math.floor(screenWidth);
    }

    _parseFuliUri(fuliHistoryItem) {
        return fuliHistoryItem.url;
    }

    _onPressAndroidItem(androidHistoryItem) {
        _homePageContext.props.navigator.push({
            component: WebViewPage,
            passProps: {
                androidHistoryItem
            }
        });
    }

    _renderFuliHistoryDataRow(androidHistoryItem, sectionId, rowId) {

        return (

            <View
                style={styles.androidHistoryItem}
            >
                <Image
                    style={styles.fuliHistoryItemImage}
                    source={{uri:_homePageContext._parseFuliUri(androidHistoryItem)}}
                    elevation={5}
                >
                </Image>

            </View>
        );
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
                        elevation={5}
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

    _renderSeparator() {
        return (
            <View
                style={styles.listViewSeparator}
            >

            </View>
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
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FDF5E6',
        paddingTop: 10,
        paddingBottom: 20
    },

    androidHistoryItemImage: {
        width: screenWidth,
        height: 250
    },

    androidHistoryItemDesc: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16
    },

    androidHistoryContainer: {
        backgroundColor: '#FFB6C1'
    },

    listViewSeparator: {
        width: screenWidth,
        height: 20,
        backgroundColor: '#FFF8DC'
    },

    fuliHistoryItemImage: {
        width: screenWidth,
        height: screenHeight,
    },

    error: {
        flex: 1,
        alignItems: 'center',
        flexDirection:'column'
    }

});

module.exports = HomePage
