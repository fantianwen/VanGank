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
import CommonUtils from './utils/CommonUtls'

var _homePageContext;
var latestContent;
var pageNo = 1;
var screenWidth = CommonUtils.getScreenWidth();

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

    _gen福利ItemRenderView(){
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

                        {_homePageContext._genAndroidItemRenderView()}
                        {_homePageContext._genAndroidItemRenderView()}
                        {_homePageContext._gen福利ItemRenderView()}

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
            return androidHistoryItem.images[0] + "?imageView2/0/w/" + Math.floor(screenWidth);
        }
        return "http://o7zh7nhn0.bkt.clouddn.com/hehe.png?imageView2/0/w/" + Math.floor(screenWidth);
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
    }

});

module.exports = HomePage
