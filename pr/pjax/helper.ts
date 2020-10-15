type State = {
  title: string,
  url: string
}

interface DataHandler {
  getData: Function
}

class CacheMapHelper {
  private cache: Map<any, any>
  constructor() {
    this.cache = new Map()
  }

  addCache(state: State) {
    this.cache.set(state.title, state)
    return this
  }

  delCache(state: State) {
    this.cache.delete(state.title)
    return this
  }

  hasCache(state: State) {
    return this.cache.has(state.title)
  }

  getCache(state: State) {
    return this.cache.get(state.title)
  }
}

class DataAjax {
  private dataHandler: DataHandler
  // 载入数据获取方法
  constructor(dataHandler: DataHandler) {
    this.dataHandler = dataHandler
  }
  async getData(state: State) {
    return await this.dataHandler.getData(state)
  }
}

class DataManager {
  private readonly useMock: boolean
  private cacheMapHelper: CacheMapHelper
  private dataAjax: DataAjax

  constructor(type: DataHandler | boolean) {
    this.useMock = type === true
    this.cacheMapHelper = new CacheMapHelper()
    this.dataAjax = new DataAjax(type as DataHandler)
  }

  async getData(state: State) {
    if (this.useMock) {
      return this.cacheMapHelper.getCache(state)
    } else {
      return await this.dataAjax.getData(state)
    }
  }
}

export {
  CacheMapHelper,
  DataManager
}
