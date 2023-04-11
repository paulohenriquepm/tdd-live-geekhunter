import { CreateUserService } from '@src/create-user-service'

describe('CreateUserService', () => {
  describe('when missing required fields', () => {
    it('returns an blank error on all missing required fields', () => {
      const createUserService = new CreateUserService()

      const result = createUserService.perform({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      })

      expect(result).toMatchObject({
        success: false,
        errors: {
          name: 'blank',
          email: 'blank',
          password: 'blank',
          password_confirmation: 'blank',
        },
        data: null,
      })
    })
  })
})
