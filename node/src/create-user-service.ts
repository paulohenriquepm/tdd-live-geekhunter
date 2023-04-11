type CreateUserServiceData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

class CreateUserService {
  perform({ name }: CreateUserServiceData) {
    if (name && name.length < 3) {
      return {
        success: false,
        errors: {
          name: 'minimum_length',
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
