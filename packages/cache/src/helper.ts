function promisify(request: IDBRequest) : Promise<any> {
  return new Promise((resolve, reject) => {
    request.onsuccess = resolve
    request.onerror = reject
  })
}

export {
  promisify
}
