import { it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'

import { Button } from '.'

describe('Button', () => {
  it('renders the button inner text correctly', () => {
    const { getByText } = render(<Button>Button Text</Button>)

    expect(getByText('Button Text')).toBeInTheDocument()
  })

  it('renders a Loading text when loading is true', () => {
    const { getByText } = render(<Button loading={true}>Button Text</Button>)

    expect(getByText('Loading...')).toBeInTheDocument()
  })

  it('renders a smile emoji when emoji is true', () => {
    const { getByText } = render(<Button emoji={true}>Button Text</Button>)

    expect(getByText('😁')).toBeInTheDocument()
  })

  it('calls onClick function when clicking on button', () => {
    const onClick = vi.fn()

    const { getByRole } = render(<Button onClick={onClick}>Button Text</Button>)

    const button = getByRole('button')
    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledOnce()
  })
})
