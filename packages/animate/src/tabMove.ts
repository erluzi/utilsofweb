import {$, $$, classie} from '../../dom/src'
import {check} from '../../utils/src'

interface TabMoveParams {
  box: string,
  height?: number,
  color?: string
}

class TabMove {
  tab: HTMLElement;
  items: NodeListOf<HTMLElement>;
  bar!: HTMLElement;
  activeIndex: number;
  constructor({box = '.tab', height = 3, color = 'orange'}: Partial<TabMoveParams>) {
    this.tab = $(box) as HTMLElement
    if (!check.isNode(this.tab)) throw Error('未选择正确的dom节点, 参数:box')
    this.items = $$(`${box} > div`) as NodeListOf<HTMLElement>
    if (!(this.items instanceof NodeList)) throw Error(`${box} 无子节点`)
    this.activeIndex = 0
    this.setBarDom(height, color)
    this.setBarLayout(this.activeIndex)
    this.addEvent()
  }
  private setBarDom(height: number, color: string):void {
    let el = document.createElement('div')
    el.className = 'tab-bar'
    el.style.cssText = `height: ${height}px; background-color: ${color};`
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
    this.bar.className = `${this.bar.className} tab-bar-${this.activeIndex < index ? 'forward' : 'backward'}`
    // 设置bar的样式
    this.setBarLayout(index)
    this.activeIndex = index
  }
}

export {
  TabMove
}
