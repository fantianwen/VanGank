/**
 * Created by RadAsm on 16/11/10.
 */

class Stacktrace {
    // 构造
    constructor() {
        // 初始状态
    }

    throwError() {
       return new Error();
    }

    /**
     * 获取
     * @returns {*}
     */
    getCallerLine() {
        return this.throwError().stack.split("\n")[4];
    }


}
