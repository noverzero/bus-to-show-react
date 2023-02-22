import React, { useState } from 'react';

const RegisterUserToast = ({ response }) => {
  const [show, setShow] = useState(true);
  const reload = () => {
    setShow(false)
    window.location.reload(false)

  }


  let message = "";
  let button = null;
  let responseClass = ""
  
  switch (response.code) {
    case "200":
      message = "User registered successfully!  Please follow the link in the verification email we just sent to that account you mentioned";
      button = <button className="btn bts-orange-bg" variant="success" size="sm" onClick={()=>reload()}>Ok, I will!</button>;
      responseClass = "alert alert-success"

      break;
    case "error":
      message = "An error occurred while registering user.";
      button = <button className="btn bts-orange-bg" variant="danger" size="sm" onClick={() => setShow(false)}>Close</button>;
      responseClass = "alert alert-danger"

      break;
    case "202":
      message = "User with this email already exists. If you would like to continue using this address, you can complete the password reset process";
      button = <button className="btn bts-orange-bg" variant="warning" size="sm" onClick={() => setShow(false)}>OK</button>;
      responseClass = "alert alert-warning"

      break;
    default:
      message = "Unknown response from server.";
      button = <button className="btn bts-orange-bg" variant="secondary" size="sm" onClick={() => setShow(false)}>Close</button>;
      responseClass = "alert alert-danger"
  }

  return (
    <div className='row'>
    {show===true && <div className="col-12 text-center" onClose={() => setShow(false)} delay={3000}>
      <div className="row p-2">
        <h4 className="col-12 text-center bts-orange">Registration Status</h4>
      </div>
      <div className={responseClass} role="alert">{message}</div>
      {button && <div className="">{button}</div>}
    </div>}
    </div>
  );
}

export default RegisterUserToast;
