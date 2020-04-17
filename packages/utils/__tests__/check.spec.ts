import {isNode} from '../check'
import {formatNumber} from '../utils'

describe('utils/check', () => {
  it('should create a dom is node', () => {
    let dom = document.createElement('div')
    expect(isNode(dom)).toBe(true)
  })

  it('should right format a number to string', () => {
    expect(formatNumber(132134.2)).toBe('132,134.20')
    expect(formatNumber(132134)).toBe('132,134.00')
    expect(formatNumber('132134.236')).toBe('132,134.24')
  })
})
