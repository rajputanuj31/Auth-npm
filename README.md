# OneClickAuth - React Authentication Component

**OneClickAuth** is a customizable and easy-to-integrate Sign In and Sign Up React component package for seamless user authentication. This package allows you to easily implement authentication flows into your React app, with OAuth support for third-party providers.

## Features

- Customizable Sign In and Sign Up components
- OAuth integration support for third-party logins
- Highly customizable styles for inputs, buttons, and other UI elements
- Built with responsive design principles
- Error handling and success messages for authentication actions

## Installation

To install **OneClickAuth** into your React project, run the following command:

```bash
npm install oneclickauth
```
## Basic Setup
- To get started, import the **SignUp** and **SignIn** components from OneClickAuth into your React project:
```bash
import { SignUp, SignIn } from 'oneclickauth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```


### SignUp Component Props

| Prop Name        | Type       | Description                                               | Default                                                            |
|------------------|------------|-----------------------------------------------------------|--------------------------------------------------------------------|
| `onSubmit`       | `function` | Function to handle form submission.                       | `undefined`                                                        |
| `buttonText`     | `string`   | Text to display on the submit button.                     | `"Sign Up"`                                                        |
| `OAuthComponent` | `Component`| Custom OAuth component for third-party login support.      | `undefined`                                                        |
| `placeholders`   | `Object`   | Placeholder text for username, email, password inputs.     | `{ username: "Your username", email: "Your email", password: "Your password" }` |
| `theme`          | `string`   | Theme of the component, either `"light"` or `"dark"`.      | `"light"`                                                          |
| `containerStyle` | `Object`   | Custom style object for the container.                    | `{}`                                                               |
| `headerStyle`    | `Object`   | Custom style object for the header.                       | `{}`                                                               |
| `inputStyle`     | `Object`   | Custom style object for input fields.                     | `{}`                                                               |
| `buttonStyle`    | `Object`   | Custom style object for the submit button.                | `{}`                                                               |
| `footerStyle`    | `Object`   | Custom style object for the footer.                       | `{}`                                                               |
| `errorStyle`     | `Object`   | Custom style object for error messages.                   | `{}`                                                               |

### SignIn Component Props

| Prop Name        | Type       | Description                                               | Default                                                            |
|------------------|------------|-----------------------------------------------------------|--------------------------------------------------------------------|
| `onSubmit`       | `function` | Function to handle form submission.                       | `undefined`                                                        |
| `buttonText`     | `string`   | Text to display on the submit button.                     | `"Sign In"`                                                        |
| `OAuthComponent` | `Component`| Custom OAuth component for third-party login support.      | `undefined`                                                        |
| `placeholders`   | `Object`   | Placeholder text for email, password inputs.               | `{ email: "Enter your email", password: "Enter your password" }`   |
| `theme`          | `string`   | Theme of the component, either `"light"` or `"dark"`.      | `"light"`                                                          |
| `containerStyle` | `Object`   | Custom style object for the container.                    | `{}`                                                               |
| `headerStyle`    | `Object`   | Custom style object for the header.                       | `{}`                                                               |
| `inputStyle`     | `Object`   | Custom style object for input fields.                     | `{}`                                                               |
| `buttonStyle`    | `Object`   | Custom style object for the submit button.                | `{}`                                                               |
| `footerStyle`    | `Object`   | Custom style object for the footer.                       | `{}`                                                               |
| `errorStyle`     | `Object`   | Custom style object for error messages.                   | `{}`                                                               |


# Handling Form Data Submission

## Add a onSubmit functiomn
```
// Simple onSubmit function
const handleFormSubmit = (formData) => {
  console.log("Form submitted:", formData);
  return { success: true, message: "Form submitted successfully!" };
};
```

```bash
// Usage in SignUp component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={
        <SignUp 
          onSubmit={handleFormSubmit} 
        />} />
        <Route path="/sign-in" element={<SignIn/>} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Add an onSubmit Function to Access Backend and Redirect After Successful SignUp/SignIn.
```bash
import { useNavigate } from "react-router-dom";

// create a function named SignInWrapper
const SignInWrapper = () => {
  const navigate = useNavigate();

  // Handles form submision data
  const handleSignIn = async (formData) => {
    try {
      // add your backend endpoints
      const response = await fetch("Your_Endpoints", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        return { success: false, message: data.message || "An error occurred" };
      }
      // after successful signin redirect to '/' you can add your desired path
      navigate('/');
      return { success: true };
    } catch (error) {
      return { success: false, message: "Network error" };
    }
  };

  return (
    <SignIn
      onSubmit={handleSignIn}
      placeholders={{
        email: "Enter your email",
        password: "Enter your password",
      }}
      buttonText="Sign In"
      className="custom-signin"
      OAuthComponent={OAuth}
    />
  );
};
```

```bash
// pass SignInWrapper as prop
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={ <SignInWrapper/> } />
      </Routes>
    </BrowserRouter>
  );
}
```
- You can also create a wrapper for SignUp in a similar way.

# Customizing Styles
- You can customize styles for various elements in the components. Here’s how you can pass custom styles for the SignUp and SignIn components:
```bash
<SignUp
  containerStyle={{ backgroundColor: '#f0f0f0' }}
  headerStyle={{ color: '#333' }}
  inputStyle={{ color: '#000' }}
  buttonStyle={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}
  footerStyle={{ color: '#000' }}
  errorStyle={{ color: 'red' }}
/>
```

## CSS Class Names
- You can also create a CSS file and use these class names to add custom styles.

- The `SignIn` component uses the following CSS class names:

| **Class Name**           | **Description**                              |
|--------------------------|----------------------------------------------|
| `signin-container`       | The container for the entire sign-in component. |
| `signin-header`          | The header element within the sign-in form.   |
| `signin-form`            | The form element for sign-in inputs and button. |
| `signin-input`           | The input fields for email and password.      |
| `signin-button`          | The button used to submit the form.           |
| `signin-footer`          | The footer section of the sign-in component.  |
| `signin-footer-text`     | The text within the footer.                  |
| `signup-signin-link`     | The link to navigate to the sign-up page.    |
| `signin-error`           | The error message display area.              |
| `signin-success`         | The success message display area.            |

Make sure to define these classes in your CSS file (`Custom.css`) to style the `SignIn` component appropriately.

```bash
<SignIn
  onSubmit={handleSignIn}
  classname="SignIn"
/>
```

### How to add CSS?
```bash
.SignIn(Classname you provide as a prop) .signin-container(choose component you want){
  //add CSS here
}
```
- To use SignUp, change signin-container to signup-container and adjust other class names accordingly.

# OAuth Component Integration
- To integrate OAuth (e.g., Google, Facebook logins), pass your custom OAuth component like this:
```bash
<SignIn
  onSubmit={handleSignIn}
  OAuthComponent={OAuth}
  placeholders={{
    email: "Enter your email",
    password: "Enter your password",
  }}
  buttonText="Sign In"
/>

```
- The OAuth component should return a button element for initiating third-party authentication.

