function classReg(className: string): RegExp {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)")
}

// let hasClass = function(elem: HTMLElement, c: string): Boolean
// let addClass = function(elem: HTMLElement, c: string): void
// let removeClass = function(elem: HTMLElement, c: string): void
type ClassIe = (elem: HTMLElement, c: string) => boolean | void
interface CheckClass {
  (elem: HTMLElement, c: string): boolean
}
let hasClass: CheckClass
let addClass: ClassIe
let removeClass: ClassIe

if('classList' in document.documentElement) {
  hasClass = (elem: HTMLElement, c: string): boolean => elem.classList.contains(c)
  addClass = (elem: HTMLElement, c: string): void => elem.classList.add(c)
  removeClass = (elem: HTMLElement, c: string): void => elem.classList.remove(c)
} else {
  hasClass = (elem: HTMLElement, c: string): boolean => classReg(c).test(elem.className)
  addClass = (elem: HTMLElement, c: string): void => {
    if (!hasClass(elem, c)) {
      elem.className = elem.className + ' ' + c
    }
  }
  removeClass = (elem: HTMLElement, c: string): void => {
    elem.className = elem.className.replace(classReg(c), '')
  }
}

function toggleClass(elem: HTMLElement, c: string): void {
  let fn = hasClass(elem, c) ? removeClass: addClass
  fn(elem, c)
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
}

export default classie
