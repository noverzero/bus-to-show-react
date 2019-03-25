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
    {props.userReservations.map((reservation, i)=> reservation.eventsId === props.reservationDetail.eventsId &&
      <div className="border border-warning my-2 p-1" key={reservation.reservationsId}>
      <div>
      Date: {reservation.date} Reservation Id: {reservation.reservationsId}
      Will Call First Name: {reservation.willCallFirstName} Will Call Last Name: {reservation.willCallLastName}
      Ordered By First Name: {reservation.willCallFirstName} Ordered By Last Name: {reservation.willCallLastName}
      </div>
      <div>
        <form onChange={props.reservationEditField}>
          <div className="form-group" >
            <label htmlFor="willCallFirstName">Will Call First Name </label>
            <input type="name" name="willCallFirstName" className="form-control" id={reservation.reservationsId} aria-describedby="willCallFirstName" placeholder="First name of someone who can claim this ticket"  defaultValue={reservation.willCallFirstName}/>
          </div>
          <div className="form-group">
            <label htmlFor="willCallLastName">Will Call Last Name </label>
            <input type="name" name="willCallLastName" className="form-control" id={reservation.reservationsId} aria-describedby="willCallLastName" placeholder="Last name of someone who can claim this ticket"  defaultValue={reservation.willCallLastName} />
          </div>
          <small className="form-text text-muted">(Someone who can claim this ticket.)</small>
          <div className="form-group form-check">
            <input type="checkbox" name="confirm" className="form-check-input" id={reservation.reservationsId} required/>
            <label className="form-check-label" htmlFor="confirm">I understand that by pressing submit, I am updating my ticket information, and old information will be replaced the new information.</label>
          </div>
          <div className="bg-primary text-white" onClick={props.submitReservationForm}>Submit</div>
        </form>
      </div>

      </div>
    )}

    </div>
  )
}

export default EditReservation;
