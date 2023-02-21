import React from 'react'
import '../App.css';
import spacebus from '../Images/bus-to-show-space-bus-forward.png'
import MediaQuery from 'react-responsive'
import FacebookLogin from 'react-facebook-login';
import Zoom from 'react-reveal/Zoom'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-17782248-2');
ReactGA.pageview('/loading');


const SomethingIsComing = (props) => {
    let bus2 = true
    let bus3 = true


  return (
    <div className=''>
      {/* // Desktop View */}
      <MediaQuery minWidth={800}>
        <div className='something-image'>
        </div>
      </MediaQuery>
      {/* // End Desktop View */}
      {/* // Mobile View */}
      <MediaQuery maxWidth={799}>
        <div className='Loading something-image-mobile'>
          <div className="row">
            <div className="col-md-12 loading-header">
  
            </div>
          </div>
          <div className="row">
            <div className="col-4">
            </div>
              <div className='col-4'>
                <button type="button" className="btn-med btn-outline-light loading-btn bg-transparent my-4" onClick={props.onLoad}>Create Account
                </button>
              </div>
            <div className="col-4">
            </div>
          </div>

        </div>
      </MediaQuery>
      {/* // End Mobile View */}
    </div>
  )
}
export default SomethingIsComing;
