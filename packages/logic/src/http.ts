import {Lock} from '../../utils/src'
import qs from 'qs'

interface Apis {
  [index: string]: Array<any>
}

interface Configs {
  data: Record<string, any>,
  header: Record<string, string>
}

function generateFetch(initApis: Apis = {}, initConfig: Configs, handler: Function): Function {
  let apis: Apis = initApis
  let initData = initConfig.data || {}
  let initHeader = initConfig.header || {}
  let apiLock = new Lock()

  function fetchData (apiName: string, data: object = {}, header: object = {}) {
    let [url, method, domain] = apis[apiName]
    if (!url) throw Error(`${apiName} is undefined`)
    const dataSend = Object.assign(initData, data)
    const request: RequestInit = {
      body: qs.stringify(dataSend),
      method,
      mode: 'cors',
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, initHeader, header)
    }
    const channel = `${url}_${JSON.stringify(dataSend)}`
    // @ts-ignore
    if (request.headers['Content-Type'] === 'multipart/form-data') {
      let formData = new FormData()
      for (let key in dataSend) {
        formData.append(key, dataSend[key])
      }
      request.body = formData
    }

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
        setTimeout(apiLock.unlock.bind(apiLock), 500, channel)
      })
    })
    return apiLock.lock(channel, fn)
  }

  fetchData.addApi = (moreApis: Apis): void => {
    apis = Object.assign({}, apis, moreApis)
  }

  fetchData.updateInitConfig = (updatedConfig: Configs) => {
    initData = updatedConfig.data || {}
    initHeader = updatedConfig.header || {}
  }

  return fetchData
}

export {
  generateFetch
}
