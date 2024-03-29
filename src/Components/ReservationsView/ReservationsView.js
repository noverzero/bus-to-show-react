import React from 'react'
import '../../App.css';
import ShowReservation from './ShowReservation'

const ReservationsView = (props) => {

  return (
    <div className='row mt-3 mr-2'>
      <div className='col-12'>
      <div className="">
        <ul className="">
          {props.userReservations ?
            <div className="row">
              <div className="row">
                <ShowReservation
                  userReservations={props.userReservations}
                  displayFuture={props.displayFuture}
                  displayPast={props.displayPast}
                  getEventDetails={props.getEventDetails}
                  reservationEditField={props.reservationEditField}
                  submitReservationForm={props.submitReservationForm}
                  displayEditSuccess={props.displayEditSuccess}
                  toggleEditSuccess={props.toggleEditSuccess}
                  />
              </div>
            </div>
          : ''}
        </ul>
      </div>
    </div>
  </div>)
}

export default ReservationsView;
