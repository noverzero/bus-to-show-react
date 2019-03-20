import React from 'react'
import '../../App.css'
import moment from 'moment'
// import MediaQuery from 'react-responsive'
import { GoogleLogin } from 'react-google-login'
import Facebook from '../Facebook';
import SpotifyLogin from 'react-spotify-login'
import ReservationsView from '../ReservationsView/ReservationsView'
//const { spotifyClientId, redirectUri, googleClientId } from './settings'
const dotenv = require('dotenv').config()
const spotifyClientId = process.env.spotifyClientId
const redirectUri = process.env.redirectUri
const googleClientId = process.env.googleClientId


const LoginView = (props) => {



  return (
    <div className='container-fluid'>
      <div className='row p-2'>
        {!props.facebook.isLoggedIn ?
        <div className='col-12 text-center'>
          Continue as a Guest or Click below to Sign-In to (or create) your own account using Facebook:
        </div>
        : ""}
      </div>
      <div className='row'>
        <div className='col-12 text-center'>
          <Facebook
            userDashboard={props.userDashboard}
            toggleLoggedIn={props.toggleLoggedIn}
            userDetails={props.userDetails}
            profileClick={props.profileClick}
            responseFacebook={props.responseFacebook}
            continueAsGuest={props.continueAsGuest}
            facebook={props.facebook}
          />
        </div>
      </div>
      <div className='row'>
        {props.facebook.isLoggedIn ?
        <div className='col-12 text-center'>
          {props.displayReservations ?
          <div>
            <div className="btn-lg border border-success" onClick={props.toggleReservationView}>
            Back to User Dashboard
            </div>
              <ReservationsView
                userReservations={props.userReservations}
                addBorder={props.addBorder}
                displayShow={props.displayShow}
                filterString={props.filterString}
                showsExpandClick={props.showsExpandClick} 
              />
            </div>
            :
              <div>
              {props.facebook.userDetails.isStaff || props.facebook.userDetails.isAdmin ?
                <div className="btn-lg border border-success" onClick={props.profileClick}>
                  Check In Riders
                </div>
              : ''
              }
              {props.facebook.userDetails.isDriver || props.facebook.userDetails.isAdmin ?
                <div className="btn-lg border border-success" onClick={props.profileClick}>
                  View Driver Shifts
                </div>
              : ''
              }
              {props.facebook.userDetails.isAdmin ?
              <div className="btn-lg border border-success" onClick={props.profileClick}>
                Admin Panel
              </div>
            : '' }
              <div className="btn-lg border border-success" onClick={props.toggleReservationView}>
              My Upcoming Reservations
              </div>
              <div className="btn-lg border border-success" onClick={props.profileClick}>
              Fuel Savings Calculator
              </div>
              <div className="btn-lg border border-success" onClick={props.profileClick}>
              All Events
              </div>
              <div className="btn-lg border border-success" onClick={props.profileClick}>
              About Us
              </div>
            </div>
            }
          </div>
        :''
        }
        </div>
    </div>
  )

}

export default LoginView

