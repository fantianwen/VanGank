/**
 * Created by RadAsm on 16/8/29.
 */
'use strict'
import React,{ Component } from 'react';
import {
    View,
    WebView,
    ToastAndroid,
    StyleSheet
} from 'react-native';

var _context;

class WebViewPage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        _context = this;
        _context.androidHistoryItem = props.androidHistoryItem;

        _context._checkUrlValid();

        this.state = {};
    }

    _checkUrlValid() {
        if (_context.androidHistoryItem === undefined || _context.androidHistoryItem === null) {
            _context.props.navigator.pop();
        }
    }

    _getUrl() {
        if (_context.androidHistoryItem === undefined || _context.androidHistoryItem === null) {
            ToastAndroid.show('无法打开该网页', ToastAndroid.LONG);
            return "";
        } else {
            return _context.androidHistoryItem.url;
        }
    }

    render() {

        return (

            <View
                style={WebViewStyles.webViewRoot}
            >

                <WebView
                    source={{uri:_context._getUrl()}}
                >

                </WebView>

            </View>
        );
    }
}

const WebViewStyles = StyleSheet.create({

    webViewRoot: {
        flex: 1
    }

})

module.exports = WebViewPage

