import { CreateUserService } from '@src/create-user-service'

describe('CreateUserService', () => {
  describe('when all required fields are provided', () => {
    describe('but the name length is less than 3', () => {
      it('returns a minimum length error at name field', () => {
        const createUserService = new CreateUserService()

        const result = createUserService.perform({
          name: 'Jo',
          email: 'email@email.com',
          password: '123456789',
          password_confirmation: '123456789',
        })

        expect(result).toMatchObject({
          success: false,
          errors: {
            name: 'minimum_length',
          },
          data: null,
        })
      })
    })

    describe('but the password length is less than 8', () => {
      it('returns a minimum length error at password field', () => {
        const createUserService = new CreateUserService()

        const result = createUserService.perform({
          name: 'John',
          email: 'email@email.com',
          password: '1234567',
          password_confirmation: '1234567',
        })

        expect(result).toMatchObject({
          success: false,
          errors: {
            password: 'minimum_length',
          },
          data: null,
        })
      })
    })
  })

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
