function isNode(val: any): boolean {
  return val instanceof HTMLElement || val && val.nodeType === 1
}

export {
  isNode
}
