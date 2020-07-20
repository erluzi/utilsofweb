import {LitElement, html, customElement, property} from 'lit-element'

@customElement('c-v-controls')
class VideoControls extends LitElement{
  constructor() {
    super()
  }

  @property()
  video: HTMLVideoElement | undefined

  @property()
  icons: Record<string, any> = {
    mute: true,
    fullPage: true,
    fullScreen: true,
    pip: this.hasAttribute('pip'),
    subtitle: this.hasAttribute('subtitle'),
  }

  connectedCallback() {
    super.connectedCallback()
    if (this.parentNode) {
      this.video = this.parentNode.querySelector('video.c-v') as HTMLVideoElement
    }
  }

  handleMute() {
    console.log('handle mute')
    if (this.video) {
      this.video.muted = !this.video.muted
    }
  }
  handleFullPage() {

  }
  handleFullscreen() {

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
    return html`
      <div class="c-v-controls">
        <div class="progress-bar"></div>
        <div class="main">
          <div class="time"></div>
          <div class="icons">
            <button class="mute" @click="${this.handleMute}">静音</button>
            <button class="full-page" @click="${this.handleFullPage}">网页全屏</button>
            <button class="full-screen" @click="${this.handleFullscreen}">全屏</button>
            ${this.icons.pip ? html`<button class="pip" @click="${this.handlePip}">画中画</button>` : ''}
            ${this.icons.subtitle ? html`<button class="subtitle" @click="${this.handleSubtitle}">字幕</button>` : ''}
          </div>
        </div>
      </div>
    `
  }
}

