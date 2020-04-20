import eventMixin from '../event'

describe('event/event', () => {
  it('should mixin event works, on', () => {
    class TestObj{}
    eventMixin(TestObj)
    let obj = new TestObj()
    const mockFn = jest.fn(x => x)
    obj.on('charge', mockFn)
    obj.trigger('charge', 666, 777)
    obj.trigger('charge', 777, 888)
    // The mock function is called twice
    expect(mockFn.mock.calls.length).toBe(2)
    // first call => first argument = 666
    expect(mockFn.mock.calls[0][0]).toBe(666)
    // second call => first argument = 777
    expect(mockFn.mock.calls[1][0]).toBe(777)
  })

  it('should mixin event works, once', () => {
    class TestObj{}
    eventMixin(TestObj)
    let obj = new TestObj()
    const mockFn = jest.fn(x => x)
    obj.once('charge', mockFn)
    obj.trigger('charge', 666)
    obj.trigger('charge', 777)
    // The mock function is called once
    expect(mockFn.mock.calls.length).toBe(1)
    expect(mockFn.mock.calls[0][0]).toBe(666)
  })

  it('should mixin event works, off', () => {
    class TestObj{}
    eventMixin(TestObj)
    let obj = new TestObj()
    const mockFn = jest.fn(x => x)
    obj.on('charge', mockFn)
    obj.off('charge', mockFn)
    obj.trigger('charge')
    expect(mockFn.mock.calls.length).toBe(0)
  })
})
