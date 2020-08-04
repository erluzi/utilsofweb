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

  it('should check mobile phone works', () => {
    let mobilePhones = [
      18800112233,
      19912341234,
      '13512345678',
    ]
    let notMobilePhones = [
      1880000000,
      12112345678,
      '12112345678',
    ]
    for (let mobilePhone of mobilePhones) {
      expect(check.isMobilePhone(mobilePhone)).toBe(true)
    }
    for (let mobilePhone of notMobilePhones) {
      expect(check.isMobilePhone(mobilePhone)).toBe(false)
    }
  })
})
