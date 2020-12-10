import {getPolling} from '../src'

describe('logic/logic getPolling', () => {
  it('should polling works right', async () => {
    let pollingTimes = 0
    let polling = getPolling()
    const mockFn = jest.fn(() => ++pollingTimes)

    let timer = setInterval(() => {
      if (pollingTimes > 5) {
        polling.stop(0)
        clearInterval(timer)
      }
    }, 100)

    await polling.polling(100, 400, mockFn)
    expect(pollingTimes).toBe(4)
    expect(polling.times).toBe(4)

    try {
      await polling.polling(500, 2000, mockFn)
    } catch (e) {
      expect(e.message).toMatch('timer cleared by other process')
    }
  })
})
