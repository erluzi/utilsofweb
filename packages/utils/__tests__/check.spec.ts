import {isNode} from '../check'

describe('utils/check', () => {
  it('should create a dom is node', () => {
    let dom = document.createElement('div')
    expect(isNode(dom)).toBe(true)
  })
})
