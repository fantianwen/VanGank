/**
 * Created by RadAsm on 16/9/3.
 */
'use strict'

const TimeUtils = {

    /**
     * 获取今天,按照"2016/09/05"
     * @returns {string}
     */
    getToday (){
        return new Date().format("yyyy/MM/dd");
    },

    getDay (){
        var now = new Date();
        var dayOfWeek = now.getDay();
        return dayOfWeek;
    },

    getLastContentDay(){
        getDay();
    },

    formatTime(date:String){
        return date.replace(new RegExp('-', 'g'), '/');
    }

}

module.exports = TimeUtils






