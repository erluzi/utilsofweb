// const $ = document.querySelector.bind(document)
// const $$ = document.querySelectorAll.bind(document)
// want:
// let list = Dom.$('.list')
// let items = Dom.$$('.item', list)

import {isNode} from '../utils/check'

function valid(root: any): boolean {
  if (root !== document && !isNode(root)) {
    console.warn(`argument root => ${root} is not element!`)
    return false
  }
  return true
}

function $(selector: string, root = document) {
  return valid(root) ? root.querySelector(selector) : null
}

function $$(selector: string, root = document) {
  return valid(root) ? root.querySelectorAll(selector) : null
}

export {
  $, $$
}
