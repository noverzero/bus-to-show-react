import React from 'react'
import '../../App.css';
import logo from '../../Images/Logos/bts-logo-orange.png'
// import MediaQuery from 'react-responsive';
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
                  expandReservationDetailsClick={props.expandReservationDetailsClick}
                  reservationDetailId={props.reservationDetailId}
                  displayFuturePast={props.displayFuturePast}/>
              </div>
            </div>
          : ''}
        </ul>
      </div>
    </div>
  </div>)
}

export default ReservationsView;
