import {Lock} from '../src'

describe('utils/Lock', () => {
  it('should Lock works', async () => {
    const api = '/api/save'
    const apiLock = new Lock()
    const mockFn = jest.fn(api => Promise.resolve(api))

    let data = await apiLock.lock(api, mockFn.bind(null, api))
    expect(data).toBe(api)

    apiLock.lock(api, mockFn.bind(null, api))
      .catch((e: Error) => {
        expect(e.message).toMatch('resource was been locked')
      })

    apiLock.unlock(api)
    data = await apiLock.lock(api, mockFn.bind(null, api))
    expect(data).toBe(api)
  })
})
