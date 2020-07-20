import {LitElement, html, customElement, property} from 'lit-element'
import { classMap } from 'lit-html/directives/class-map'

@customElement('c-message')
class Message extends LitElement{
  @property()
  message = ''

  @property()
  type = this.getAttribute('type')

  @property()
  classes = {'c-message': true, ['c-message-' + this.type]: true}

  render() {
    return html`<p class=${classMap(this.classes)}><slot></slot></p>`
  }
}

