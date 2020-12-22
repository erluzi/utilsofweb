function sleep(t: number) {
  return new Promise(resolve => setTimeout(resolve, t))
}

class AsyncHook {
  hooks: Function | null
  pluginName: string
  constructor () {
    this.hooks = null
    this.pluginName = ''
  }
  // 此函数执行异步钩子
  async promise (...args: any[]) {
    let result = null
    if (this.hooks) {
      result = await this.hooks.apply(null, args)
    }
    return result
  }
  // 此函数绑定异步钩子
  tapPromise (pluginName: string, cb: Function) {
    this.pluginName = pluginName
    this.hooks = cb
  }
}

function promisify(request: IDBRequest) : Promise<any> {
  return new Promise((resolve, reject) => {
    request.onsuccess = resolve
    request.onerror = reject
  })
}

export {
  sleep,
  promisify,
  AsyncHook
}
