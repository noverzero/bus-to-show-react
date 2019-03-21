import React from 'react'
import '../../App.css'
import Facebook from '../Facebook';
import ReservationsView from '../ReservationsView/ReservationsView'

const LoginView = (props) => {

  const { userDashboard, toggleLoggedIn, userDetails, profileClick, responseFacebook, 
        facebook, displayReservations, toggleReservationView, addBorder, displayShow, 
        filterString, showsExpandClick, continueAsGuest, userReservations, toggleAdminView } = props

  const { isStaff, isAdmin, isDriver } = facebook.userDetails
      
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
            {isStaff || isAdmin || isDriver ? 
            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={toggleAdminView}>
            <strong>Employees</strong>
            </div> : ''}
            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={toggleReservationView}>
            <strong>My Upcoming Reservations</strong>
            </div>
            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={profileClick}>
            <strong>Fuel Savings Calculator</strong>
            </div>
            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={profileClick}>
            <strong>All Events</strong>
            </div>
            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={profileClick}>
            <strong>About Us</strong>
            </div>
          </div>
        : ''
        }
        </div>
    </div>
  )

}

export default LoginView
