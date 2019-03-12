import React from 'react'
import '../App.css';
import logo from '../Images/Logos/bustoshow-text-logo--white-outline-no-fill-328x46.png'
// import mobileLogo from '../Images/Logos/bts-logo-orange.png'
// import MediaQuery from 'react-responsive'
// import { GoogleLogout } from 'react-google-login';

const Header = (props) => {
  // console.log('Header', props)
  // let logout = console.log('Success')


  return (
    <nav className={props.adminView ? 'Header row bts-admin-purple nav-flex' : 'Header row bts-orange-bg nav-flex'}>
      <div className="col-2 ml-3 mt-1 mr-4">
        <a className="navbar-brand ">
          <img src={logo} width="180" height="24" className="" alt="bts-logo" />
        </a>

      </div>

      <div className="mr-5 row inline-block" style={{ textAlign: 'center' }}>

        <button
            onClick={props.toggleAdminView}
            type="button"
            className="btn btn-outline-light login-btn">Admin</button>
      </div>
    </nav>

  )
}

export default Header;

        {/* {props.googleResponse ?
          <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={props.logout}
          >
          </GoogleLogout> :
          // <div>
          //   <p>Hello, {props.googleResponse.givenName}</p>

          //   <button
          //     onClick={props.logout}
          //     type="button"
          //     className="btn btn-outline-light login-btn">Log Out</button>
          // </div> : ''
          <button
            onClick={props.loginClick}
            type="button"
            className="btn btn-outline-light login-btn">Login</button>
        } */}