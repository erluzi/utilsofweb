class DBManager {
  db: IDBDatabase | null
  constructor () {
    this.db = null
  }
  async open (database: string, version: number) : Promise<IDBDatabase> {
    let request = indexedDB.open(database, version)
    return new Promise((resolve, reject) => {
      //版本升级时调用一次
      request.onupgradeneeded = () => {
        console.log('onupgradeneeded')
        // The database did not previously exist, so create object stores and indexes.
        this.db = request.result
      }
      request.onerror = e => {
        console.warn(e.target)
        reject(e)
      }
      request.onsuccess = () => {
        console.log('创建或打开数据库成功')
        this.db = request.result
        resolve(request.result)
      }
    })
  }
  getObjectStore (name: string, optionalParameters?: IDBObjectStoreParameters) : IDBObjectStore | null {
    if (!this.db) return null
    let store = null
    if (this.db.objectStoreNames.contains(name)) {
      let transaction = this.db.transaction(name)
      store = transaction.objectStore(name)
    } else {
      store = this.db.createObjectStore(name, optionalParameters)
    }
    return store
  }
}

export default DBManager
