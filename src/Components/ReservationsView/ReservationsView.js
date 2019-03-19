import React from 'react'
import '../../App.css';
import logo from '../../Images/Logos/bts-logo-orange.png'
// import MediaQuery from 'react-responsive';
import ShowReservation from './ShowReservation'

const ReservationsView = (props) => {
  console.log(props.userReservations)


  return (
    <div className=''>
      <div className='container mt-3'>
        <div className="list-group">
          <div className="list-group-item">

            <div className="row">
              <div className="col-md-12">
                upcoming reservations
              </div>
            </div>

            <ul className="list-group">

              {props.userReservations ?
                <div>
                  <div className="row ">
                    <div className="col-md-12">
                      <ShowReservation
                        userReservations={props.userReservations} />
                    </div>
                  </div>
                </div>
                : ''}
            </ul>

          </div>
        </div>
      </div>
    </div>)
}

export default ReservationsView;
