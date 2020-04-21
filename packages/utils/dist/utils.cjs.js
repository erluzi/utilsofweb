'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isNode(val) {
    return val instanceof HTMLElement || val && val.nodeType === 1;
}
let check = {
    isNode
};

function formatNumber(s) {
    if (typeof s === 'string')
        s = parseFloat(s);
    let str = s.toFixed(2).toString();
    let newStr = '';
    let count = 0;
    let i = str.indexOf('.') - 1;
    for (; i >= 0; i--) {
        if (count % 3 === 0 && count !== 0) {
            newStr = str.charAt(i) + ',' + newStr;
        }
        else {
            newStr = str.charAt(i) + newStr; //逐个字符相接起来
        }
        count++;
    }
    return newStr + (str + '00').substr((str + '00').indexOf('.'), 3);
}

exports.check = check;
exports.formatNumber = formatNumber;
