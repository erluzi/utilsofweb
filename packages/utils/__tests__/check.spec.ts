import {check} from '../src'

describe('utils/check', () => {
  it('should check the dom is node', () => {
    let dom = document.createElement('div')
    expect(check.isNode(dom)).toBe(true)
  })

  it('should check email works', () => {
    let emails = [
      'cn42du@163.com',
      'ifat3@sina.com.cn',
      'ifat3_-.@42du.cn',
    ]
    let notEmails = [
      'cn@163.com',
      'fat3@42du.online',
      '贰撸子@42du.cn',
    ]
    for (let email of emails) {
      expect(check.isEmail(email)).toBe(true)
    }
    for (let email of notEmails) {
      expect(check.isEmail(email)).toBe(false)
    }
  })
})
