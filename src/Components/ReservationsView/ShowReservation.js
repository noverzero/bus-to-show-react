import React from 'react'
import '../../App.css';
import moment from 'moment'
// import MediaQuery from 'react-responsive';
import logo from '../../Images/Logos/bts-logo-gray.png'


const ShowReservation = (props) => {

  console.log('props.userReservations in ShowReservation', props.userReservations)

  const createArrayOfEventIds = props.userReservations.map(show => show.eventsId ).sort()
  console.log('createArrayOfEventIds', createArrayOfEventIds)


  let countObj = {}
  for(let ii = 0; ii < createArrayOfEventIds.length; ii++){
    let count = 1;
    for(let jj = 0; jj < createArrayOfEventIds.length; jj++){
        if(createArrayOfEventIds[ii] == createArrayOfEventIds[jj])
            countObj[createArrayOfEventIds[ii]] = count++;
        }
    }
    console.log('countObj', countObj)

const reservationSummaryArr = []
for (let property1 in countObj){

 for (let ii = 0; ii < props.userReservations.length; ii++){
   if(props.userReservations[ii].eventsId == property1){
     props.userReservations[ii].ticketQuantity = countObj[props.userReservations[ii].eventsId]
      reservationSummaryArr.push(props.userReservations[ii])
      break
   }
 }
}
const reservationSummaryArrSorted = reservationSummaryArr.sort((a, b) => {
  return new Date(a.date).getTime() - new Date(b.date).getTime()
})
console.log('reservationSummaryArrSorted ]}}}}} ', reservationSummaryArrSorted)


  return (
    <div>
      {props.reservationDetailId ?
      <div>
      DATE: {props.reservationDetailId}
      <div className='Shows container text-center'>
          {props.userReservations.length > 0 ? props.userReservations.map((show, i) => show.date === props.reservationDetailId &&
            <li className="px-3 pt-2 list-item text-center" key={show.reservationsId} id={show.id}>
              <div className="row border-top border-left border-right border-secondary bg-light p-2" id={show.id}>
                <div className="col-lg-12 text-center cart-item-font" id={show.id}>
                <div className="row">
                  Will Call Name: {show.willCallFirstName} {show.willCallLastName} <br/>
                  {show.orderedByFirstName !== show.willCallFirstName || show.orderedByLastName !== show.willCallLastName ?
                  <div>
                  Ordered By: {show.orderedByFirstName} {show.orderedByLastName} <br/>
                  (Either can check in w/ ID)
                  </div>
                  : ''
                  }
                </div>
                  <div className="row">Event: {show.headliner} <br/>
                    Venue: {show.venue.split(' Amphitheatre')[0]}
                  </div>
                  <div className="row" id={show.id}>Departing From: {show.locationName} <br />{show.streetAddress}
                  </div>
                </div>
              </div>
              <div className="row border-left border-right border-bottom border-secondary bg-light">
              <div className="col-lg-12 text-center cart-item-font ">
                {show.firstBusLoadTime ?
                  <div>
                 {`First bus loads around: ${show.firstBusLoadTime}`}
                 </div>
                : ''}
                  <div className="red-text ">
                    Last bus departs at: {show.lastBusDepartureTime}
                  </div>
                </div>
              </div>

            </li>
            ) :
            <li className="list-group-item ">
              <div className="row justify-content-center" style={{ textAlign: "center" }}>
                <div className="col-12 ">
                  <h5 className='black-text'>No reservations for this Event.</h5>
                  <img
                    className='nothing-in-cart-image'
                    src={logo}
                    alt="bts-logo"
                    width="50" />
                </div>
              </div>
            </li>}

      </div>
      </div>
      :
      <div>
      no ID
      </div>}


      {!reservationSummaryArrSorted.length > 0 || props.reservationDetailId  ? ''
      : reservationSummaryArrSorted.map((show, i) =>
        <li className="px-3 pt-2 list-item text-center" key={i} id={show.id}>
          <div className="row border-top border-left border-right border-secondary bg-light p-2" id={show.id}>
              <div className="col-lg-12 cart-item-font red-text pl-0">{show.ticketQuantity} Roundtrip Bus Spot(s) on {moment(show.date, "MM-DD-YYYY").format("dddd")}, {show.date}
              </div>
            <div className="col-lg-12 cart-item-font" id={show.id}>
              <div className="row">For: {show.headliner} at {show.venue.split(' Amphitheatre')[0]}
              </div>
              <div className="row" id={show.id}>Departing From: {show.locationName} <br />{show.streetAddress}
              </div>
            </div>
          </div>
          <div className="row border-left border-right border-bottom border-secondary bg-light">
          <div className="col-lg-12 cart-item-font ">
            {show.firstBusLoadTime ?
              <div>
             {`First bus loads around: ${show.firstBusLoadTime}`}
             </div>
            : ''}
              <div className="red-text ">
                Last bus departs at: {show.lastBusDepartureTime}
              </div>
              <div className="btn detail-btn my-1 col-12" id={show.date} onClick={props.expandReservationDetailsClick}>
                <strong id={show.date}>Expand</strong>
              </div>
            </div>
          </div>

        </li>)

    }
</div>



  )
}

export default ShowReservation;
