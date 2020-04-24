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

export {
  numberFormat,
  dateFormat
}
