import {check} from '../src'

describe('utils/check', () => {
  it('should check the dom is node', () => {
    let dom = document.createElement('div')
    expect(check.isNode(dom)).toBe(true)
  })
})
