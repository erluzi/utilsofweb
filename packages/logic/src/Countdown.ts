import {check} from '../../utils/src'

export class Countdown {
  el: HTMLElement
  leftSecond: number
  timer: number
  constructor(el: HTMLElement, leftMs: number) {
    if(!check.isNode(el)) throw TypeError(`argument el => ${el} is not element`)
    this.el = el
    this.leftSecond =  Math.floor(leftMs / 1000)
    this.timer = -1
  }
  show(prefix = '倒计时') {
    this.handle(prefix);
    this.timer = window.setInterval(() => this.handle(prefix), 1000)
  }
  handle(prefix: string){
    let d, h, m, s;
    d = Math.floor(this.leftSecond / (24 * 60 * 60))
    h = Math.floor(this.leftSecond / 3600) % 24
    m = Math.floor(this.leftSecond / 60) % 60
    s = this.leftSecond % 60
    if(this.leftSecond <= 0) {
      clearInterval(this.timer)
      this.el.innerHTML = '已结束'
    } else {
      if(d > 0){
        this.el.innerHTML = `${prefix} ${d}天${h}时${m}分${s}秒`
      }else if(h > 0){
        this.el.innerHTML = `${prefix} ${h}时${m}分${s}秒`
      }else{
        this.el.innerHTML = `${prefix} ${m}分${s}秒`
      }
      this.leftSecond -= 1
    }
  }
}
