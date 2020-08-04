import {Regexs} from './Consts'

function isNode(val: any): boolean {
  return val instanceof HTMLElement || (val && val.nodeType === 1)
}

function isEmail(val: string): boolean {
  return Regexs.email.test(val)
}

function isMobilePhone(val: string | number): boolean {
  return Regexs.mobilePhone.test(String(val))
}

let check = {
  isNode,
  isEmail,
  isMobilePhone
}

export {
  check
}
