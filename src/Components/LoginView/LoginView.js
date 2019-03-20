import React from 'react'
import '../../App.css'
import Facebook from '../Facebook';
import ReservationsView from '../ReservationsView/ReservationsView'

const LoginView = (props) => {

const { userDashboard, toggleLoggedIn, userDetails, profileClick, responseFacebook, 
      facebook, displayReservations, toggleReservationView, addBorder, displayShow, 
      filterString, showsExpandClick, continueAsGuest, userReservations } = props

  return (
    <div className='container-fluid'>
      <div className='row p-2'>
        {!facebook.isLoggedIn ?
        <div className='col-12 text-center'>
          Continue as a Guest or Click below to Sign-In to (or create) your own account using Facebook:
        </div>
        : ""}
      </div>
      <div className='row'>
        <div className='col-12 text-center'>
          <Facebook
            userDashboard={userDashboard}
            toggleLoggedIn={toggleLoggedIn}
            userDetails={userDetails}
            profileClick={profileClick}
            responseFacebook={responseFacebook}
            continueAsGuest={continueAsGuest}
            facebook={facebook}
          />
        </div>
      </div>
      <div className='row'>
        {facebook.isLoggedIn ?
        <div className='col-12 text-center'>
          {displayReservations ?
          <div>
            <div className="btn-lg border border-success" onClick={toggleReservationView}>
            Back to User Dashboard
            </div>
              <ReservationsView
                userReservations={userReservations}
                addBorder={addBorder}
                displayShow={displayShow}
                filterString={filterString}
                showsExpandClick={showsExpandClick} 
              />
            </div>
            : '' }
            <div className="btn-lg border border-success" onClick={toggleReservationView}>
            My Upcoming Reservations
            </div>
            <div className="btn-lg border border-success" onClick={profileClick}>
            Fuel Savings Calculator
            </div>
            <div className="btn-lg border border-success" onClick={profileClick}>
            All Events
            </div>
            <div className="btn-lg border border-success" onClick={profileClick}>
            About Us
            </div>
          </div>
        :''
        }
        </div>
    </div>
  )

}

export default LoginView
