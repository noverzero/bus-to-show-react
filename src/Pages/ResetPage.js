import React, { useState } from 'react';
import { sha256 } from 'js-sha256';
import env from 'react-dotenv'
import MediaQuery from 'react-responsive';

const ResetPage = (props) => {
    const fetchUrl = `${process.env.REACT_APP_API_URL}`
    const token = props.match.params.token;
    const [resetResponse, setResetResponse] = useState(null);
    const [resendResponse, setResendResponse] = useState(null);
    const [values, setValues] = useState({
        password: '',
        confirmPassword: '',
        passwordError: '',
        confirmPasswordError: '',
    });
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        setValues({
        ...values,
        [event.target.name]: event.target.value
        });
    };

    const passwordValidator = (field) => {
        const stringToTest = field
        const longEnough = stringToTest && stringToTest.length >= 8;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
        const hasSpecialChar = specialChar.test(stringToTest);
        const hasCapitalLetter = /[A-Z]/.test(stringToTest);
        const hasLowerCaseLetter = /[a-z]/.test(stringToTest);
        const hasNumericalCharacter = /\d/.test(stringToTest);

        const isValid = longEnough && hasSpecialChar && hasCapitalLetter && hasLowerCaseLetter && hasNumericalCharacter;

        return isValid ? true : false;
    }

  const validate = () => {
    let passwordError = "";
    let confirmPasswordError = "";

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

    if ( passwordError || confirmPasswordError) {
      setValues({ ...values, passwordError, confirmPasswordError });
      return false;
    }
    return true;
  };

  const resetPassword = async (password) => {
    setLoading(true);
    setResendResponse(null);
    const body = {
        hshPwd: sha256(password),
        reset: true,
        resetToken: token
    }

    const userInfo = await fetch(`${fetchUrl}/users/reset-pass`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    const userObj = await userInfo.json()
    setLoading(false);
    setResetResponse(userObj)
};


  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      resetPassword(values.password)
      // clear form
      setValues({
        password: '',
        confirmPassword: '',
        passwordError: '',
        confirmPasswordError: '',
      });
    }
  };


    const resendEmail = async (email) => {
        setLoading(true);
        setResetResponse(null)
        const body = {
            username: email,
            reset: true,
        }

        const usersInfo = await fetch(`${fetchUrl}/users/send-reset`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        const userObj = await usersInfo.json()
        setLoading(false);
        setResendResponse(userObj);
    };

  if (loading){
    return(
        <div>
          <MediaQuery minWidth={800}>
          <div className="w-25 mx-auto">
            <div className="container-border-orange m-4 p-4">
                <div className='col-12 text-center'>
                <h3 className="bts-white-bg">Loading</h3>
                </div>
            </div>
        </div>
          </MediaQuery>
          <MediaQuery maxWidth={799}>
            <div className="container-border-orange m-4 p-4">
                <div className='col-12 text-center'>
                <h3 className="bts-white-bg">Loading</h3>
                </div>
            </div>
          </MediaQuery>
        </div>
        
    )
  }
  if (resendResponse){
    if(resendResponse.code === '200'){
        return (
            <div>
              <MediaQuery minWidth={800}>
              <div className="w-25 mx-auto">
                <div className="container-border-orange m-4 p-4">
                    <div className='col-12 text-center'>
                        <div>
                            <h3 className="bts-white-bg">Reset Email Sent.  Please check your email and follow the link.</h3>
                            <p>Message: {JSON.stringify(resendResponse.message)}</p>
                            <button className="btn bts-orange-bg mt-4" onClick={()=>{props.history.push('/')}}>Great!</button>
                        </div>
                    </div>
                </div>
            </div>
              </MediaQuery>
              <MediaQuery maxWidth={799}>
                <div className="container-border-orange m-4 p-4">
                    <div className='col-12 text-center'>
                        <div>
                            <h3 className="bts-white-bg">Reset Email Sent.  Please check your email and follow the link.</h3>
                            <p>Message: {JSON.stringify(resendResponse.message)}</p>
                            <button className="btn bts-orange-bg mt-4" onClick={()=>{props.history.push('/')}}>Great!</button>
                        </div>
                    </div>
                </div>
              </MediaQuery>
            </div>
            
        )
    } else if(resendResponse.code === '202'){
        return (
            <div>
              <MediaQuery minWidth={800}>
              <div className="w-25 mx-auto">
                <div className="container-border-orange m-4 p-4">
                    <div className='col-12 text-center'>
                        <h3 className="bts-white-bg">Hmmmmmmm....Maybe try again, or something?</h3>
                        <p>Message: {JSON.stringify(resendResponse.message)}</p>
                        <button className="btn bts-orange-bg mt-4" onClick={()=>{props.history.push('/')}}>Great!</button>
                    </div>
                </div>
            </div>
              </MediaQuery>
              <MediaQuery maxWidth={799}>
                <div className="container-border-orange m-4 p-4">
                    <div className='col-12 text-center'>
                        <h3 className="bts-white-bg">Hmmmmmmm....Maybe try again, or something?</h3>
                        <p>Message: {JSON.stringify(resendResponse.message)}</p>
                        <button className="btn bts-orange-bg mt-4" onClick={()=>{props.history.push('/')}}>Great!</button>
                    </div>
                </div>
              </MediaQuery>
            </div>
            
        )
    } 
} else if (resetResponse) {
    return(
        <div>
          <MediaQuery minWidth={800}>
          <div className="w-25 mx-auto">
            <div className="container-border-orange m-4 p-4">
                <div className='col-12 text-center'>

                    {resetResponse.code === '200'
                        ?
                            <div>
                                <h3 className="bts-white-bg">Your password has been reset. You may now log in!</h3>
                                <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=>{props.history.push('/')}}>Go to Dashboard</div>
                            </div>
                        : 
                            resetResponse.code ==='203'
                                ?
                                    <div>
                                    <h3 className="bts-white-bg">Verification failed. Please try again or click here to send another</h3>
                                        <p>Message: {JSON.stringify(resetResponse.message)}</p>
                                        <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=> {resendEmail(resetResponse.email)}} >Send another one!</div>
                                    </div> 
                                : 
                                    <div>
                                        <h3 className="bts-white-bg">Error Requesting Verification.  Please try again or click here to send another </h3>
                                        <div>
                                            <p>Message: {JSON.stringify(resetResponse.message)}</p>
                                        </div>
                                        <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=> {resendEmail(resetResponse.email)}}>Send another one!</div>
                                    </div>
                    }
                </div>
            </div>
        </div>
          </MediaQuery>
          <MediaQuery maxWidth={799}>
            <div className="container-border-orange m-4 p-4">
                <div className='col-12 text-center'>

                    {resetResponse.code === '200'
                        ?
                            <div>
                                <h3 className="bts-white-bg">Your password has been reset. You may now log in!</h3>
                                <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=>{props.history.push('/')}}>Go to Dashboard</div>
                            </div>
                        : 
                            resetResponse.code ==='203'
                                ?
                                    <div>
                                    <h3 className="bts-white-bg">Verification failed. Please try again or click here to send another</h3>
                                        <p>Message: {JSON.stringify(resetResponse.message)}</p>
                                        <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=> {resendEmail(resetResponse.email)}} >Send another one!</div>
                                    </div> 
                                : 
                                    <div>
                                        <h3 className="bts-white-bg">Error Requesting Verification.  Please try again or click here to send another </h3>
                                        <div>
                                            <p>Message: {JSON.stringify(resetResponse.message)}</p>
                                        </div>
                                        <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=> {resendEmail(resetResponse.email)}}>Send another one!</div>
                                    </div>
                    }
                </div>
            </div>
          </MediaQuery>
        </div>
        
    )

}  else {
    return (
    <div>
      <MediaQuery minWidth={800}>
      <div className="w-25 mx-auto">
    <div className="">
    <div className='col-12 text-center'>
            <div className="btn bts-orange-bg my-2 col-12" onClick={()=>{props.history.push('/')}}>Back to Dashboard</div>

            <div className="container-border-orange m-4 p-4">
            <h2 className="bts-white-bg">Change Password</h2>
            <form className="form-group" onSubmit={handleSubmit}>
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
    </div>
    </div>
      </MediaQuery>
      <MediaQuery maxWidth={799}>
    <div className='col-12 text-center'>
            <div className="btn bts-orange-bg my-2 col-12" onClick={()=>{props.history.push('/')}}>Back to Dashboard</div>

            <div className="container-border-orange m-4 p-4">
            <h2 className="bts-white-bg">Change Password</h2>
            <form className="form-group" onSubmit={handleSubmit}>
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

      </MediaQuery>
    </div>
    
  );
    }
};

export default ResetPage;
