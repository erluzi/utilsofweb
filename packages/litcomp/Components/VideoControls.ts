import {LitElement, html, customElement, property} from 'lit-element'
// import { classMap } from 'lit-html/directives/class-map'
import {screenfull, pagefull, videopip} from '../shared/utils'

@customElement('c-v-controls')
class VideoControls extends LitElement{
  constructor() {
    super()
  }

  @property({attribute: false})
  box: HTMLElement | undefined

  @property({attribute: false})
  video: HTMLVideoElement | undefined

  @property()
  muted: boolean = true

  @property()
  isFullPage: boolean = false

  @property()
  isFullscreen: boolean = false

  @property()
  isPip: boolean = false

  @property()
  icons: Record<string, boolean> = {
    fullPage: this.hasAttribute('fullPage'),
    pip: this.hasAttribute('pip'),
    subtitle: this.hasAttribute('subtitle'),
  }

  connectedCallback() {
    super.connectedCallback()
    if (this.parentNode) {
      this.box = this.parentNode as HTMLElement
      this.video = this.parentNode.querySelector('video.c-v') as HTMLVideoElement
    }
    if (this.video) {
      this.muted = this.video.muted
      this.initEvents()
    }
  }

  initEvents() {
    screenfull.onchange(() => {
      this.isFullscreen = screenfull.isFullscreen()
    })
    screenfull.onerror(() => {
      console.warn('onerror', this.isFullscreen)
    })

    videopip.onchange(this.video as HTMLVideoElement,() => {
      this.isPip = videopip.isVideoPip(this.video as HTMLVideoElement)
    })

    pagefull.onchange(() => {
      this.isFullPage = pagefull.isFullPage(this.box as HTMLElement)
    })
  }

  handleMute() {
    if (this.video) {
      this.muted = this.video.muted = !this.video.muted
    }
  }
  // 网页全屏
  async handleFullPage() {
    if (this.box) {
      try {
        await pagefull.toggle(this.box)
      } catch (err) {
        console.warn(err.message)
      }
    }
  }
  // 全屏
  async handleFullscreen() {
    if (this.box) {
      try {
        await screenfull.toggle(this.box as HTMLElement)
      } catch (err) {
        console.warn(err.message)
      }
    }
  }
  // 画中画
  async handlePip() {
    if (this.video) {
      try {
        await videopip.toggle(this.video as HTMLVideoElement)
      } catch (err) {
        console.warn(err.message)
      }
    }
  }
  // 字幕
  handleSubtitle() {}

  render() {
    let dom = html`
      <div class="c-v-controls">
        <div class="progress-bar"></div>
        <div class="main">
          <div class="time"></div>
          <div class="icons">
            <button class="mute" @click="${this.handleMute}">静音(${this.muted ? 'true' : 'false'})</button>
            ${this.icons.fullPage ? html`<button class="full-page" @click="${this.handleFullPage}">${this.isFullPage ? '退出' : ''}网页全屏</button>` : ''}
            <button class="full-screen" @click="${this.handleFullscreen}">${this.isFullscreen ? '退出' : ''}全屏</button>
            ${this.icons.pip ? html`<button class="pip" @click="${this.handlePip}">${this.isPip ? '退出' : ''}画中画</button>` : ''}
            ${this.icons.subtitle ? html`<button class="subtitle" @click="${this.handleSubtitle}">字幕</button>` : ''}
          </div>
        </div>
      </div>
    `
    return html`
      ${this.video ? dom : ''}
    `
  }
}

