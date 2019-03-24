import React from 'react'
import '../../App.css'
import Facebook from '../Facebook';
import ReservationsView from '../ReservationsView/ReservationsView'

const LoginView = (props) => {

  const { userDashboard, toggleLoggedIn, userDetails, profileClick, responseFacebook,
        facebook, displayReservations, toggleReservationView, addBorder, displayShow,
        filterString, showsExpandClick, continueAsGuest, userReservations, toggleAdminView } = props

  const { isStaff, isAdmin, isDriver } = facebook.userDetails

  let futureClass = 'border'
  let pastClass = 'border'
  if (props.displayFuture){
    console.log('futureshock')
    futureClass = 'border border-success'
    pastClass = 'border bg-light'
  } else if (props.displayPast){
    console.log('pastshock')
    pastClass = 'border border-success'
    futureClass = 'border bg-light'
  }

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
            {props.displayReservationDetail && props.reservationDetailId ?
            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={toggleReservationView}>
            Back to Reservations Summary
            </div>
            :
            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={toggleReservationView}>
            Back to User Dashboard
            </div>
            }
            {!props.displayReservationDetail ?
            <div className="row">
              <div className="col-12">
              <div className="row" id="futurePast" onClick={props.toggleFuturePast}>
                  <div className="col-2">
                  </div>
                  <div className="col-4">
                    <div className={futureClass} id="future">
                        Future
                    </div>
                  </div>
                  <div className="col-4">
                    <div className={pastClass} id="past">
                        Past
                    </div>
                  </div>
                  <div className="col-2">
                  </div>
                </div>
              </div>
            </div>
            :''
            }
              <ReservationsView
                displayFuture={props.displayFuture}
                displayPast={props.displayPast}
                userReservations={userReservations}
                addBorder={addBorder}
                displayShow={displayShow}
                filterString={filterString}
                showsExpandClick={showsExpandClick}
                expandReservationDetailsClick={props.expandReservationDetailsClick}
                reservationDetailId={props.reservationDetailId}
              />
            </div>
            : '' }
            {displayReservations ? ''
            :
            <div>
            {(isStaff || isAdmin || isDriver) ?
            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={toggleAdminView}>
              <strong>Employees</strong>
            </div> : ''}
            <div className="btn btn-block-admin detail-btn my-2 col-12" onClick={toggleReservationView}>
              <strong>My Reservations</strong>
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

        }
        </div>
        : ''
        }
        </div>
    </div>
  )

}

export default LoginView
