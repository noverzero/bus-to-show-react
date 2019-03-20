import React from 'react'
import '../../App.css'
import Facebook from '../Facebook';
import ReservationsView from '../ReservationsView/ReservationsView'

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
        :''
        }
        </div>
    </div>
  )

}

export default LoginView
