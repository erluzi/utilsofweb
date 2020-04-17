function isNode(val: any): Boolean {
  return val instanceof HTMLElement || val && val.nodeType === 1
}

export {
  isNode
}
