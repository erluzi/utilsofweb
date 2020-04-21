import {hex2rgb} from '../../logic/src'

interface AniOptions {
  target: HTMLElement,
  easing?: string,
  duration?: number
  delay?: number,
  loop?: boolean,
}

interface AniProps {
  [propName: string]: string
}

// use:
// Ani.initProps('width', 'height')
// Ani.ani(
//   {target: Dom.$('.ani')},
//   {width: '100px'}
// )
let Ani = {
  listenerFn: undefined,
  stiff: true,
  accept: ['target', 'easing', 'duration', 'delay', 'loop'],
  aniProps: [],
  aniPropsAll: [],
  getPropsAll(){
    if(this.aniPropsAll.length){
      return this.aniPropsAll
    }else{
      return Object.keys(getComputedStyle(document.body)).filter((value, index, array) => {
        return isNaN(Number(value)) && !value.startsWith('webkit')
      })
    }
  },
  initProps(...props: string[]){
    let propsAll = this.getPropsAll()
    let aniProps = []
    for(let prop of props){
      if(propsAll.includes(prop)){
        aniProps.push(prop)
      }
    }
    this.aniProps = aniProps
  },
  ani(options: AniOptions, props: AniProps){
    return new Promise((resolve, reject) => {
      let target = options.target
      let easing = options.easing || 'ease'
      let duration = options.duration || 300
      let delay = options.delay || 0
      let loop = options.loop || false
      target.style.transition = `all ${duration}ms ${easing} ${delay}ms`
      if(this.listenerFn !== undefined){
        target.removeEventListener('transitionend', this.listenerFn)
      }
      this.listenerFn = () => {
        this.stiff = true
        resolve()
      }
      target.addEventListener('transitionend', this.listenerFn)
      for(let prop of this.aniProps) {
        let aniProp = props[prop]
        if(aniProp){
          if(/^#([0-9a-f]{3})$/.test(aniProp) || /^#([0-9a-f]{6})$/.test(aniProp)){
            if(hex2rgb(aniProp) !== target.style[prop]){
              console.log(`update color ${prop}: ${aniProp}`)
              target.style[prop] = aniProp
              this.stiff = false
            }
          }else{
            if(aniProp !== target.style[prop]){
              console.log(`update ${prop}: ${aniProp}`)
              target.style[prop] = aniProp
              this.stiff = false
            }
          }
        }
      }
      //未发生动画
      if(this.stiff) resolve()
    })
  }
};

export {
  Ani
}
