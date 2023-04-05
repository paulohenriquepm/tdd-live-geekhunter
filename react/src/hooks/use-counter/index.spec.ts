import { renderHook, act } from '@testing-library/react'

import { useCounter } from '.'

describe('useCounter', () => {
  it('returns the initial value as 0 if not provided', () => {
    const { result } = renderHook(() => useCounter())

    expect(result.current.count).toBe(0)
  })

  it('returns the correct initial value provided', () => {
    const { result } = renderHook(() => useCounter(5))

    expect(result.current.count).toBe(5)
  })

  it('increments the current count value', () => {
    const { result } = renderHook(() => useCounter(5))

    act(() => {
      result.current.increment()
      result.current.increment()
    })

    expect(result.current.count).toBe(7)
  })

  it('decrements the current count value', () => {
    const { result } = renderHook(() => useCounter(5))

    act(() => {
      result.current.decrement()
      result.current.decrement()
    })

    expect(result.current.count).toBe(3)
  })
})
