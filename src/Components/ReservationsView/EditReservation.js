import React from 'react'
import '../../App.css';
import logo from '../../Images/Logos/bts-logo-orange.png'
// import MediaQuery from 'react-responsive';
import ShowReservation from './ShowReservation'

const EditReservation = (props) => {
  console.log('props inside edit', props)

//   reservationDetail:
// city: "Denver"
// date: "04/13/2019"
// eventsId: 36421209
// firstBusLoadTime: "14:30"
// headliner: "Flatbush Zombies"
// headlinerBio: "Flatbush Zombies is a hip-hop group consisting of Meechy Darko, Zombie Juice, and producer/rapper Erick Arc Elliott. They are located in the Brooklyn neighborhood of Flatbush in New York City. They have released two mixtapes titled "D.R.U.G.S". and "BetterOffDEAD" as well as several music videos.↵ <a href="https://www.last.fm/music/Flatbush+ZOMBiES">Read more on Last.fm</a>. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply."
// headlinerImgLink: "https://lastfm-img2.akamaized.net/i/u/174s/5be80317bab524a3af11c21e3196f2c6.png"
// lastBusDepartureTime: "16:00"
// locationName: "Denver - DU Illegal Pete's"
// orderId: 82
// orderedByEmail: "larry@curb.com"
// orderedByFirstName: "Larry"
// orderedByLastName: "David"
// reservationsId: 94
// status: 1
// streetAddress: "1744 E Evans Ave, Denver, CO"
// support1: "Joey Bada$$"
// support2: "The Underachievers"
// support3: "Kirk Knight"
// ticketQuantity: 2
// userId: 8
// venue: "Red Rocks Amphitheatre"
// willCallFirstName: "Larry"
// willCallLastName: "David"

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
          <button id={`${reservation.reservationsId}`} className="btn bg-primary text-white" onClick={props.submitReservationForm}>Submit</button>
        </form>
      </div>

      </div>
    )}

    </div>
  )
}

export default EditReservation;
