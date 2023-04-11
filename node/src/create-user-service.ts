type CreateUserServiceData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

class CreateUserService {
  perform({}: CreateUserServiceData) {
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
