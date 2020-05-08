interface Lock {
  lock(name: string, some: any): any,
  unlock(name: string): void
}

// todo set to LockUtil, but it will not works, it is a bug?
const _locked = new Set()
class LockUtil implements Lock{
  private readonly _fakePromise: object
  constructor() {
    this._fakePromise = {
      then: () => this._fakePromise,
      catch: (cb: Function) => {
        cb && cb()
      }
    }
  }
  lock(name: string, some: any): any {
    if (_locked.has(name)) {
      console.warn(`${name} is locked`)
      return this._fakePromise
    }
    _locked.add(name)
    return typeof some === 'function' ? some() : some
  }
  unlock(name: string): void {
    _locked.delete(name)
  }
}

export {
  LockUtil
}
