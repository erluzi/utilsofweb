// 锁，只提供 锁字符串

class Lock {
  private _locked: Set<any>
  private readonly _fakePromise: object
  constructor() {
    this._locked = new Set()
    this._fakePromise = {
      then: () => this._fakePromise,
      catch: (cb: Function) => {
        cb && cb(Error('resource was been locked'))
      }
    }
  }
  lock(name: string, some: any): any {
    if (this._locked.has(name)) {
      console.warn(`${name} is locked`)
      return this._fakePromise
    }
    this._locked.add(name)
    return typeof some === 'function' ? some() : some
  }
  unlock(name: string): void {
    this._locked.delete(name)
  }
}

export {
  Lock
}
