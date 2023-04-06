## Button Component

- The button should receive a `loading` boolean prop and render `Loading...` if it's loading
- The button should receive an `emoji` boolean prop and render a smile emoji 😁 if `emoji` prop is `true`
- The button should be able to receive all the common props as a standard button HTML tag

## Form Component

- The form should have two input fields: name and email
- Both name and email fields are required
- An error message should show up if the user tries to submit the form without providing name or email (one message for each field)
- The side effect function should only be called if all validations pass

## UseCounter Hook

- The counter should start at 0
- It should be able to pass a different initial value for the count
- The hook should return an `increment` function that will increment the current value by 1
- The hook should return a `decrement` function that will decrement the current value by 1
- The hook should return the current count value
