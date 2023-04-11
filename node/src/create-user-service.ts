type CreateUserServiceData = {
  name: string
  email: string
  password: string
  password_confirmation: string
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
  perform({ name, password }: CreateUserServiceData) {
    const errors = {}

    validateLength({ name, password, errors })

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
        data: null,
      }
    }

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
}

export { CreateUserService }
