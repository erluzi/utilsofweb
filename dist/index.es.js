function isNode(val) {
    return val instanceof HTMLElement || val && val.nodeType === 1;
}

var check = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isNode: isNode
});

export { check as Check };
