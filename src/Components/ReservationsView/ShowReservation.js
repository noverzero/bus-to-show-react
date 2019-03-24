import React from 'react'
import '../../App.css';
import moment from 'moment'
// import MediaQuery from 'react-responsive';
import logo from '../../Images/Logos/bts-logo-gray.png'


const ShowReservation = (props) => {

  const createArrayOfEventIds = props.userReservations.map(show => show.eventsId ).sort()
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
  console.log('date check' , new Date(a.date).getTime(), 'now::', Date.now(), 'is the show in the past?'  , new Date(a.date).getTime() < Date.now())
  return new Date(a.date).getTime() - new Date(b.date).getTime()
})
console.log('reservationSummaryArrSorted ]}}}}} ', reservationSummaryArrSorted)

  return (
    <div className="">
      {props.reservationDetail ?
      <div>
        <h6><strong>Your Reservations For:</strong></h6>
        <h6 className="bts-white-bg">
          <strong>DATE:</strong> {props.reservationDetail.date}<br/>
          <strong>Event:</strong> {props.reservationDetail.headliner}<br/>
          <strong>Venue:</strong> {props.reservationDetail.venue}
        </h6>
      <div className='Shows container mx-auto'>
          {props.userReservations.length > 0 ? props.userReservations.map((show, i) => show.eventsId === parseInt(props.reservationDetail.id) &&
            <li className="px-3 pt-2 list-item mx-auto shadow-sm" key={show.reservationsId} id={show.id}>
              <div className="row border-top border-left border-right border-secondary bg-light p-2" id={show.id}>
                <div className="col-lg-12 mx-auto cart-item-font" id={show.id}>
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
                  
                  <div className="row mx-auto" id={show.id}>Departing From: {show.locationName} <br />{show.streetAddress}
                  </div>
                </div>
              </div>
              <div className="row border-left border-right border-bottom border-secondary bg-light mb-2">
              <div className="col-lg-12 text-center cart-item-font ">
                {show.firstBusLoadTime ?
                  <div>
                 {`First bus loads around: ${moment(show.firstBusLoadTime, 'hhmm').format('hh:mm a')}`}
                 </div>
                : ''}
                  <div className="red-text ">
                    Last bus departs at: {moment(show.lastBusDepartureTime, 'hhmm').format('hh:mm a')}
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
    {
      //no ID
    }
      </div>}


      {!reservationSummaryArrSorted.length > 0 || props.reservationDetail  ? '' :
      props.displayFuture ? reservationSummaryArrSorted.map((show, i) =>  new Date(show.date).getTime() >= Date.now() + 86400000 &&
        <li className="px-3 pt-2 mx-auto list-item text-center shadow-sm" key={i} id={show.id}>
          <div className="row border-top border-left border-right border-success bg-light p-2" id={show.id}>
              <div className="col-lg-12 cart-item-font red-text pl-0 mx-auto">{show.ticketQuantity} Roundtrip Bus Spot(s) on {moment(show.date, "MM-DD-YYYY").format("dddd")}, {show.date}
              </div>
            <div className="col-lg-12 cart-item-font" id={show.id}>
              <div className="row mx-auto">For: {show.headliner} at {show.venue.split(' Amphitheatre')[0]}
              </div>
            </div>
          </div>
          <div className="row border-left border-right border-bottom border-success bg-light mb-2">
            <div className="col-lg-12 cart-item-font ">
              <div className="btn detail-btn my-1 col-12" id={show.eventsId} onClick={props.expandReservationDetailsClick}>
                <strong id={show.eventsId}>View Departure Details</strong>
              </div>
            </div>
          </div>

        </li>)
      : reservationSummaryArrSorted.map((show, i) =>  new Date(show.date).getTime() < Date.now() + 86400000 &&
        <li className="px-3 pt-2 mx-auto list-item text-center shadow-sm" key={i} id={show.id}>
          <div className="row border-top border-left border-right border-success p-2" id={show.id}>
              <div className="col-lg-12 cart-item-font text-black-50 pl-0 mx-auto">{show.ticketQuantity} Roundtrip Bus Spot(s) on {moment(show.date, "MM-DD-YYYY").format("dddd")}, {show.date}
              </div>
            <div className="col-lg-12 cart-item-font" id={show.id}>
              <div className="row mx-auto">For: {show.headliner} at {show.venue.split(' Amphitheatre')[0]}
              </div>
              <div className="row mx-auto" id={show.id}>Departing From: {show.locationName} <br />{show.streetAddress}
              </div>
            </div>
          </div>
          <div className="row border-left border-right border-bottom border-success bg-secondary mb-2">

          </div>

        </li>)


    }
</div>



  )
}

export default ShowReservation;
