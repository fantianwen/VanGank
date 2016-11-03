/**
 * Created by RadAsm on 16/11/3.
 */
'use strict'
import {Dimensions} from 'react-native'

const CommonUtils = {

    getScreenWidth(){
        return Dimensions.get('window').width;
    },

    getScreenHeight(){
        return Dimensions.get("window").height;
    }

}


module.exports = CommonUtils