import React, { useState } from 'react';

const LoginForm = (props) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!values.email) {
      emailError = "Email cannot be empty";
    }

    if (!values.password) {
      passwordError = "Password cannot be empty";
    }

    if (emailError || passwordError) {
      setValues({ ...values, emailError, passwordError });
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      console.log(values);
      // clear form
      setValues({
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
      });
      props.responseLogin(values)
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        <div style={{ color: 'red' }}>{values.emailError}</div>
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        <div style={{ color: 'red' }}>{values.passwordError}</div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
