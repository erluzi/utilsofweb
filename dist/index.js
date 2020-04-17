'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isNode(val) {
    return val instanceof HTMLElement || val && val.nodeType === 1;
}

var check = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isNode: isNode
});

// const $ = document.querySelector.bind(document)
function valid(root) {
    if (root !== document && !isNode(root)) {
        console.warn(`argument root => ${root} is not element!`);
        return false;
    }
    return true;
}
function $(selector, root = document) {
    return valid(root) ? root.querySelector(selector) : null;
}
function $$(selector, root = document) {
    return valid(root) ? root.querySelectorAll(selector) : null;
}

var dom = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $: $,
  $$: $$
});

function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}
let hasClass;
let addClass;
let removeClass;
if ('classList' in document.documentElement) {
    hasClass = (elem, c) => elem.classList.contains(c);
    addClass = (elem, c) => elem.classList.add(c);
    removeClass = (elem, c) => elem.classList.remove(c);
}
else {
    hasClass = (elem, c) => classReg(c).test(elem.className);
    addClass = (elem, c) => {
        if (!hasClass(elem, c)) {
            elem.className = elem.className + ' ' + c;
        }
    };
    removeClass = (elem, c) => {
        elem.className = elem.className.replace(classReg(c), '');
    };
}
function toggleClass(elem, c) {
    let fn = hasClass(elem, c) ? removeClass : addClass;
    fn(elem, c);
}
let classie = {
    // full names
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
};

function randomColor16() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}
function randomColorOpacity(opacity = 0.5) {
    let r = ~~(Math.random() * 256);
    let g = ~~(Math.random() * 256);
    let b = ~~(Math.random() * 256);
    return `rgba(${r},${g},${b},${opacity})`;
}
// 0x112233 => 0001 0001 0010 0010 0011 0011
function hex2rgb(val) {
    let regHex3 = /^#([0-9a-f]{3})$/;
    let regHex6 = /^#([0-9a-f]{6})$/;
    if (regHex3.test(val)) {
        let m = parseInt(val.replace(/^#/, ''), 16);
        let r = (m >> 8) | (m >> 4 & 0x0f0);
        let g = (m >> 4 & 0xf) | (m & 0xf0);
        let b = ((m & 0xf) << 4) | (m & 0xf);
        return `rgb(${r}, ${g}, ${b})`;
    }
    else if (regHex6.test(val)) {
        let m = parseInt(val.replace(/^#/, ''), 16);
        let r = m >> 16;
        let g = m >> 8 & 0xff;
        let b = m & 0xff;
        return `rgb(${r}, ${g}, ${b})`;
    }
    else {
        throw new Error(`argument ${val} is not a color`);
    }
}
function rgb2hsl(val) {
    let regRgb = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
    if (regRgb.test(val)) {
        let r = 0;
        let g = 0;
        let b = 0;
        let h = 0;
        let s = 0;
        let l = 0;
        val.replace(regRgb, (match, p1, p2, p3) => {
            r = +p1 / 255;
            g = +p2 / 255;
            b = +p3 / 255;
            return `${p1}-${p2}-${p3}`;
        });
        let max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
        // get h
        if (max === min)
            h = 0;
        else if (max === r && g >= b)
            h = 60 * (g - b) / d;
        else if (max === r && g < b)
            h = 60 * (g - b) / d + 360;
        else if (max === g)
            h = 60 * (b - r) / d + 120;
        else
            h = 60 * (r - g) / d + 240;
        // get l
        l = (max + min) / 2;
        // get s
        if (l === 0 || max === min)
            s = 0;
        else if (0 < l && l <= 0.5)
            s = d / (max + min);
        else
            s = d / (2 - max - min);
        return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }
    else {
        throw new Error(`argument ${val} is not a color`);
    }
}
// 函数周期执行
function throttle(handler, duration) {
    let begin = Date.now();
    let current = null;
    return (...args) => {
        current = Date.now();
        if (current - begin > duration) {
            handler(...args);
            begin = current;
        }
    };
}
// 持续阻断函数执行
function debounce(handler, delay) {
    let timer = null;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            handler(...args);
        }, delay);
    };
}
/**
 * 把文本复制到剪切板
 * https://github.com/zenorocha/clipboard.js
 * @param text
 * @returns {Promise<any>}
 */
function clip2board(text) {
    const notSupportMessage = '不支持复制功能';
    //使用原生api
    if (navigator.clipboard) {
        console.info('使用原生api => navigator.clipboard');
        return navigator.clipboard.writeText(text);
    }
    else {
        return new Promise((resolve, reject) => {
            if (document.queryCommandSupported('copy')) {
                // let fakeElem = document.createElement('input')
                let fakeElem = _clipboardUseTextArea();
                fakeElem.value = text;
                document.body.appendChild(fakeElem);
                fakeElem.select();
                fakeElem.setSelectionRange(0, text.length); // this line fix ios bug
                let succeeded;
                try {
                    succeeded = document.execCommand('Copy');
                    if (succeeded) {
                        resolve();
                    }
                    else {
                        reject(notSupportMessage);
                    }
                }
                catch (err) {
                    reject(err.message);
                }
                // fakeElem.style.display = 'none'
                fakeElem.remove();
            }
            else {
                reject(notSupportMessage);
            }
        });
    }
}
function _clipboardUseTextArea() {
    let isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    let fakeElem = document.createElement('textarea');
    // Prevent zooming on iOS
    fakeElem.style.fontSize = '12pt';
    // Reset box model
    fakeElem.style.border = '0';
    fakeElem.style.padding = '0';
    fakeElem.style.margin = '0';
    // Move element out of screen horizontally
    fakeElem.style.position = 'absolute';
    fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
    // Move element to the same position vertically
    let yPosition = window.pageYOffset || document.documentElement.scrollTop;
    fakeElem.style.top = `${yPosition}px`;
    fakeElem.setAttribute('readonly', '');
    return fakeElem;
}

var logic = /*#__PURE__*/Object.freeze({
  __proto__: null,
  randomColor16: randomColor16,
  randomColorOpacity: randomColorOpacity,
  hex2rgb: hex2rgb,
  rgb2hsl: rgb2hsl,
  throttle: throttle,
  debounce: debounce,
  clip2board: clip2board
});

exports.Check = check;
exports.Classie = classie;
exports.Dom = dom;
exports.Logic = logic;
