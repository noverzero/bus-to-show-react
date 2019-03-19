import React from 'react'
import '../../App.css';
import moment from 'moment'
// import MediaQuery from 'react-responsive';
import logo from '../../Images/Logos/bts-logo-gray.png'


const ShowReservation = (props) => {

  console.log('props.userReservations in ShowReservation', props.userReservations)

  //get Ticket Quantity for Each Pickup Party

  return (
    <div className=''>

        {props.userReservations.length > 0 ? props.userReservations.map(show =>
          <div className="list-group-item highlightOnHover show-list-item" key={show.id} id={show.orderId}>
            <div className="row" id={show.orderId}>
            <div className="col-md-12 list-item-font" id={show.orderId}>1 Tix For: {show.willCallFirstName} {show.willCallLastName}</div>
              <div className="col-md-12 list-item-font" id={show.orderId}>On: {moment(show.date, "MM-DD-YYYY").format("dddd")} <strong>{show.date}</strong>
              </div>
              <div className="col-md-12 list-item-font" id={show.orderId}>
                Event: <strong>{show.headliner}</strong> <br />
                Venue: {show.venue}
              </div>
              <div className="col-md-12 list-item-font" id={show.orderId}>Departing From: {show.locationName} by: {show.lastBusDepartureTime}</div>

            </div>
            </div>
          ) :
          <li className="list-group-item ">
            <div className="row justify-content-center" style={{ textAlign: "center" }}>
              <div className="col-12 ">
                <h5 className='black-text'>No reservations for this user.</h5>
                <img
                  className='nothing-in-cart-image'
                  src={logo}
                  alt="bts-logo"
                  width="50" />
              </div>
            </div>
          </li>}

    </div>
  )
}

export default ShowReservation;
