import {promisify} from './helper'

class DBManager {
  db: IDBDatabase | null
  version: number
  constructor () {
    this.db = null
    this.version = 1
  }

  async open (database: string, version?: number) : Promise<IDBDatabase> {
    if (version && version > this.version) this.version = version
    let request = indexedDB.open(database, this.version)
    //版本升级时调用一次
    request.onupgradeneeded = () => {
      console.log('onupgradeneeded')
      // The database did not previously exist, so create object stores and indexes.
    }
    let event = await promisify(request)
    this.db = event.result
    return event.result
  }

  async getSetObjectStore (storeName: string, optionalParameters?: IDBObjectStoreParameters) : Promise<IDBObjectStore> {
    if (!this.db) return Promise.reject(Error('database is not initialize'))
    let store
    try {
      if (this.db.objectStoreNames.contains(storeName)) {
        let transaction = this.db.transaction(storeName)
        store = transaction.objectStore(storeName)
      } else {
        store = this.db.createObjectStore(storeName, optionalParameters)
      }
      return Promise.resolve(store)
    } catch (err) {
      return Promise.reject(Error(err))
    }
  }

  async getObjectStore (storeName: string, mode?: IDBTransactionMode): Promise<IDBObjectStore> {
    if (!this.db) return Promise.reject(Error('database is not initialize'))
    let store
    try {
      let transaction = this.db.transaction(storeName, mode)
      store = transaction.objectStore(storeName)
      return Promise.resolve(store)
    } catch (err) {
      return Promise.reject(Error(err))
    }
  }

  // add | update 均使用此方法 需保证item包含主键，避免在update主键自增的表时执行的是add
  async put (storeName: string, item: object) {
    let store = await this.getObjectStore(storeName, 'readwrite')

    let request = store.put(item)

    await promisify(request)
  }

  async getItem (storeName: string, key: string, val: any) {
    let store = await this.getObjectStore(storeName, 'readonly')

    let index = store.index(key)
    let request = index.get(val)

    let event = await promisify(request)
    return event.result
  }

  async getAll (storeName: string, key: string, query?: IDBValidKey | IDBKeyRange | null) {
    let store = await this.getObjectStore(storeName, 'readonly')

    let index = store.index(key)
    let request = index.openCursor(query)

    let event = await promisify(request)
    let result: any[] = []
    let cursor = event.result
    if (cursor) {
      result.push(cursor.value)
      cursor.continue()
    }
    return result
  }

  // 根据主键删除
  async removeItem (storeName: string, indexVal: any) {
    let store = await this.getObjectStore(storeName, 'readwrite')

    let request = store.delete(indexVal)

    await promisify(request)
  }

  async clear (storeName: string) {
    let store = await this.getObjectStore(storeName, 'readwrite')

    let request = store.clear()

    await promisify(request)
  }
}

export default DBManager
