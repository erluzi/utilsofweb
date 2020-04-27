## Logic
- Djs
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
