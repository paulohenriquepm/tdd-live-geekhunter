import { it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'

import { Form } from '.'
import { afterSubmit } from './utils'

vi.mock('./utils', () => {
  return {
    afterSubmit: vi.fn(),
  }
})

describe('Form', () => {
  it('renders the form with the initial state correctly', () => {
    const { getByRole } = render(<Form />)

    const nameInput = getByRole('textbox', {
      name: /name/i,
    })
    expect(nameInput).toHaveValue('')
    expect(nameInput).toHaveProperty('placeholder', 'Type your name')

    const emailInput = getByRole('textbox', {
      name: /email/i,
    })
    expect(emailInput).toHaveValue('')
    expect(emailInput).toHaveProperty('placeholder', 'Type your email')

    const submitButton = getByRole('button', {
      name: /submit/i,
    })
    expect(submitButton).toBeInTheDocument()
  })

  describe('when submitting the form without providing name and email', () => {
    it('renders an error message for each missing field ', () => {
      const { getByRole, getByText } = render(<Form />)

      const submitButton = getByRole('button', {
        name: /submit/i,
      })
      fireEvent.click(submitButton)

      const nameInputError = getByText(/name is required/i)
      expect(nameInputError).toBeInTheDocument()
      const emailInputError = getByText(/email is required/i)
      expect(emailInputError).toBeInTheDocument()
    })

    it('does not call the afterSubmit function', () => {
      const { getByRole } = render(<Form />)

      const submitButton = getByRole('button', {
        name: /submit/i,
      })
      fireEvent.click(submitButton)

      expect(afterSubmit).not.toHaveBeenCalled()
    })
  })

  describe('when submitting the form with all required fields', () => {
    it('calls the afterSubmit function', () => {
      const { getByRole } = render(<Form />)

      const nameInput = getByRole('textbox', {
        name: /name/i,
      })
      fireEvent.change(nameInput, { target: { value: 'John Doe' } })

      const emailInput = getByRole('textbox', {
        name: /email/i,
      })
      fireEvent.change(emailInput, { target: { value: 'johndoe@email.com' } })

      const submitButton = getByRole('button', {
        name: /submit/i,
      })
      fireEvent.click(submitButton)

      expect(afterSubmit).toHaveBeenCalledOnce()
    })
  })
})
