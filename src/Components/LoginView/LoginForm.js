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
    <div className="container-border-orange m-4 p-4">
        <h2 className="bts-white-bg">Sign-In</h2>

        <form className="form-group" onSubmit={handleSubmit}>
            <div className='py-2'>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                />
                <div style={{ color: 'red' }}>{values.emailError}</div>
            </div>
            <div className='py-2'>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                />
                <div style={{ color: 'red' }}>{values.passwordError}</div>
            </div>
            <button className="btn bts-orange-bg" type="submit">Submit</button>
        </form>
    </div>
  );
};

export default LoginForm;
