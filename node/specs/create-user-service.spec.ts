import { CreateUserService, User } from '@src/create-user-service'

let users: User[] = []

describe('CreateUserService', () => {
  beforeEach(() => {
    users = []
  })

  describe('when all required fields are provided', () => {
    describe('but the name length is less than 3', () => {
      it('returns a minimum length error at name field', () => {
        const createUserService = new CreateUserService(users)

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
        const createUserService = new CreateUserService(users)

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

    describe('but the password is not equal to password confirmation', () => {
      it('returns password confirmation error at both password and password_confirmation fields', () => {
        const createUserService = new CreateUserService(users)

        const result = createUserService.perform({
          name: 'John',
          email: 'email@email.com',
          password: '123456789',
          password_confirmation: '123456798',
        })

        expect(result).toMatchObject({
          success: false,
          errors: {
            password: 'password_confirmation',
            password_confirmation: 'password_confirmation',
          },
          data: null,
        })
      })
    })

    describe('but the email provided is already in use', () => {
      it('returns an already in use error at email field', () => {
        const createUserService = new CreateUserService(users)

        const alreadyInUseEmail = 'already_in_use@email.com'
        users.push({
          id: users.length + 1,
          name: 'Other User',
          email: alreadyInUseEmail,
          password: '1234556767',
        })

        const result = createUserService.perform({
          name: 'John',
          email: alreadyInUseEmail,
          password: '12345678',
          password_confirmation: '12345678',
        })

        expect(result).toMatchObject({
          success: false,
          errors: {
            email: 'already_in_use',
          },
          data: null,
        })
      })
    })

    describe('and all the validation pass', () => {
      it('creates a new user', () => {
        const createUserService = new CreateUserService(users)

        const result = createUserService.perform({
          name: 'John',
          email: 'john@email.com',
          password: '12345678',
          password_confirmation: '12345678',
        })

        expect(users.length).toBe(1)
        expect(result).toMatchObject({
          success: true,
          errors: null,
          data: { id: users[users.length - 1].id },
        })
      })
    })
  })

  describe('when missing required fields', () => {
    it('returns an blank error on all missing required fields', () => {
      const createUserService = new CreateUserService(users)

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
