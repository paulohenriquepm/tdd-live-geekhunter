class CreateUserService {
  perform() {
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
