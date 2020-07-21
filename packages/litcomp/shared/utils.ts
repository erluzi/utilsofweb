import fn from './prefix_fullscreen'

const screenfull = {
  eventNameMap: {
    change: fn.fullscreenchange,
    error: fn.fullscreenerror,
  },
  async request(element: Element) {
    element = element || document.documentElement
    // @ts-ignore
    await element[fn.requestFullscreen]()
  },
  async exit() {
    // @ts-ignore
    await document[fn.exitFullscreen]()
  },
  async toggle(element: Element) {
    if (this.isFullscreen()) {
      await this.exit()
    } else {
      await this.request(element)
    }
  },
  onchange(cb: Function) {
    this.on('change', cb)
  },
  onerror(cb: Function) {
    this.on('error', cb)
  },
  on(ev: string, cb: any) {
    if (this.eventNameMap[ev]) {
      document.addEventListener(this.eventNameMap[ev], cb, false)
    }
  },
  off(ev: string, cb: any) {
    if (this.eventNameMap[ev]) {
      document.removeEventListener(this.eventNameMap[ev], cb, false)
    }
  },
  isFullscreen(): boolean {
    // @ts-ignore
    return Boolean(document[fn.fullscreenElement])
  },
  element() {
    // @ts-ignore
    return document[fn.fullscreenElement]
  },
  isEnabled() {
    // @ts-ignore
    return Boolean(document[fn.fullscreenEnabled])
  }
}

// Object.defineProperties(screenfull, {
//   isFullscreen: {
//     get: function () {
//       // @ts-ignore
//       return Boolean(document[fn.fullscreenElement])
//     },
//   },
//   element: {
//     enumerable: true,
//     get: function () {
//       // @ts-ignore
//       return document[fn.fullscreenElement]
//     },
//   },
//   isEnabled: {
//     enumerable: true,
//     get: function () {
//       // Coerce to boolean in case of old WebKit
//       // @ts-ignore
//       return Boolean(document[fn.fullscreenEnabled])
//     },
//   },
// })

export {
  screenfull
}
