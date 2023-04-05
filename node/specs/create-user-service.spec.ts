import { CreateUserService } from '@src/services/create-user-service'
import { User } from '@src/entities/user'

let users = [] as User[]
let createUserService: CreateUserService

describe('CreateUserService', () => {
  beforeEach(() => {
    users = []

    createUserService = new CreateUserService(users)
  })

  describe('when all required fields are provided', () => {
    describe('but the name length is less than 3', () => {
      it('returns a minimum length error at name field', () => {
        const result = createUserService.perform({
          name: 'Jo',
          email: 'email@email.com',
          password: '12345678',
          password_confirmation: '12345678',
        })

        expect(result).toMatchObject({
          success: false,
          errors: {
            name: 'minimum_length',
          },
          data: null,
        })
      })

      it('does not creates a new user', () => {
        createUserService.perform({
          name: 'Jo',
          email: 'email@email.com',
          password: '12345678',
          password_confirmation: '12345678',
        })

        expect(users.length).toBe(0)
      })
    })

    describe('but the password length is less than 8', () => {
      it('returns a minimum length error at password field', () => {
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

      it('does not creates a new user', () => {
        createUserService.perform({
          name: 'John',
          email: 'email@email.com',
          password: '1234567',
          password_confirmation: '1234567',
        })

        expect(users.length).toBe(0)
      })
    })

    describe('but the password confirmation is wrong', () => {
      it('returns an invalid password confirmation error at both password and password confirmation fields', () => {
        const result = createUserService.perform({
          name: 'John',
          email: 'email@email.com',
          password: '12345678',
          password_confirmation: '12345687',
        })

        expect(result).toMatchObject({
          success: false,
          errors: {
            password: 'invalid_password_confirmation',
            password_confirmation: 'invalid_password_confirmation',
          },
          data: null,
        })
      })

      it('does not creates a new user', () => {
        createUserService.perform({
          name: 'John',
          email: 'email@email.com',
          password: '12345678',
          password_confirmation: '12345687',
        })

        expect(users.length).toBe(0)
      })
    })

    describe('but the email provided is already in use', () => {
      it('returns an already in use error at email field', () => {
        const emailAlreadyInUse = 'email_used@email.com'
        users.push({
          id: users.length + 1,
          name: 'John',
          email: emailAlreadyInUse,
          password: '12345678',
        })
        const result = createUserService.perform({
          name: 'John',
          email: emailAlreadyInUse,
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

      it('does not creates a new user', () => {
        const emailAlreadyInUse = 'email_used@email.com'
        users.push({
          id: users.length + 1,
          name: 'John',
          email: emailAlreadyInUse,
          password: '12345678',
        })
        createUserService.perform({
          name: 'John',
          email: emailAlreadyInUse,
          password: '12345678',
          password_confirmation: '12345678',
        })

        expect(users.length).toBe(1)
      })
    })

    describe('and all the fields are valid', () => {
      it('creates a new user', () => {
        users.push({
          id: users.length + 1,
          name: 'Other User',
          email: 'other_user@email.com',
          password: '12345678',
        })
        const result = createUserService.perform({
          name: 'John',
          email: 'john@email.com',
          password: '12345678',
          password_confirmation: '12345678',
        })

        expect(users.length).toBe(2)
        expect(result).toMatchObject({
          success: true,
          errors: null,
          data: { id: users[users.length - 1].id },
        })
      })
    })
  })

  describe('when missing required fields', () => {
    it('returns an array with all the missing fields', () => {
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

    it('does not creates a new user', () => {
      createUserService.perform({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      })

      expect(users.length).toBe(0)
    })
  })
})
