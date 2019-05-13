import React from 'react'
import '../../App.css';

const EditReservation = (props) => {

  return (
    <div>
    {props.userReservations.map((reservation, i)=> reservation.reservationsId === props.reservationToEditId &&
      <div className="border border-warning my-1 p-2 shadow" key={reservation.reservationsId}>
      <div>
        <h6 className="bts-white-bg"><strong>Edit Your Reservations For:</strong></h6>
        <h6 className="bts-white-bg">
          <strong>DATE:</strong> {reservation.date}<br/>
          <strong>Event:</strong> {reservation.headliner}<br/>
          <strong>Venue:</strong> {reservation.venue.split(' Amphitheatre')[0]}<br/>
          <strong>Ordered By:</strong> {reservation.willCallFirstName} {reservation.willCallLastName} <br/>
        </h6>
      </div>
      <div>
      </div>
      <div>
        <form className="cart-item-font" >
          <div className="form-group " >
            <label htmlFor="willCallFirstName">Will Call First Name </label>
            <input type="name" name="willCallFirstName" className="form-control" id={reservation.reservationsId} aria-describedby="willCallFirstName" placeholder="First name of someone who can claim this ticket"  defaultValue={reservation.willCallFirstName} onChange={(e)=>props.reservationEditField(e)}/>
          </div>
          <div className="form-group">
            <label htmlFor="willCallLastName">Will Call Last Name </label>
            <input type="name" name="willCallLastName" className="form-control" id={reservation.reservationsId} aria-describedby="willCallLastName" placeholder="Last name of someone who can claim this ticket"  defaultValue={reservation.willCallLastName} onChange={(e)=>props.reservationEditField(e)} />
          </div>
          <small className="form-text text-muted">By pressing submit, you are updating the information, and old information will be erased.</small>
          <button name="detail" id={`${reservation.reservationsId}`} className="btn bg-primary text-white" onClick={props.submitReservationForm}>Submit</button>
        </form>
      </div>

      </div>
    )}

    </div>
  )
}

export default EditReservation;
