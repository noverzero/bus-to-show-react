import React, { useEffect, useState } from 'react';
import { sha256 } from 'js-sha256';
import env from 'react-dotenv';
import MediaQuery from 'react-responsive';

const fetchUrl = `${process.env.REACT_APP_API_URL}`

const VerifyPage = (props) => {
    const verifyEmailUrl = `${fetchUrl}/users/confirm-email`
    const token = props.match.params.token;
    const [verifiedResponse, setVerifiedResponse] = useState(null);
    const [email, setEmail] = useState('');
    const [resentResponse, setResentResponse] = useState(null);

    const resendVerificationEmail = async () => {
        const body = {
            email: email,
            password: 'none',
            resendEmail: true,
        }

        body.hshPwd = sha256(body.password)
        const usersInfo = await fetch(`${fetchUrl}/users`, {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                  'Content-Type': 'application/json'
              }
            })
            const userObj = await usersInfo.json()

            setResentResponse(userObj)
      };


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${verifyEmailUrl}/${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json();
            setVerifiedResponse(json);
            setEmail(json.email)

            return
        };
        fetchData();
    }, [token]);

    if (resentResponse) {
        return(
            <div>
              <MediaQuery minWidth={800}>
              <div className="w-25 mx-auto">
                <div className="container-border-orange m-4 p-4">
                    <div className='col-12 text-center'>

                        {resentResponse.code === '200'
                        ?
                            <div>
                                <h3 className="bts-white-bg">Message: {JSON.stringify(resentResponse.message)}</h3>
                                <button className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=>{props.history.push('/')}}>Go to Dashboard</button>
                            </div>
                        :   
                            <div>
                                Something bad happened. Please keep trying, or give up.
                                <h3 className="bts-white-bg">Message: {JSON.stringify(resentResponse.message)}</h3>
                                <button className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=>{props.history.push('/')}}>Go to Dashboard</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
              </MediaQuery>
              <MediaQuery maxWidth={799}>
                <div className="container-border-orange m-4 p-4">
                    <div className='col-12 text-center'>

                        {resentResponse.code === '200'
                        ?
                            <div>
                                <h3 className="bts-white-bg">Message: {JSON.stringify(resentResponse.message)}</h3>
                                <button className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=>{props.history.push('/')}}>Go to Dashboard</button>
                            </div>
                        :   
                            <div>
                                Something bad happened. Please keep trying, or give up.
                                <h3 className="bts-white-bg">Message: {JSON.stringify(resentResponse.message)}</h3>
                                <button className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=>{props.history.push('/')}}>Go to Dashboard</button>
                            </div>
                        }
                    </div>
                </div>
              </MediaQuery>
            </div>
            
        )

    }

    else if (verifiedResponse) {
        return(
            <div>
              <MediaQuery minWidth={800}>
              <div className="w-25 mx-auto">
                <div className="container-border-orange m-4 p-4">
                    <div className='col-12 text-center'>

                        {verifiedResponse.code === '200'
                            ?
                                <div>
                                    <h3 className="bts-white-bg">Your account has been verified. You may now log in!</h3>
                                    <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=>{props.history.push('/')}}>Go to Dashboard</div>
                                </div>
                            : 
                                verifiedResponse.code ==='203'
                                    ?
                                        <div>
                                        <h3 className="bts-white-bg">Verification failed. Please try again or click here to send another</h3>
                                            <p>Message: {JSON.stringify(verifiedResponse.message)}</p>
                                            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=> {resendVerificationEmail()}} >Send another one!</div>
                                        </div> 
                                    : 
                                        <div>
                                            <h3 className="bts-white-bg">Error Requesting Verification.  Please try again or click here to send another </h3>
                                            <div>
                                                <p>Message: {JSON.stringify(verifiedResponse.message)}</p>
                                            </div>
                                            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=> {resendVerificationEmail()}}>Send another one!</div>
                                        </div>
                        }
                    </div>
                </div>
            </div>
              </MediaQuery>
              <MediaQuery maxWidth={799}>
                <div className="container-border-orange m-4 p-4">
                    <div className='col-12 text-center'>

                        {verifiedResponse.code === '200'
                            ?
                                <div>
                                    <h3 className="bts-white-bg">Your account has been verified. You may now log in!</h3>
                                    <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=>{props.history.push('/')}}>Go to Dashboard</div>
                                </div>
                            : 
                                verifiedResponse.code ==='203'
                                    ?
                                        <div>
                                        <h3 className="bts-white-bg">Verification failed. Please try again or click here to send another</h3>
                                            <p>Message: {JSON.stringify(verifiedResponse.message)}</p>
                                            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=> {resendVerificationEmail()}} >Send another one!</div>
                                        </div> 
                                    : 
                                        <div>
                                            <h3 className="bts-white-bg">Error Requesting Verification.  Please try again or click here to send another </h3>
                                            <div>
                                                <p>Message: {JSON.stringify(verifiedResponse.message)}</p>
                                            </div>
                                            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={()=> {resendVerificationEmail()}}>Send another one!</div>
                                        </div>
                        }
                    </div>
                </div>
              </MediaQuery>
            </div>
            
        )

    } else {
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
}

export default VerifyPage