## Utils

- check
  - isNode(val)
  - isEmail(val)
  - isMobilePhone(val)
  
- numberFormat()

```javascript
expect(numberFormat(132134.2)).toBe('132,134.20')
expect(numberFormat(132134)).toBe('132,134.00')
expect(numberFormat('132134.236')).toBe('132,134.24')
```

- dateFormat()

```javascript
let date = new Date(2020, 9, 13, 11, 22, 33)
expect(dateFormat(date)).toBe('2020-10-13')
expect(dateFormat(date, 'yyyy/MM/dd hh:mm:ss')).toBe('2020/10/13 11:22:33')
```

- detectIE(userAgent)

- randomColor16()

- randomColorOpacity()

- hex2rgb()

- rgb2hsl()

- clip2board()

```javascript
  async function copy() {
    await Utils.clip2board(copyText)
    console.log(`clipboard success, text: ${copyText}`)
  }
```

- getPolling()

- throttle(fn, duration)

- debounce(fn, delay)

