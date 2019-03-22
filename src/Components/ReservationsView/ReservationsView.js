import React from 'react'
import '../../App.css';
import logo from '../../Images/Logos/bts-logo-orange.png'
// import MediaQuery from 'react-responsive';
import ShowReservation from './ShowReservation'

const ReservationsView = (props) => {
  console.log('userReservations as props in ReservationsView', props.userReservations)


  return (
    <div className=''>
      <div className='container-fluid mt-3'>
      <div className="col-12">
        <ul className="list-group">
          {props.userReservations ?
            <div>
                  upcoming reservations
                  <ShowReservation
                    userReservations={props.userReservations} />
                </div>
            : ''}
        </ul>
        </div>


      </div>
    </div>)
}

export default ReservationsView;
