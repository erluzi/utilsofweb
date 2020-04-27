# Animate
- Ani
```javascript
  async function animate() {
    Animate.Ani.initProps('width', 'height')
    await Animate.Ani.ani(
      {target: elAnimate},
      {width: '100px'}
    )
    await Animate.Ani.ani(
      {target: elAnimate},
      {height: '200px'}
    )
  }
```

- MobileSwipe
```javascript
let mobileSwipe = new Animate.MobileSwipe({times: 5000, auto: false})
```

  - mobileSwipe.moveLeft()
  - mobileSwipe.moveRight()


- TabMove
```javascript
new Animate.TabMove({box: '.tab1'});
```

- Popup
```javascript
let popup = new Animate.Popup({clear: false})
```
  - popup.moveIn(el | string)
  - popup.moveOut(el | string)
