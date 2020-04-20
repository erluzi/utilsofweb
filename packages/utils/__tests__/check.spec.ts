import {isNode} from '../check'

describe('utils/check', () => {
  it('should check the dom is node', () => {
    let dom = document.createElement('div')
    expect(isNode(dom)).toBe(true)
  })
})
