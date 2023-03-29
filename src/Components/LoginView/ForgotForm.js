import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import env from 'react-dotenv'
import MediaQuery from 'react-responsive'
import { useStore } from '../../Store';


const fetchUrl = `${process.env.REACT_APP_API_URL}`


const ForgotForm = (props) => {
    const {showForgotForm, toggleShowForgotForm} = useStore();


    const navigate = useNavigate()

    const [values, setValues] = useState({
        email: '',
        emailError: '',
    });

    const [forgotResponse, setForgotResponse] = useState(null);

    const requestPasswordReset = async (email) => {
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
        setForgotResponse(userObj)
    };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const validate = () => {
    let emailError = "";

    if (!values.email) {
      emailError = "Email cannot be empty";
    }

    if (emailError) {
      setValues({ ...values, emailError });
      return false;
    }

    return true;
  };
  const handleGreat = () =>{
    window.location.reload(false);

  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      requestPasswordReset(values.email)
      // clear form
      setValues({
        email: '',
        emailError: '',
      });
      
    }
  };

  if(forgotResponse){
    if(forgotResponse.code === '200')
        return (
            <div>
            <MediaQuery minWidth={800}>
            <div className="w-25 mx-auto">
                <div className="container-border-orange m-4 p-4">
                    <div className='col-12 text-center'>
                        <div>
                            <h3 className="bts-white-bg">Reset Email Sent.  Please check your email and follow the link.</h3>
                            <p>Message: {JSON.stringify(forgotResponse.message)}</p>
                            <button className="btn bts-orange-bg mt-4" onClick={()=>{handleGreat()}}>Great!</button>
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
                            <p>Message: {JSON.stringify(forgotResponse.message)}</p>
                            <button className="btn bts-orange-bg mt-4" onClick={()=>{handleGreat()}}>Great!</button>
                        </div>
                    </div>
                </div>
            </MediaQuery>
            </div>
        )
    if(forgotResponse.code === '202')
        return (
            <div>
                <MediaQuery minWidth={800}>
                <div className="w-25 mx-auto">
                <div className="container-border-orange m-4 p-4">
                    <div className='col-12 text-center'>
                        <h3 className="bts-white-bg">Hmmmmmmm....Maybe try again, or something?</h3>
                        <p>Message: {JSON.stringify(forgotResponse.message)}</p>
                        <button className="btn bts-orange-bg mt-4" onClick={()=>{handleGreat()}}>Great!</button>
                    </div>
                </div>
            </div>
                </MediaQuery>
                <MediaQuery maxWidth={799}>
                <div className="container-border-orange m-4 p-4">
                    <div className='col-12 text-center'>
                        <h3 className="bts-white-bg">Hmmmmmmm....Maybe try again, or something?</h3>
                        <p>Message: {JSON.stringify(forgotResponse.message)}</p>
                        <button className="btn bts-orange-bg mt-4" onClick={()=>{handleGreat()}}>Great!</button>
                    </div>
                </div>
                </MediaQuery>
            </div>
            
        )
  } else {
      return (
        <div>
            <MediaQuery minWidth={800}>
            <div className="w-25 mx-auto">
            <div className="container-border-orange m-4 p-4">
                <div className='col-12 text-center'>
                <h3 className="bts-white-bg">Send Password Reset Email</h3>
                    <form className="form-group" onSubmit={handleSubmit}>
                        <div className='pt-2'>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control my-2"
                                name="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <div style={{ color: 'red' }}>{values.emailError}</div>
                        </div>
                        <button className="btn bts-orange-bg mt-4" type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={() => {toggleShowForgotForm(false)}}>Back to Login</div>
        </div>
            </MediaQuery>
            <MediaQuery maxWidth={799}>
            <div className="container-border-orange m-4 p-4">
                <div className='col-12 text-center'>
                <h3 className="bts-white-bg">Send Password Reset Email</h3>
                    <form className="form-group" onSubmit={handleSubmit}>
                        <div className='pt-2'>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control my-2"
                                name="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <div style={{ color: 'red' }}>{values.emailError}</div>
                        </div>
                        <button className="btn bts-orange-bg mt-4" type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={() => {toggleShowForgotForm(false)}}>Back to Login</div>
            </MediaQuery>
        </div>
        
      );
  }
};

export default ForgotForm;
