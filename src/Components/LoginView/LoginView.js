import React from 'react'
import '../../App.css'
import moment from 'moment'
// import MediaQuery from 'react-responsive'
import { GoogleLogin } from 'react-google-login'
import FacebookButton from '../Facebook';
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
        {!props.loggedIn ?
          <div className='col-12 text-center'>
            Continue as a Guest or Click below to Sign-In to (or create) your own account using Facebook:
          </div>
        : ""}
        </div>
        <div className='row'>
          <div className='col-12 text-center'>
            <FacebookButton
              userDashboard={props.userDashboard}
              toggleLoggedIn={props.toggleLoggedIn}
              userDetails={props.userDetails}
              loggedIn={props.loggedIn}
              profileClick={props.profileClick}/>
          </div>
        </div>
        <div className='row'>
        {props.loggedIn ?
          <div className='col-12 text-center'>
            {props.displayReservations ?
              <div>
                <div className="btn-lg border border-success" onClick={props.toggleReservationView}>
                 Back to User Dashboard
                </div>
                <ReservationsView />
              </div>
             :
             <div className="btn-lg border border-success" onClick={props.toggleReservationView}>
              My Upcoming Reservations
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
