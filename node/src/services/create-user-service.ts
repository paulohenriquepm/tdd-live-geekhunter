import { User } from '../entities/user'

type CreateUserServiceData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

type Errors = {
  [key: string]: string
}

type Validation = {
  fields: CreateUserServiceData
  errors: Errors
}

type EmailValidation = {
  email: string
  errors: Errors
  users: User[]
}

function validateBlankFields({ fields, errors }: Validation): void {
  const { name, email, password, password_confirmation } = fields

  if (!name) errors['name'] = 'blank'
  if (!email) errors['email'] = 'blank'
  if (!password) errors['password'] = 'blank'
  if (!password_confirmation) errors['password_confirmation'] = 'blank'
}
function validateMinimumLengthFields({ fields, errors }: Validation): void {
  const { name, password } = fields

  if (name && !errors.name && name.length < 3) errors['name'] = 'minimum_length'
  if (password && !errors.password && password.length < 8)
    errors['password'] = 'minimum_length'
}
function validatePasswordConfirmation({ fields, errors }: Validation): void {
  const { password, password_confirmation } = fields

  if (!errors.password && password !== password_confirmation) {
    errors['password'] = 'invalid_password_confirmation'
    errors['password_confirmation'] = 'invalid_password_confirmation'
  }
}
function validateIfEmailIsAlreadyInUse({
  email,
  errors,
  users,
}: EmailValidation): void {
  const userExists = users.find((user) => user.email === email)
  if (userExists) errors['email'] = 'already_in_use'
}

class CreateUserService {
  constructor(private users: User[]) {}

  perform(userData: CreateUserServiceData) {
    const errors = {} as Errors

    validateBlankFields({ fields: userData, errors })
    validateMinimumLengthFields({ fields: userData, errors })
    validatePasswordConfirmation({ fields: userData, errors })
    validateIfEmailIsAlreadyInUse({
      email: userData.email,
      errors,
      users: this.users,
    })

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
        data: null,
      }
    }

    const user = {
      id: this.users.length + 1,
      ...userData,
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
