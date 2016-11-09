/**
 * Created by RadAsm on 16/11/4.
 */
'use strict'

import Constants from '../config/APIS'
import VanLogger from '../nativeModules/VanLogger'


var _context;

var ANDROID_HISTORY_URL = 'http://gank.io/api/data/Android/10/';

var FULI_HISTORY_DATA = 'http://gank.io/api/data/福利/10/';

class VanGankRequest {

    constructor() {
        // 初始状态
        _context = this;
    }

    /**
     * 访问Url
     *
     * @param url 访问的地址
     * @param requestMethod 访问的方式
     */
    requestUrl(url, requestMethod) {
        return new Promise((resolve, reject)=> {
            let req = new XMLHttpRequest();
            req.open(requestMethod, url, true);
            req.onload = ()=> {
                if (req.status === 200) {
                    let responseJson = JSON.parse(req.responseText);
                    resolve(responseJson);
                    // 打印日志
                    let logText = "请求地址: " + url + ":\n\n请求结果: " + JSON.stringify(responseJson);
                    VanLogger.i(logText);
                } else {
                    reject(new Error(req.statusText));
                    // 打印日志
                    VanLogger.e(req.statusText);
                }
            };
            req.onerror = ()=> {
                reject(new Error(req.statusText));
                // 打印日志
                VanLogger.e(req.statusText);
            };
            req.send();
        })
    }

    requestAndroidData(pageNo) {
        return _context.requestUrl(ANDROID_HISTORY_URL + pageNo, 'GET');
    }

    requestFULIData(pageNo) {
        return _context.requestUrl(FULI_HISTORY_DATA + pageNo, 'GET');
    }

    requestALL(pageNo, callBack) {
        Promise
            .all([_context.requestAndroidData(pageNo), _context.requestFULIData(pageNo)])
            .then((response)=> {
                callBack('OK', response);
            })
            .catch((error)=> {
                callBack('FAIL', error);
            })
    }

    requestAndroid(pageNo, callBack) {
        _context.requestAndroidData(pageNo)
            .then((response)=> {
                callBack('OK', response)
            })
            .catch((error)=> {
                callBack('FAIL', error)
            })
    }

    requestFuli(pageNo, callBack) {
        _context.requestFULIData(pageNo)
            .then((response)=> {
                callBack('OK', response)
            })
            .catch((error)=> {
                callBack('FAIL', error)
            })
    }


}

module.exports = VanGankRequest

