## Event
- eventMixin
```javascript
class TestObj{}
eventMixin(TestObj)
let obj = new TestObj()
obj.on('charge', fn)
obj.once('charge', fn)
obj.off('charge', fn)
obj.trigger('charge', ...args)
```
