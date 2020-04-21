import {debounce} from '../src'

describe('logic/logic', () => {
  it('should debounce work right', () => {
    jest.useFakeTimers()
    const mockHandler = jest.fn(val => val)
    let fn = debounce(mockHandler, 50)
    fn(10)
    fn(11)
    expect(setTimeout).toHaveBeenCalledTimes(2)
    expect(mockHandler).not.toBeCalled()
    jest.runAllTimers()
    expect(mockHandler).toBeCalled()
    expect(mockHandler).toHaveBeenCalledTimes(1)
    // The return value of the first call to the function was 11
    expect(mockHandler.mock.results[0].value).toBe(11)
  })
})
