### Register Creation

- [ ] The user is required to provide name, email, password and password confirmation to able to register
- [ ] The user name minimum length is 3
- [ ] The user password minimum length is 8
- [ ] The user password and password confirmation should be equal
- [ ] The user should not be able to register with an email that is already used
- [ ] The return of the operation should be an object with the following properties
  ```
    {
      success: boolean // tell us if the operation has succeed or not
      errors: { ['key': string ] } // an object that stores all the validation errors. For example, { name: 'blank' } tell us that the user did not provide a name
      data: { id: number } // the id of the created user
    }
  ```
