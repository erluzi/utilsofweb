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

const pagefull = {
  handleChange: null,
  async request(element: HTMLElement) {
    element.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #fff;
      z-index: 2;
    `
    element.classList.add('full-page')
    if (this.handleChange) {
      this.handleChange.call(undefined)
    }
  },
  async exit(element: HTMLElement) {
    element.style.cssText = ``
    element.classList.remove('full-page')
    if (this.handleChange) {
      this.handleChange.call(undefined)
    }
  },
  async toggle(element: HTMLElement) {
    if (element.classList.contains('full-page')) {
      await this.exit(element)
    } else {
      await this.request(element)
    }
    if (this.handleChange) {
      this.handleChange.call(undefined)
    }
  },
  onchange(cb: any) {
    this.handleChange = cb
  },
  isFullPage(element: HTMLElement): boolean {
    return element.classList.contains('full-page')
  },
}

const videopip = {
  async request(element: HTMLVideoElement) {
    // @ts-ignore
    await element.requestPictureInPicture()
  },
  async exit() {
    // @ts-ignore
    await document.exitPictureInPicture()
  },
  async toggle(element: HTMLVideoElement) {
    // @ts-ignore
    if (element !== document.pictureInPictureElement) {
      await this.request(element)
    } else {
      await this.exit()
    }
  },
  onchange(videoElement: HTMLVideoElement, cb: any) {
    videoElement.addEventListener('enterpictureinpicture', cb);
    videoElement.addEventListener('leavepictureinpicture', cb);
  },
  isVideoPip(element: HTMLVideoElement): boolean {
    // @ts-ignore
    return element === document.pictureInPictureElement
  },
}

export {
  pagefull,
  videopip
}
