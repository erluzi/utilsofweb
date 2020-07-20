import {LitElement, html, customElement, property} from 'lit-element'

@customElement('c-v-controls')
class VideoControls extends LitElement{
  constructor() {
    super()
    // get video and set
  }

  @property()
  video: HTMLVideoElement | undefined

  connectedCallback() {
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

  render() {
    return html`
      <div class="c-v-controls">
        <div class="progress-bar"></div>
        <div class="main">
          <div class="time"></div>
          <div class="icons">
            <button class="mute" @click="${this.handleMute}">静音</button>
            <button class="full-page">网页全屏</button>
            <button class="full-screen">全屏</button>
            <button class="pip">画中画</button>
            <button class="vtt">字幕</button>
          </div>
        </div>
      </div>
    `
  }
}

export default VideoControls
