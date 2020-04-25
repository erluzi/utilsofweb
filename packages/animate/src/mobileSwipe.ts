import {$, $$, classie} from '../../dom/src'
import {check} from '../../utils/src'
import {throttle} from '../../logic/src'

interface Swipe {
  moveLeft(): void,
  moveRight(): void
}

interface ParamsMobileSwipe {
  box?: string,
  duration?: number,
  loop?: boolean,
  auto?: boolean,
  times?: number,
}

type TouchPoint = {
  x: number,
  y: number,
  timeStamp?: number
}

class MobileSwipe implements Swipe{
  box: HTMLElement;
  items: NodeListOf<HTMLElement>;
  width: number;
  activeNum: number;
  elLeft: HTMLElement;
  elRight: HTMLElement;
  isMoving: boolean;
  isTouchMoved: boolean;
  duration: number;
  loop: boolean;
  auto: boolean;
  times: number; // 滚动间隔时间
  timer: any;
  initPoint: TouchPoint;
  movePoint: TouchPoint;
  constructor({box = '.swipe-box', duration = 400, loop = true, auto = true, times = 4000}: Partial<ParamsMobileSwipe>) {
    this.box = $(box) as HTMLElement
    if (!check.isNode(this.box)) throw Error('未选择正确的dom节点, 参数:box')
    this.items = $$(`${box} > div`) as NodeListOf<HTMLElement>
    if (!(this.items instanceof NodeList)) throw Error(`${box} 无子节点`)
    if (duration < 0) throw Error('未设置正确的过度时间, 参数:duration')
    if (times < 0) throw Error('未设置正确的播放间隔时间, 参数:times')
    this.width = this.box.clientWidth
    this.activeNum = 0
    this.elLeft = this.items[this.items.length - 1]
    this.elRight = this.items[1]
    this.isMoving = false
    this.isTouchMoved = false
    this.duration = duration
    this.loop = loop
    this.auto = auto
    this.times = times
    this.timer = null
    this.initPoint = {x: 0, y: 0, timeStamp: 0}
    this.movePoint = {x: 0, y: 0}
    this.initStyle()
    this.addEvent()
    this.startAutoPlay()
  }
  moveLeft(): void {
    if(this.activeNum === this.items.length - 1 && !this.loop) return
    if(this.isMoving) return
    this.isMoving = true
    this.items[this.activeNum].style.cssText = `transition: transform ${this.duration}ms; transform: translateX(-${this.width}px);`
    this.elRight.style.cssText = `transition: transform ${this.duration}ms; transform: translateX(0);`
    this.activeNum === this.items.length - 1 ? (this.activeNum = 0) : this.activeNum++
  }
  moveRight(): void {
    if(this.activeNum === 0 && !this.loop) return
    if(this.isMoving) return
    this.isMoving = true
    this.items[this.activeNum].style.cssText = `transition: transform ${this.duration}ms; transform: translateX(${this.width}px);`
    this.elLeft.style.cssText = `transition: transform ${this.duration}ms; transform: translateX(0);`
    this.activeNum === 0  ? (this.activeNum = this.items.length - 1) : this.activeNum--
  }
  moveBack(isRight: boolean): void {
    if(this.isMoving) return
    this.isMoving = true
    if(isRight){
      this.elLeft.style.cssText = `transition: transform ${this.duration}ms; transform: translateX(${-this.width}px);`
    }else{
      this.elRight.style.cssText = `transition: transform ${this.duration}ms; transform: translateX(${this.width}px);`
    }
    this.items[this.activeNum].style.cssText = `transition: transform ${this.duration}ms; transform: translateX(0);`
  }
  private initStyle(): void {
    this.elLeft = this.items[this.activeNum === 0 ? this.items.length-1 : this.activeNum-1]
    this.elRight = this.items[this.activeNum === this.items.length-1 ? 0 : this.activeNum+1]
    this.elLeft.style.cssText = `transform: translateX(-${this.width}px);`
    this.elRight.style.cssText = `transform: translateX(${this.width}px);`
    this.isMoving = false
  }
  private addEvent(): void {
    this.box.addEventListener('touchstart', e => {
      e.preventDefault()
      this.stopAutoPlay()
      if(this.isMoving) return
      this.initPoint.x = e.touches[0].clientX
      this.initPoint.y = e.touches[0].clientY
      this.initPoint.timeStamp = e.timeStamp
      this.movePoint.x = e.touches[0].clientX
      this.movePoint.y = e.touches[0].clientY
    });

    this.box.addEventListener('touchmove', throttle((e: any) => {
      e.preventDefault()
      if(this.isMoving) return
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      let movedWidth = x - this.initPoint.x
      let isHorizontal = Math.abs(x - this.movePoint.x) > Math.abs(y - this.movePoint.y)
      if(isHorizontal){
        this.isTouchMoved = true
        this.items[this.activeNum].style.transform = `translateX(${movedWidth}px)`
        if(movedWidth > 0){
          // 👉
          if(this.loop || this.activeNum !== 0) this.elLeft.style.transform = `translateX(${-this.width + movedWidth}px)`
          this.elRight.style.transform = `translateX(${this.width}px)`
        }else{
          // 👈
          this.elLeft.style.transform = `translateX(${-this.width}px)`
          if(this.loop || this.activeNum !== this.items.length - 1) this.elRight.style.transform = `translateX(${this.width + movedWidth}px)`
        }
      }
      this.movePoint.x = x
      this.movePoint.y = y
    }, 50))

    this.box.addEventListener('touchend', e => {
      e.preventDefault()
      this.startAutoPlay()
      if(this.isMoving) return
      let length = Math.abs(e.changedTouches[0].clientX - this.initPoint.x)
      let times = e.timeStamp - (this.initPoint.timeStamp || 0)
      let speed = length / times
      // document.querySelector('#msg').innerHTML = `<p>length: ${length} px</p><p>times: ${times} ms</p><p>speed: ${speed}</p>`;
      if(this.isTouchMoved){
        this.isTouchMoved = false
        let isMoveLeft = this.movePoint.x < this.initPoint.x
        if( (speed < 0.2 && Math.abs(this.movePoint.x - this.initPoint.x) < this.width / 2) ||
          (isMoveLeft && this.activeNum === this.items.length - 1 && !this.loop) ||
          (!isMoveLeft && this.activeNum === 0 && !this.loop)){
          this.moveBack(e.changedTouches[0].clientX > this.initPoint.x)
        }else{
          isMoveLeft ? this.moveLeft() : this.moveRight()
        }
      }
    })

    this.box.addEventListener('mouseenter', e => {
      this.stopAutoPlay()
    })

    this.box.addEventListener('mouseleave', e => {
      this.startAutoPlay()
    })

    for(let item of [...this.items]){
      item.addEventListener('transitionend', () => {
        if(/X\(0(px)?\)/.test(item.style.transform)){
          classie.add(item,'is-active')
          item.style.cssText = ''
          this.initStyle()
        }else{
          classie.remove(item, 'is-active')
        }
      })
    }
  }
  startAutoPlay(): void {
    if(this.auto && this.loop){
      this.timer = setInterval(() => {
        this.moveLeft()
      }, this.times)
    }
  }
  stopAutoPlay(){
    if(this.auto && this.loop) clearInterval(this.timer)
  }
}

export {
  MobileSwipe
}
