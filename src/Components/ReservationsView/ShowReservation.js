import React, { useState, useEffect } from 'react';
import '../../App.css';
import moment from 'moment'
import EditReservation from './EditReservation'
import { useStore } from '../../Store';

const fetchUrl = `${process.env.REACT_APP_API_URL}`;

const ShowReservation = (props) => {
  const {
    btsUser,
    setBtsUser,
    showForgotForm,
    toggleShowForgotForm,
    userReservations,
    displayUserReservationSummary,
    setDisplayUserReservationSummary,
    reservationDetail,
    setReservationDetail,
    displayReservationDetail,
    setDisplayReservationDetail,
    displayEditSuccess,
    setDisplayEditSuccess,
    displayEditReservation,
    setDisplayEditReservation

  } = useStore();

  const [cancelTransferArray, setCancelTransferArray] = useState([]);
  const [reservationToEditId, setReservationToEditId] = useState(null);
  const [displayCancelWarning, setDisplayCancelWarning] = useState(false);

  const createArrayOfEventIds = userReservations.length > 0 ? userReservations.map(show => show.status != '3' && show.eventsId ).sort() : []
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
      if(props.userReservations[ii].eventsId == property1 && props.userReservations[ii].status != '3'){
        console.log('props.userReservations[ii].status ==>>==>> ', props.userReservations[ii].status);
        props.userReservations[ii].ticketQuantity = countObj[props.userReservations[ii].eventsId]
        reservationSummaryArr.push(props.userReservations[ii])
          break
      }
    }
  }
  const reservationSummaryArrSorted = reservationSummaryArr.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  
  const toggleEditReservation = (e) =>{
    console.log(' toggleEditReservation e.target.id ==', e.target.id);
    setDisplayEditReservation(!displayEditReservation)
    setReservationToEditId(parseInt(e.target.id))
    setCancelTransferArray([]);
  }

  const selectForTransferOrCancel = (e) => {
    const cancelTransferArrayCopy = [...cancelTransferArray];
    console.log('selectForTransferOrCancelb ==', e.target.id);
    console.log('e.target.checked ', e.target.checked);
    if (e.target.checked) {
      cancelTransferArrayCopy.push(e.target.id);
      setCancelTransferArray(cancelTransferArrayCopy);
    } else {
      const index = cancelTransferArrayCopy.indexOf(e.target.id);
      if (index > -1) {
        cancelTransferArrayCopy.splice(index, 1);
        setCancelTransferArray(cancelTransferArrayCopy);
      } else {
        console.log('attempting to uncheck an id that is not in the array');
      }
    }
    console.log('cancelTransferArrayCopy ==>>==>> ', cancelTransferArrayCopy);

  }

  const cancelSelectedReservations = () => {
    console.log('cancelSelectedReservations clicked ==>>==>> ', cancelTransferArray);
    setDisplayCancelWarning(true);
  }

  const transferSelectedReservations = () => {
    console.log('transferSelectedReservations clicked ==>>==>> ', cancelTransferArray);
    setDisplayCancelWarning(false);
  }

  const refundMinusProcessing = async () => {
    console.log('refundMinusProcessing fetchUrl ==>>==>> ', fetchUrl);
     const jwtToken = localStorage.getItem('jwt')
     if(!jwtToken){
       return
     }
     const response = await fetch(`${fetchUrl}/reservations/refund_minus_processing`, { method: 'PATCH', 
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('jwt')}`
         },
         withCredentials: true,
         body: JSON.stringify({ cancelTransferArray })
      })

      const json = await response.json()
      console.log('refundMinusProcessing json ==>>==>> ', json);
  
  }

  const cancelAndGiveCredit = () => {
    console.log('cancelAndGiveCredit clicked ==>>==>> ', cancelTransferArray);
  }

  const neverMindKeepReservations = () => {
    setDisplayCancelWarning(false);
    setCancelTransferArray([]);
  }

  

  useEffect(() => {
    console.log('wht is use effect up to? ==>>==>> ', cancelTransferArray, displayCancelWarning);
    if (reservationDetail) {
      setDisplayUserReservationSummary(true);
      setDisplayReservationDetail(true);
    }

  }, [reservationDetail, displayCancelWarning, displayUserReservationSummary, displayReservationDetail, displayEditReservation, displayEditSuccess, cancelTransferArray]);

  const expandReservationDetailsClick = (e) => {
    const resDeet = userReservations.find(
      (show) => parseInt(show.eventsId) === parseInt(e.target.id)
    );
    setReservationDetail(resDeet);
    //console.log('yep expand was clicked inside the component ==>>==>> ', reservationDetail);
  };

  return (
    <div className="">
      {reservationDetail
      ? //If a reservaton summary has been selected, display reservation details ( if not, do nothing )
        <div>
          {!displayEditReservation
          ?
          <div>
            <h6><strong>Your Reservations For:</strong></h6>
            <h6 className="bts-white-bg">
              <strong>DATE:</strong> {reservationDetail.date}<br/>
              <strong>Event:</strong> {reservationDetail.headliner}<br/>
              <strong>Venue:</strong> {reservationDetail.venue}
            </h6>
            {displayEditSuccess
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
            {!displayEditReservation &&
            <div>
              <div> selected {cancelTransferArray.length} / {reservationSummaryArrSorted.filter((show, i) => show.eventsId === parseInt(reservationDetail.eventsId)).length} reservations </div>
              { 
                displayCancelWarning ?
                 <div className="alert alert-danger m-4" role="alert">
                      Heads up!  You are about to cancel {cancelTransferArray.length} of your {userReservations.filter((show, i) => show.eventsId === parseInt(reservationDetail.eventsId)).length} reservations for this show.  
                    <button onClick={refundMinusProcessing} type="button" className="btn btn-danger ml-1">Cancel and refund (minus processing fees) </button>
                      <button onClick={cancelAndGiveCredit} type="button" className="btn btn-outline-secondary m-2">Cancel and send me a code for {cancelTransferArray.length} future spots </button>
                      <button onClick={transferSelectedReservations} type="button" className="btn btn-outline-secondary m-2">Transfer these spots to another event or pick-up if available </button>
                      <button onClick={neverMindKeepReservations} type="button" className="btn btn-outline-secondary m-2">Never mind. Keep my reservations.</button>

                    </div> : 
                    <div></div>
              }
              {cancelTransferArray.length > 0 &&
                <div className="row">
                  <div className="col-12">
                  <div onClick={cancelSelectedReservations} className="btn btn-block-admin my-2 col-4" id="cancelSelectedReservations" >
                    Cancel
                    </div> or <button>Transfer</button> selected reservations
                  </div>
                </div>
              }
            </div>
            }

            {!displayEditReservation ? reservationSummaryArrSorted.map((show, i) => show.eventsId === parseInt(reservationDetail.eventsId) &&
              <div className="row bg-light p-4 m-4" key={i}>
                <li className="px-3 pt-2 list-item mx-auto" key={show.reservationsId} id={show.reservationsId}>
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
                      <div className="mt-4" id={show.reservationsId} onClick={toggleEditReservation}>
                        Change Rider or Will Call Name<i id={show.reservationsId} className="fas fa-edit fa-sm float-right pb-2"></i>
                      </div>
                    </div>
                  </div>
                </li>
                <div className="form-check">
                  <input
                    type={'checkbox'} 
                    className="form-check-input" 
                    id={show.reservationsId}
                    onChange={selectForTransferOrCancel}
                    checked={cancelTransferArray.includes(show.reservationsId.toString())}

                      />
                  <label className="form-check-label" htmlFor="editReservation">cancel or transfer to another event</label>
                </div>
              </div>
            ) //end of userReservations.map function
            : 
              <EditReservation
                reservationDetail={reservationDetail}
                userReservations={props.userReservations}
                reservationEditField={props.reservationEditField}
                submitReservationForm={props.submitReservationForm}
                reservationToEditId={reservationToEditId}
              />
            }
          </div>
        </div>
      : ''
      }


      {!reservationSummaryArrSorted.length > 0 || reservationDetail ? '' : //if user has no reservations, or user has selected a reservation summary to view details for, then do nothing here.  otherwise, print reservations.
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
                <div className="btn detail-btn my-1 col-12" id={show.eventsId} onClick={expandReservationDetailsClick}>
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
