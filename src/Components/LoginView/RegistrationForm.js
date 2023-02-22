import React, { useState } from 'react';

const RegistrationForm = (props) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

    const passwordValidator = (field) => {
        const stringToTest = field
        const longEnough = stringToTest && stringToTest.length >= 7;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
        const hasSpecialChar = specialChar.test(stringToTest);
        const hasCapitalLetter = /[A-Z]/.test(stringToTest);
        const hasLowerCaseLetter = /[a-z]/.test(stringToTest);
        const hasNumericalCharacter = /\d/.test(stringToTest);

        const isValid = longEnough && hasSpecialChar && hasCapitalLetter && hasLowerCaseLetter && hasNumericalCharacter;

        return isValid ? true : false;
    }

  const validate = () => {
    let firstNameError = "";
    let lastNameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    if (!values.firstName) {
        firstNameError = "First name cannot be empty";
    }

    if (!values.lastName) {
        lastNameError = "Last name cannot be empty";
    }

    if (!values.email) {
      emailError = "Email cannot be empty";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      emailError = "Invalid email format";
    }

    if (!values.password) {
      passwordError = "Password cannot be empty";
    } else if (values.password.length < 8) {
      passwordError = "Password must be at least 8 characters";
    } else if (!passwordValidator(values.password)){
      passwordError = "Password must contain at least 1 of each of the following: Uppercase, Lowercase, Number, Special Character"  
    }

    if (!values.confirmPassword) {
      confirmPasswordError = "Confirm password cannot be empty";
    } else if (values.password !== values.confirmPassword) {
      confirmPasswordError = "Passwords do not match";
    }

    if (firstNameError || lastNameError || emailError || passwordError || confirmPasswordError) {
      setValues({ ...values, firstNameError, lastNameError, emailError, passwordError, confirmPasswordError });
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      props.requestRegistration(values)
      // clear form
      setValues({
        firstName: '',
        lastName:'',
        email: '',
        password: '',
        confirmPassword: '',
        nameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
      });
    }
  };

  return (
    <div className='col-12 text-center'>
            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={() => {props.toggleRegister()}}>Back to Login</div>

            <div className="container-border-orange m-4 p-4">
            <h2 className="bts-white-bg">Create New Account</h2>
            <form className="form-group" onSubmit={handleSubmit}>
            <div className='py-2'>
                <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="First"
                value={values.firstName}
                onChange={handleChange}
                />
                <small style={{ color: 'red' }}>{values.firstNameError}</small>
            </div>
            <div className='py-2'>
                <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Last"
                value={values.lastName}
                onChange={handleChange}
                />
                <small style={{ color: 'red' }}>{values.lastNameError}</small>
            </div>
            <div className='py-2'>
                <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                />
                <small style={{ color: 'red' }}>{values.emailError}</small>
            </div>
            <div className='py-2'>
                <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                />
                <small style={{ color: 'red' }}>{values.passwordError}</small>
            </div>
            <div className='py-2'>
                <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                />
                <small style={{ color: 'red' }}>{values.confirmPasswordError}</small>
            </div>
            <button className="btn bts-orange-bg mt-4" type="submit">Submit</button>
            </form>
        </div>
    </div>
  );
};

export default RegistrationForm;
