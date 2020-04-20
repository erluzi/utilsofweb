function eventMixin(Obj: Function) {
  Obj.prototype._events = {};
  Obj.prototype.on = function (type: string, fn: Function, context = this) {
    if (!this._events[type]) {
      this._events[type] = []
    }

    this._events[type].push([fn, context])
  }

  Obj.prototype.once = function (type: string, fn: Function, context = this) {
    function magic(...args: any[]) {
      this.off(type, magic)
      fn.apply(context, args)
    }
    // To expose the corresponding function method in order to execute the off method
    magic.fn = fn
    this.on(type, magic)
  }

  Obj.prototype.off = function (type: string, fn: Function) {
    let _events = this._events[type]
    if (!_events) {
      return
    }

    let count = _events.length
    while (count--) {
      if (_events[count][0] === fn || (_events[count][0] && _events[count][0].fn === fn)) {
        _events[count][0] = undefined
      }
    }
  }

  Obj.prototype.trigger = function (type: string, ...args: any[]) {
    let events = this._events[type]
    if (!events) {
      return
    }

    let len = events.length
    let eventsCopy = [...events]
    for (let i = 0; i < len; i++) {
      let event = eventsCopy[i]
      let [fn, context] = event
      if (fn) {
        fn.apply(context, args)
      }
    }
  }
}

export default eventMixin
