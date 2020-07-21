import {LitElement, html, customElement, property} from 'lit-element'
import {screenfull} from '../shared/utils'

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
  muted: boolean | undefined

  @property()
  isFullPage: boolean = false

  @property()
  isFullscreen: boolean = false

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
      console.log('onchange', this.isFullscreen)
    })
    screenfull.onerror(() => {
      console.log('onerror', this.isFullscreen)
    })
  }

  handleMute() {
    if (this.video) {
      this.muted = this.video.muted = !this.video.muted
    }
  }
  handleFullPage() {

  }
  async handleFullscreen() {
    try {
      await screenfull.toggle(this.box as HTMLElement)
    } catch (err) {
      console.warn(err.message)
    }
  }
  async handlePip() {
    try {
      // @ts-ignore
      if (this.video !== document.pictureInPictureElement) {
        // @ts-ignore
        await this.video.requestPictureInPicture()
      } else {
        // @ts-ignore
        await document.exitPictureInPicture()
      }
    } catch (e) {
      console.warn(e.message)
    }
  }
  handleSubtitle() {}

  render() {
    let dom = html`
      <div class="c-v-controls">
        <div class="progress-bar"></div>
        <div class="main">
          <div class="time"></div>
          <div class="icons">
            <button class="mute" @click="${this.handleMute}">静音(${this.muted ? 'true' : 'false'})</button>
            ${this.icons.fullPage ? html`<button class="full-page" @click="${this.handleFullPage}">网页全屏</button>` : ''}
            <button class="full-screen" @click="${this.handleFullscreen}">${this.isFullscreen ? '退出' : ''}全屏</button>
            ${this.icons.pip ? html`<button class="pip" @click="${this.handlePip}">画中画</button>` : ''}
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

