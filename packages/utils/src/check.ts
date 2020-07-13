import {Regexs} from './Consts'

function isNode(val: any): boolean {
  return val instanceof HTMLElement || (val && val.nodeType === 1)
}

function isEmail(val: string): boolean {
  return Regexs.email.test(val)
}

let check = {
  isNode,
  isEmail,
}

export {
  check
}
