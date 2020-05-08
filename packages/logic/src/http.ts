import {LockUtil} from '../../utils/src'

interface Apis {
  [index: string]: any
}

function generateFetch(initApis: Apis = {}, initConfig: any = {}, handler: Function): Function {
  let apis: Apis = initApis
  let initData = initConfig.datas || {}
  let initHeaders = initConfig.headers || {}
  function fetchData (apiName: string, data: object) {
    let [url, method, domain] = apis[apiName]
    if (!url) throw Error(`${apiName} is undefined`)
    const dataSend = Object.assign(initData, data)
    const request: RequestInit = {
      body: JSON.stringify(dataSend),
      method,
      mode: 'cors',
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, initHeaders)
    }
    const channel = `${url}_${JSON.stringify(dataSend)}`
    // todo use FormData
    // @ts-ignore
    if (request.headers['Content-Type'] === 'multipart/form-data') {
      let formData = new FormData()
      for (let key in dataSend) {
        formData.append(key, dataSend[key])
      }
      request.body = formData
    }
    let apiLock = new LockUtil()
    let fn = () => new Promise((resolve, reject) => {
      fetch(domain ? domain + url : url, request).then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw Error('net work error')
          // reject(Error('net work error'))
        }
      }).then(res => {
        if (res.code === 200) {
          resolve(res)
        } else {
          handler && handler(res)
          throw Error(res.msg || res.message)
          // reject(Error(res.msg || res.message))
        }
      }).catch(err => {
        reject(err)
      }).finally(() => {
        setTimeout(apiLock.unlock.bind(apiLock), 1000, channel)
      })
    })
    return apiLock.lock(channel, fn)
  }
  fetchData.addApi = (moreApis: Apis): void => {
    apis = Object.assign({}, apis, moreApis)
  }
  fetchData.updateInitConfig = (updateInitConfig: any) => {
    initData = updateInitConfig.initData
    initHeaders = updateInitConfig.initHeaders
  }
  return fetchData
}

export {
  generateFetch
}
