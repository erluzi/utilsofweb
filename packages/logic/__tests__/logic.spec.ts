import {debounce} from '../logic'

describe('logic/logic', () => {
  it('should debounce work right', () => {
    jest.useFakeTimers()
    const mockHandler = jest.fn(val => val)
    let fn = debounce(mockHandler, 50)
    fn(10)
    fn(100)
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
