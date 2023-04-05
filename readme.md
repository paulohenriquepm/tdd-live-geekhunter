# TDD Live - GeekHunter & ClickGUARD

This repository includes simple example projects that were built with the intention of demonstrating what TDD is and how it can be executed.

Both projects have two branches:

- The main branch has the project in its final state with only one commit and no history.
- The live branch also has the project in its final state, but with a history of commits where you can see the project being built step by step, following the TDD approach.

## Node Project

Typescript node project with jest. It has a Service responsible for creating a user with a few validations steps to prevent wrong/inconsistent data to be stored. Below are listed the Functional Requirements about this service.

- The user is required to provide name, email, password and password confirmation to able to register
- The user name minimum length is 3
- The user password minimum length is 8
- The user password and password confirmation should be equal
- The user should not be able to register with an email that is already used
- The return of the operation should be an object with the following properties
  ```
    {
      success: boolean // tell us if the operation has succeed or not
      errors: { ['key': string ] } // an object that stores all the validation errors. For example, { name: 'blank' } tell us that the user did not provide a name
      data: { id: number } // the id of the created user
    }
  ```

## React Project

Typescript vite project with vitest and react-testing-library. It has a components folder and a hooks folder.

### Components Folder

Here we have two React components, one simple and the other slight more complex.

#### Button Component

Simple React button component with two conditional renderings and one function as a parameter. These are the Functional Requirements:

- The button should receive a `loading` boolean prop and render `Loading...` if it's loading
- The button should receive an `emoji` boolean prop and render a smile emoji 😁 if `emoji` prop is `true`
- The button should be able to receive all the common props as a standard button HTML tag

#### Form Component

Form component with two input fields, validation rules and a side effect function. The form should fulfill the following Functional Requirements:

- The form should have two input fields: name and email
- Both name and email fields are required
- An error message should show up if the user tries to submit the form without providing name or email (one message for each field)
- The side effect function should only be called if all validations pass

### Hooks Folder

Here we have just a simple `useCounter` custom hook that provides an API to increment/decrement a count value. These are the Functional Requirements:

- The counter should start at 0
- It should be able to pass a different initial value for the count
- The hook should return an `increment` function that will increment the current value by 1
- The hook should return a `decrement` function that will decrement the current value by 1
- The hook should return the current count value
