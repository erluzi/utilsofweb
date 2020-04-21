'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function isNode(val) {
    return val instanceof HTMLElement || val && val.nodeType === 1;
}
let check = {
    isNode
};

// const $ = document.querySelector.bind(document)
function valid(root) {
    if (root !== document && !check.isNode(root)) {
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

exports.$ = $;
exports.$$ = $$;
exports.classie = classie;
