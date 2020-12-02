/**
 * 数字格式化
 * @param s
 */
function numberFormat(s: number | string): string {
  if (typeof s === 'string') s = parseFloat(s)
  let str = s.toFixed(2).toString()
  let newStr = ''
  let count = 0
  let i = str.indexOf('.') - 1

  for (; i >= 0; i--) {
    if (count % 3 === 0 && count !== 0) {
      newStr = str.charAt(i) + ',' + newStr
    } else {
      newStr = str.charAt(i) + newStr //逐个字符相接起来
    }
    count++
  }
  return newStr + (str + '00').substr((str + '00').indexOf('.'), 3)
}

/**
 * 日期时间格式化
 * @param date
 * @param fmt
 */
function dateFormat(date: Date, fmt = 'yyyy-MM-dd'): string {
  let o: {[index: string]: any} = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return fmt
}

/**
 * 检测ie版本
 * @param userAgent
 */
function detectIE(userAgent: string | undefined): number | boolean {
  let ua = userAgent || navigator.userAgent
  // IE 10 or older
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  let msie = ua.indexOf('MSIE ')
  if (msie > 0) {
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
  }

  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  let trident = ua.indexOf('Trident/')
  if (trident > 0) {
    let rv = ua.indexOf('rv:')
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
  }

  // Edge (IE 12+)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
  let edge = ua.indexOf('Edge/')
  if (edge > 0) {
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
  }

  // other browser
  return false
}

/**
 * 解析URL
 * @param url
 * @deprecated 使用 new URL(url) 代替
 */
// function parseURL(url: string): CustomUrl {
//   // if (typeof url !== 'string') throw Error('params url mast be type: string')
//   let a = document.createElement('a')
//   a.href = url
//   return {
//     source: url,
//     protocol: a.protocol.replace(':', ''),
//     host: a.hostname,
//     port: a.port,
//     query: a.search,
//     params: (() => {
//       let params: {[index: string]: string} = {}
//       let seg = a.search.replace(/^\?/, '').split('&'), len = seg.length, p
//       for (let i = 0; i < len; i++) {
//         if (seg[i]) {
//           p = seg[i].split('=')
//           params[p[0]] = p[1]
//         }
//       }
//       return params
//     })(),
//     hash: a.hash.replace('#', ''),
//     path: a.pathname.replace(/^([^\/])/, '/$1')
//   }
// }

export {
  numberFormat,
  dateFormat,
  detectIE,
}
