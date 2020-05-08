const _fakePromise = {
  then: () => _fakePromise,
  catch: (cb: Function) => {
    cb && cb()
  }
}

interface Lock {
  lock(name: string, some: any): any,
  unlock(name: string): void
}

class LockUtil implements Lock{
  private locked: string[]
  constructor(locked: string[] = []) {
    this.locked = locked
  }
  lock(name: string, some: any): any {
    if (this.locked.indexOf(name) !== -1) {
      console.warn(`${some} is locked`)
      return _fakePromise
    }
    this.locked.push(name)
    return (typeof some === 'function' ? some() : some)
  }
  unlock(name: string): void {
    this.locked = this.locked.filter(n => n !== name)
  }
}
