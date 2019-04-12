import React from 'react'
import '../../App.css'
import Facebook from '../Facebook';
import MediaQuery from 'react-responsive'
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
    {!props.displayReservationDetail && props.displayUserReservationSummary
    ?
    <div className="alert alert-warning cart-item-font" role="alert">Note: This view only displays the reservations you made while you were logged in.  If you made reservations as a guest (not logged in), including all reservations made before 4/11/19 (when this feature was launched) do not display, they are still in our system under your name, but they are not linked to your account. Confirmation emails are sent to the email address you enter at time of checkout regardless of whether or not you are logged in.
    </div>
    : ''
    }
    <MediaQuery minWidth={800}>
      <div className="w-25 mx-auto">
        <div className='row p-2 mb-4'>
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
              {props.displayReservationDetail && props.displayEditReservation
              ?
                <div onClick={toggleReservationView} className="btn btn-block-admin detail-btn my-2 col-12" id="detail" >
                Back to Reservation Detail View
                </div>
              :
                <div>
                {props.displayReservationDetail && props.reservationDetail
                ?
                  <div onClick={toggleReservationView} className="btn btn-block-admin detail-btn my-2 col-12" id="summary" >
                  Back to Reservations Summary
                  </div>
                :
                  <div onClick={toggleReservationView} className="btn btn-block-admin detail-btn my-2 col-12" id="dashboard" >
                  Back to User Dashboard
                  </div>
                }
                </div>
              }

              {!props.displayReservationDetail && props.displayUserReservationSummary ?
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
                  reservationDetail={props.reservationDetail}
                  getEventDetails={props.getEventDetails}
                  toggleEditReservation={props.toggleEditReservation}
                  displayEditReservation={props.displayEditReservation}
                  reservationEditField={props.reservationEditField}
                  submitReservationForm={props.submitReservationForm}
                  reservationToEditId={props.reservationToEditId}
                  displayEditSuccess={props.displayEditSuccess}
                  toggleEditSuccess={props.toggleEditSuccess}
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
      </MediaQuery>
      <MediaQuery maxWidth={799}>
        <div className="mx-auto">
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
                {props.displayReservationDetail && props.displayEditReservation
                ?
                  <div onClick={toggleReservationView} className="btn btn-block-admin detail-btn my-2 col-12" id="detail" >
                  Back to Reservation Detail View
                  </div>
                :
                  <div>
                  {props.displayReservationDetail && props.reservationDetail
                  ?
                    <div onClick={toggleReservationView} className="btn btn-block-admin detail-btn my-2 col-12" id="summary" >
                    Back to Reservations Summary
                    </div>
                  :
                    <div onClick={toggleReservationView} className="btn btn-block-admin detail-btn my-2 col-12" id="dashboard" >
                    Back to User Dashboard
                    </div>
                  }
                  </div>
                }

                {!props.displayReservationDetail && props.displayUserReservationSummary ?
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
                    reservationDetail={props.reservationDetail}
                    getEventDetails={props.getEventDetails}
                    toggleEditReservation={props.toggleEditReservation}
                    displayEditReservation={props.displayEditReservation}
                    reservationEditField={props.reservationEditField}
                    submitReservationForm={props.submitReservationForm}
                    reservationToEditId={props.reservationToEditId}
                    displayEditSuccess={props.displayEditSuccess}
                    toggleEditSuccess={props.toggleEditSuccess}
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
        </MediaQuery>
    </div>
  )

}

export default LoginView
