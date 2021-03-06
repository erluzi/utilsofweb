import {classie, $, $$} from '../../dom/src'

const types_animation = ['animationstart', 'animationend', 'animationiteration']
const types_transition = ['transitionstart', 'transitioncancel', 'transitionend', 'transitionrun']
const types_form = ['reset', 'submit']
const types_views = ['fullscreenchange', 'fullscreenerror', 'resize', 'scroll']
const types_mouse = ['click', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup',
  'pointerlockchange', 'pointerlockerror', 'select', 'wheel']
const types_drag = ['drag', 'dragend', 'dragenter', 'dragstart', 'dragleave', 'dragover', 'drop']
const types = [
  ...types_animation,
  ...types_transition,
  ...types_form,
  ...types_views,
  ...types_mouse,
  ...types_drag,
]

interface Page {
  name: string,
  url: string,
  template: string,
  isBind?: boolean,
  events?: Record<string, any>,
}

interface PageStack {
  config: Page,
  dom: HTMLElement
}

export class PageManager {
  container: HTMLElement
  pageStack: Array<PageStack>
  pages: Array<Page>
  defaultPage: Page | null
  pageIndex: number

  constructor() {
    this.container = $('.spa') as HTMLElement
    this.pageStack = []
    this.pages = []
    this.defaultPage = null
    this.pageIndex = 1
  }

  setPages(events: Record<string, Record<string, any>> = {}) {
    let tpls = $$('template[id^="tpl_"]')
    if (tpls) {
      let i = 0, l = tpls.length, name = ''
      for (; i < l; ++i) {
        name = tpls[i].id.replace(/tpl_/, '')
        this.pages.push({
          name,
          url: '#' + (name === 'home' ? '' : name), // 首页无hash
          template: '#' + tpls[i].id,
          events: events[name]
        })
      }
    }
    return this
  }

  setDefaultPage(defaultPage: string) {
    this.defaultPage = this._find('name', defaultPage)
    return this
  }

  init() {
    window.addEventListener('hashchange', () => {
      let state = history.state || {}
      let url = this._getUrl()
      let page = this._find('url', url) || this.defaultPage
      if (state.pageIndex <= this.pageIndex || this._findInStack(url)) {
        if (page) this._back(page)
      } else {
        if (page) this._go(page)
      }
    })
    if (history.state && history.state.pageIndex) {
      this.pageIndex = history.state.pageIndex
    }
    this.pageIndex--
    let url = this._getUrl()
    let page = this._find('url', url) || this.defaultPage
    if (page) this._go(page)
    return this
  }

  pushPage(config: Page) {
    this.pages.push(config)
    return this
  }

  go(to: string) {
    let config = this._find('name', to)
    if (config) location.hash = config.url
  }

  _go(config: Page) {
    this.pageIndex++
    history.replaceState && history.replaceState({pageIndex: this.pageIndex}, '', location.href)
    let template = $(config.template) as HTMLTemplateElement // 使用template api
    let elPage = template.content.querySelector('.page') as HTMLElement
    classie.add(elPage, 'slideIn')
    classie.add(elPage, config.name)
    elPage.addEventListener('animationend', () => {
      classie.remove(elPage, 'slideIn')
      classie.add(elPage, 'js_show')
    })
    let clone = document.importNode(elPage, true) // clone page
    this.container.appendChild(clone)
    this.pageStack.push({
      config: config,
      dom: clone,
    })
    // if (!config.isBind) {
    //   this._bind(config)
    // }
    this._bind(config)
    return this
  }

  _back(config: Page) {
    this.pageIndex--
    let stack = this.pageStack.pop() as PageStack
    if (!stack) return
    let url = this._getUrl()
    let found = this._findInStack(url)
    if (!found) { // page没有缓存的话执行插入
      let template = $(config.template) as HTMLTemplateElement // 使用template api
      let elPage = template.content.querySelector('.page') as HTMLElement
      classie.add(elPage, 'js_show')
      classie.add(elPage, config.name)
      let clone = document.importNode(elPage, true) // clone page
      this.container.insertBefore(clone, stack.dom)
      if (!config.isBind) {
        this._bind(config)
      }
      this.pageStack.push({
        config: config,
        dom: clone,
      })
    }
    stack.dom.addEventListener('animationend', () => {
      stack.dom.remove()
    })
    classie.add(stack.dom, 'slideOut')
    return this
  }

  _findInStack(url: string) {
    for (let stack of this.pageStack) {
      if (stack.config.url === url) return stack
    }
    return null
  }

  _find(key: keyof Page, value: string): Page | null {
    for (let page of this.pages) {
      if (page[key] === value) return page
    }
    return null
  }

  _getUrl(): string {
    // location.hash.indexOf('#') === 0 ? location.hash : '#'
    return /^#[A-Za-z0-9_\-]+/.test(location.hash) ? location.hash : '#'
  }

  // todo
  // addEvents(name: string) {
  //   let page: Page | null = this._find('name', name)
  // }

  // 绑事件
  _bind(page: Page) {
    let events = page.events || {}
    for (let selector in events) {
      let elems = $$(selector)
      for (let type in events[selector]) {
        let eventHandlers = events[selector][type]
        let isEventType = types.indexOf(type) !== -1
        if (elems) {
          for (let elem of [...elems]) { // bind begin
            if (isEventType) {
              elem.addEventListener(type, ev => {
                eventHandlers.trigger(selector + '-' + type, ev)
              })
            } else {
              eventHandlers.trigger(selector + '-' + type, elem)
            }
          }
        }
      }
    }
    page.isBind = true
  }
}
