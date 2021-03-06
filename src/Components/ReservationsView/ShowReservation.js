import React from 'react'
import '../../App.css';
import moment from 'moment'
import EditReservation from './EditReservation'

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

  return (
    <div className="">
      {props.reservationDetail
      ? //If a reservaton summary has been selected, display reservation details ( if not, do nothing )
        <div>
          {!props.displayEditReservation
          ?
          <div>
            <h6><strong>Your Reservations For:</strong></h6>
            <h6 className="bts-white-bg">
              <strong>DATE:</strong> {props.reservationDetail.date}<br/>
              <strong>Event:</strong> {props.reservationDetail.headliner}<br/>
              <strong>Venue:</strong> {props.reservationDetail.venue}
            </h6>
            {props.displayEditSuccess
            ?
              <div className="alert alert-success cart-item-font" role="alert">
                <div className="row">
                  <div className="col-10 float-left">
                  Your change has been processed.  Take a look at the updated information below.
                  </div>
                  <div className="col-2 float-right">
                    <i class="fas fa-times-circle" onClick={props.toggleEditSuccess}></i>
                  </div>
                </div>
              </div>
            : ''
            }
          </div>
          : ''
          }
          <div className='Shows container mx-auto'>
            {// if user has not clicked edit on a reservation, display all reservations for the selected summary (otherwise, display EditReservation component)
            }
            {!props.displayEditReservation ? props.userReservations.map((show, i) => show.eventsId === parseInt(props.reservationDetail.eventsId) &&
              <li className="px-3 pt-2 list-item mx-auto shadow-sm" key={show.reservationsId} id={show.reservationsId}>
                <div className="row border-top border-left border-right border-secondary bg-light p-2" id={show.id}>
                  <div className="col-lg-12 mx-auto cart-item-font" id={show.id}>

                    <div className="row">
                      Will Call Name: {show.willCallFirstName} {show.willCallLastName} <br/>
                      {show.orderedByFirstName !== show.willCallFirstName || show.orderedByLastName !== show.willCallLastName // if ordered by name is different than will call name, display ordered by name also (if they are the same, do nothing)
                      ?
                        <div>
                          Ordered By: {show.orderedByFirstName} {show.orderedByLastName} <br/>
                          (Either can check in w/ ID)
                        </div>
                      : ''
                      }
                    </div>

                    <div className="row mx-auto" id={show.id}>
                      Departing From: {show.locationName} <br />
                      {show.streetAddress}
                    </div>
                  </div>
                </div>
                <div className="row border-left border-right border-bottom border-secondary bg-light mb-2">
                  <div className="col-lg-12 text-center cart-item-font ">

                    {show.firstBusLoadTime //if there is a firstBusLoad time in the database, then display it below (if there is not, do nothing)
                    ?
                      <div>
                        {`First bus loads around: ${moment(show.firstBusLoadTime, 'hhmm').format('hh:mm a')}`}
                      </div>
                    : ''
                    }
                    <div className="red-text ">
                        Last bus departs at: {moment(show.lastBusDepartureTime, 'hhmm').format('hh:mm a')}
                    </div>
                    <div onClick={props.toggleEditReservation}>
                      <i id={show.reservationsId} className="fas fa-edit fa-sm float-right pb-2"></i>
                    </div>
                  </div>
                </div>
              </li>
            ) //end of userReservations.map function
            :
              <EditReservation
                reservationDetail={props.reservationDetail}
                userReservations={props.userReservations}
                reservationEditField={props.reservationEditField}
                submitReservationForm={props.submitReservationForm}
                reservationToEditId={props.reservationToEditId}
              />
            }
          </div>
        </div>
      : ''
      }


      {!reservationSummaryArrSorted.length > 0 || props.reservationDetail  ? '' : //if user has no reservations, or user has selected a reservation summary to view details for, then do nothing here.  otherwise, print reservations.
        props.displayFuture
        ? reservationSummaryArrSorted.map((show, i) =>  new Date(show.date).getTime() >= Date.now() - 86400000 && //if future button has been clicked map through all reservations and display upcoming reservations (upcoming = display for 24hours after showdate)
          <li className="px-3 pt-2 mx-auto list-item text-center shadow-sm" key={i} id={show.id}>
            <div className="row border-top border-left border-right border-success bg-light p-2" id={show.id}>
              <div className="col-lg-12 cart-item-font red-text pl-0 mx-auto">{show.ticketQuantity} Roundtrip Bus Spot(s) on {moment(show.date, "MM-DD-YYYY").format("dddd")}, {show.date}
              </div>
              <div className="col-lg-12 cart-item-font" id={show.id}>
                <div className="row mx-auto">
                  For: {show.headliner} at {show.venue.split(' Amphitheatre')[0]}
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
        : reservationSummaryArrSorted.map((show, i) =>  new Date(show.date).getTime() < Date.now() - 86400000 && //if past button has been clicked map through all reservations and display past reservations (past = anything before yesterday)
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
