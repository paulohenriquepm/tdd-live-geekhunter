import { FormEvent, useState } from 'react'
import { afterSubmit } from './utils'

const Form = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name) setNameError('Name is required')
    if (!email) setEmailError('Email is required')

    if (!name || !email) return

    afterSubmit()
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        aria-label="name"
        placeholder="Type your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {nameError !== '' ? <span>{nameError}</span> : null}

      <input
        type="text"
        name="email"
        aria-label="email"
        placeholder="Type your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError !== '' ? <span>{emailError}</span> : null}

      <button type="submit">SUBMIT</button>
    </form>
  )
}

export { Form }
