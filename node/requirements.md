### Register Creation

- [x] The user is required to provide name, email, password and password confirmation to able to register
- [x] The user name minimum length is 3
- [x] The user password minimum length is 8
- [x] The user password and password confirmation should be equal
- [x] The user should not be able to register with an email that is already used
- [x] The return of the operation should be an object with the following properties
  ```
    {
      success: boolean // tell us if the operation has succeed or not
      errors: { ['key': string ] } // an object that stores all the validation errors. For example, { name: 'blank' } tell us that the user did not provide a name
      data: { id: number } // the id of the created user
    }
  ```
