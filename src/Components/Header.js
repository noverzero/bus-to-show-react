import React, { useRef, useState , useEffect} from 'react';
import MediaQuery from 'react-responsive'


import '../App.css';
import logo from '../Images/Logos/bustoshow-text-logo--white-outline-no-fill-328x46.png'

const Header = (props) => {
  const [showDashboardButton, toggleShowDashboardButton] = useState(true);
  const myRef = useRef(null);

  useEffect(() => {
    window.$(myRef.current).tooltip();
    if(!props.facebook.isLoggedIn) toggleShowDashboardButton(false)
  }, []);

  return (
    <nav className={props.adminView ? 'Header row bts-admin-purple nav-flex' : 'Header row bts-orange-header align-items-center nav-flex'}>
      <div className="col-sm-2 ml-3 mt-1 mr-4">
        <a className="navbar-brand">
          <img src={logo} width="180" height="24" className="" alt="bts-logo" />
        </a>
      </div>
      <div className="col-sm-2">
        <div
          onClick={props.profileClick}
          className={props.adminView ? "border-0 bts-admin-purple p-2 mr-2" : "border-0 bts-orange-bg p-2 mr-2"}>
          <div>
              <button className="btn detail-btn mr-2" onClick={()=>{toggleShowDashboardButton(!showDashboardButton)}}>
                { !showDashboardButton 
                ?
                  !props.facebook.isLoggedIn 
                  ?
                    <div ref={myRef} data-toggle="tooltip" data-placement="bottom" title="Sign in to view your reservations, history and more.">
                      Sign in/up
                    </div>
                  :
                    <div>
                      <i className="fas fa-user-check fa-lg"></i>
                    </div>
                :
                <div>
                  Dashboard
                </div>
                }
              </button>
          </div>
    </div>
  </div>
  </nav>

  )
}

export default Header;
