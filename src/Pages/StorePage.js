import React from 'react'
import MediaQuery from 'react-responsive'
import logo from '../Images/Logos/bustoshow-text-logo--white-outline-no-fill-328x46.png'
import { useNavigate } from 'react-router-dom';




const StorePage = (props) => {
  const navigate = useNavigate();



    return(
        <div>
            <div>
              {//Replace with Header Component 
              }
              <nav className='Header row bts-orange-header align-items-center nav-flex'>
                <div className="col-sm-2 ml-3 mt-1 mr-4">
                  <a className="navbar-brand">
                    <img src={logo} width="180" height="24" className="" alt="bts-logo" />
                  </a>
                </div>
                <div className="col-sm-2">
                  <button className="btn detail-btn mr-2" onClick={()=>{navigate('/')}}>
                    <div>
                      Dashboard
                    </div>
                  </button>
                </div>
              </nav>
              <MediaQuery minWidth={800}>
                <div className="w-75 mx-auto">
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
        </div>

    )
}

export default StorePage