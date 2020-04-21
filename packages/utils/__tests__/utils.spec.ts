import {formatNumber} from '../src'

describe('utils/utils', () => {
  it('should format number works', () => {
    expect(formatNumber(132134.2)).toBe('132,134.20')
    expect(formatNumber(132134)).toBe('132,134.00')
    expect(formatNumber('132134.236')).toBe('132,134.24')
  })
})
