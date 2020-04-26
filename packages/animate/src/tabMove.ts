import {$ as $el, $$, classie} from '../../dom/src'
import {check} from '../../utils/src'

class TabMove {
  tab: HTMLElement;
  items: NodeListOf<HTMLElement>;
  bar!: HTMLElement;
  activeIndex: number;
  constructor({box = '.tab'}) {
    this.tab = $el(box) as HTMLElement
    if (!check.isNode(this.tab)) throw Error('未选择正确的dom节点, 参数:box')
    this.items = $$(`${box} > div`) as NodeListOf<HTMLElement>
    if (!(this.items instanceof NodeList && this.items.length)) throw Error(`${box} 无子节点`)
    let activeItem = $el(`${box} > div.active`)
    this.activeIndex = activeItem ? [...this.items].indexOf(activeItem as HTMLElement) : 0
    this.setBarDom()
    this.setBarLayout(this.activeIndex)
    this.addEvent()
  }
  private setBarDom():void {
    let el = document.createElement('div')
    el.className = 'tab-bar'
    this.tab.appendChild(el)
    this.bar = el
  }
  private setBarLayout(index: number){
    let lr = {
      left: (+index / this.items.length * 100).toFixed(3),
      right: ((this.items.length - 1 - +index) / this.items.length * 100).toFixed(3)
    }
    this.bar.style.cssText = `left: ${lr.left}%; right: ${lr.right}%`
  }
  private addEvent():void {
    [...this.items].map((item, index) => {
      item.dataset.id = index + ''
      item.addEventListener('click', e => {
        // @ts-ignore
        const {id} = e.currentTarget.dataset
        this.moveTo(id)
      })
    })
    this.bar.addEventListener('transitionend', () => {
      this.bar.className = this.bar.className.replace(/\s*tab-bar-(for|back)ward/, '')
      classie.add(this.items[this.activeIndex], 'active')
    })
  }
  moveTo(index: number): void {
    if(this.activeIndex === index) return
    // 取消active
    classie.remove(this.items[this.activeIndex], 'active')
    // 设置bar的transition
    classie.add(this.bar, `tab-bar-${this.activeIndex < index ? 'forward' : 'backward'}`)
    // 设置bar的样式
    this.setBarLayout(index)
    this.activeIndex = index
  }
}

export {
  TabMove
}
