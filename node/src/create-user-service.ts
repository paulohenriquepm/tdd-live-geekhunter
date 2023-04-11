type CreateUserServiceData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type User = {
  id: number
  name: string
  email: string
  password: string
}

type Error = {
  [key: string]: string
}

type ValidateLengthType = {
  name: string
  password: string
  errors: Error
}
const validateLength = ({ name, password, errors }: ValidateLengthType) => {
  if (name && name.length < 3) {
    errors.name = 'minimum_length'
  }
  if (password && password.length < 8) {
    errors.password = 'minimum_length'
  }
}

class CreateUserService {
  constructor(private users: User[]) {}

  perform({
    name,
    email,
    password,
    password_confirmation,
  }: CreateUserServiceData) {
    const errors = {}

    validateLength({ name, password, errors })

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
        data: null,
      }
    }

    if (
      password &&
      password_confirmation &&
      password !== password_confirmation
    ) {
      return {
        success: false,
        errors: {
          password: 'password_confirmation',
          password_confirmation: 'password_confirmation',
        },
        data: null,
      }
    }

    if (email) {
      const userExists = this.users.find((user) => user.email === email)

      if (userExists) {
        return {
          success: false,
          errors: {
            email: 'already_in_use',
          },
          data: null,
        }
      }
    }

    if (!name && !email && !password && !password_confirmation) {
      return {
        success: false,
        errors: {
          name: 'blank',
          email: 'blank',
          password: 'blank',
          password_confirmation: 'blank',
        },
        data: null,
      }
    }

    const user = {
      id: this.users.length + 1,
      name,
      email,
      password,
    }
    this.users.push(user)

    return {
      success: true,
      errors: null,
      data: { id: user.id },
    }
  }
}

export { CreateUserService }
