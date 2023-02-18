import React from 'react'
import '../../App.css'
import Facebook from '../Facebook';
import MediaQuery from 'react-responsive'
import ReservationsView from '../ReservationsView/ReservationsView'
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import RegisterUserToast from './RegisterUserToast';
import ForgotForm from './ForgotForm';

const LoginView = (props) => {

  const { userDashboard, toggleLoggedIn, toggleRegister, showRegisterForm, requestRegistration, registerResponse, showForgotForm, toggleForgot, userDetails, profileClick, responseLogin, facebook, displayReservations, toggleReservationView, addBorder, displayShow, filterString, showsExpandClick, continueAsGuest, userReservations, toggleAdminView } = props

  const { isStaff, isAdmin, isDriver } = facebook.userDetails

  let futureClass = 'border'
  let pastClass = 'border'
  if (props.displayFuture){
    futureClass = 'border border-success'
    pastClass = 'border bg-light'
  } else if (props.displayPast){
    pastClass = 'border border-success'
    futureClass = 'border bg-light'
  }

  if(showForgotForm){
    return (
      <ForgotForm
        toggleForgot={toggleForgot} 
      />
    )
  } else {

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
            {!facebook.isLoggedIn && !showRegisterForm? 
            <>
            <div className='row'>
              <div className='col-12 text-center'>
                <LoginForm 
                  userDashboard={userDashboard}
                  toggleLoggedIn={toggleLoggedIn}
                  userDetails={userDetails}
                  profileClick={profileClick}
                  responseLogin={responseLogin}
                  continueAsGuest={continueAsGuest}
                  facebook={facebook}
                />
              <div className='row'>
              <div className='col-12 text-center'>
                <h4 className="bts-white-bg mb-2">
                  - OR -
                </h4>

              </div>
              </div>
                <div className="row p-2">
                <div className='col-12 text-center'>
                  <button type="button" className="btn detail-btn mr-2"
                    onClick={()=> {props.toggleLoggedIn(false); props.profileClick()}}>
                    <strong>Continue as Guest</strong>
                  </button>
                  <button type="button" className="btn detail-btn ml-2"
                    onClick={()=> {toggleRegister()}}>
                    <strong>Register</strong>
                  </button>
                  <button type="button" className="btn bts-white-bg"
                    onClick={()=> {toggleForgot()}}>
                    <strong>Forgot / Reset </strong>
                  </button>
                </div>
              </div>
              </div>
            </div>
            </>
            : 
            showRegisterForm 
              ? 
              <div>
                <RegistrationForm
                  toggleRegister={toggleRegister}
                  requestRegistration={requestRegistration}
                  />
                {registerResponse.code && <RegisterUserToast response={registerResponse} />}
              </div>
              
              
              :
            <button
                onClick={props.logout}
                type="button"
                className="btn btn-outline-dark login-btn">
                Log Out
            </button>
            }
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
                  <strong>Back to Events</strong>
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
                      <strong>Back to Events</strong>
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


}

export default LoginView
