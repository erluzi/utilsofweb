import {hex2rgb} from '../src'

describe('logic test', () => {
  it('should hex2rgb works right', () => {
    let hex = '#E01A1A'.toLowerCase()
    expect(hex2rgb(hex)).toBe(`rgb(224, 26, 26)`)
  })
})
