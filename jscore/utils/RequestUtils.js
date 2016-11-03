/**
 * Created by RadAsm on 16/8/29.
 */
'use strict'

import TimeUtils from './TimeUtils'

// 获取指定某天日期的数据
var API_DAILY = 'http://gank.io/api/day/';
// 获取拥有历史数据的天数
var API_HISTORY = 'http://gank.io/api/day/history';
// android历史数据
var API_ANDROID_HISTORY = 'http://gank.io/api/data/Android/10/';

var API_IOS_HISTORY = 'http://gank.io/api/data/Android/10/';

const RequestUtils = {

    getToadyContentPromise(date:String){

        return todayContent;
    },

    getHistoryPromise(){

        let history = new Promise((resolve, reject)=> {

            fetch(API_HISTORY)
                .then((response)=> {
                    resolve(response.json());
                })
        });

        return history;

    },

    // 获取当天的信息
    async getTodayContent(date:String){

        let todayContent = new Promise((resolve, reject)=> {

            fetch(API_DAILY + TimeUtils.formatTime(date))
                .then((response)=> {
                    resolve(response.json());
                })
                .catch((error)=> {
                    reject(error);
                })

        });
        return todayContent;
    },

    async getHistory(){
        return getHistoryPromise();
    },


    /**
     * 获取最新的数据
     *
     * @returns {Promise}
     */
    async getLatestDate(){

        let latestContent = new Promise((resolve, reject)=> {

            fetch(API_HISTORY)
                .then((response)=> {
                    return response.json();
                })
                .then((jsonResult)=> {
                    if (!jsonResult.error) {
                        resolve(jsonResult.results);
                    }
                })
        });

        return latestContent;
    },

    /**
     * 获取android数据
     *
     * @param pageNo
     */
    async getAndroidData(pageNo){
        let androidData = new Promise((resolve, reject)=> {

            let historyAndroidDataUrl = API_ANDROID_HISTORY + pageNo;

            fetch(historyAndroidDataUrl)
                .then((response)=> {
                    return response.json();
                })
                .then((jsonResult)=> {
                    if (!jsonResult.error) {
                        resolve(jsonResult.results);
                    } else {
                        reject();
                    }
                });
        });

        return androidData;
    },



}

module.exports = RequestUtils