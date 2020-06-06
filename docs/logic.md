## Logic
- Countdown
- randomColor16()
- randomColorOpacity()
- hex2rgb()
- rgb2hsl()
- clip2board()
```javascript
  async function copy() {
    await Logic.clip2board(copyText)
    console.log(`clipboard success, text: ${copyText}`)
  }
```
- throttle(fn, duration)
- debounce(fn, delay)

- PageManager
```javascript
let pm = new Logic.PageManager()
let events = {
  [name]: {
    [selector]: {
      click: eventMixinInstance, // 点击
      immediate: eventMixinInstance, // 立即执行
    },
  },
  ...
}
pm.setPages(events).setDefaultPage('home').init()
```
