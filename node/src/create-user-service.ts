type CreateUserServiceData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

class CreateUserService {
  perform({ name, password }: CreateUserServiceData) {
    if (name && name.length < 3) {
      return {
        success: false,
        errors: {
          name: 'minimum_length',
        },
        data: null,
      }
    }
    if (password && password.length < 8) {
      return {
        success: false,
        errors: {
          password: 'minimum_length',
        },
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
