import {$$} from '../../dom/src'
import {check} from '../../utils/src'

class Popup {
  private activeEl: HTMLElement | null
  private mask!: HTMLElement
  constructor({box = '.popup', clear = true}) {
    let pops = $$(box) as NodeListOf<HTMLElement>
    pops.forEach(pop => pop.style.transition = 'transform 300ms')
    this.activeEl = null
    this.setMask(clear)
  }
  private setMask(clear:boolean):void {
    let el_mask = document.createElement('div')
    el_mask.className = 'mask pop-mask'
    el_mask.style.display = 'none'
    document.body.appendChild(el_mask)
    this.mask = el_mask
    if(clear) {
      this.mask.addEventListener('click', () => {
        if(this.activeEl) this.moveOut(this.activeEl)
      })
    }
  }
  moveIn(el: HTMLElement | string):void {
    let dom = typeof el === 'string' ? document.querySelector(el) as HTMLElement : el
    if(!check.isNode(dom)) throw Error('未选择正确的dom节点, fn: moveIn(el)')
    // @ts-ignore
    if(dom.dataset.isIn === '1') return
    dom.dataset.isIn = '1'
    let direction = dom.dataset.direction
    if(!direction) dom.dataset.direction = direction = Popup.getDirection(getComputedStyle(dom).transform)
    this.mask.style.display = 'block'
    switch (direction) {
      case 'top':
      case 'bottom':
        dom.style.transform = 'translateY(0)';
        break;
      case 'left':
      case 'right':
        dom.style.transform = 'translateX(0)';
        break;
      default:
        console.warn('error direction')
    }
    this.activeEl = dom
  }
  moveOut(el: HTMLElement | string):void {
    let dom = typeof el === 'string' ? document.querySelector(el) as HTMLElement : el
    if(!check.isNode(dom)) throw Error('未选择正确的dom节点, fn: moveOut(el)')
    // @ts-ignore
    if(dom.dataset.isIn === '0') return
    dom.dataset.isIn = '0'
    let direction = dom.dataset.direction
    switch (direction) {
      case 'top':
        dom.style.transform = 'translateY(-100%)'
        break;
      case 'right':
        dom.style.transform = 'translateX(100%)'
        break;
      case 'bottom':
        dom.style.transform = 'translateY(100%)'
        break;
      case 'left':
        dom.style.transform = 'translateX(-100%)'
        break;
      default:
        console.warn('error direction')
    }
    this.activeEl = null
    setTimeout(() => this.mask.style.display = 'none', 200)
  }
  /**
   * ⬆️ matrix(1, 0, 0, 1, 0, -400)
   * ➡️ matrix(1, 0, 0, 1, 300, 0)
   * ⬇️ matrix(1, 0, 0, 1, 0, 400)
   * ⬅️ matrix(1, 0, 0, 1, -300, 0)
   * @param matrix
   */
  static getDirection(matrix: string): string{
    let re = ''
    matrix.replace(/^matrix\((\d+), (\d+), (\d+), (\d+), (-?\d+), (-?\d+)\)$/, (match, p1, p2, p3, p4, p5, p6) => {
      if(+p5 === 0 && +p6 === 0) re = 'center'
      else if(+p5 === 0) {
        if(+p6 < 0) re = 'top'
        else re = 'bottom'
      }else if(+p6 === 0) {
        if(+p5 < 0) re = 'left'
        else re = 'right'
      }
      return ''
    })
    return re
  }
}

export {
  Popup
}
