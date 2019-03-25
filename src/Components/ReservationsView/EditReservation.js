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
    {props.userReservations.map((reservation)=> reservation.eventsId === props.reservationDetail.eventsId &&
      <div className="border border-warning my-2 p-1" key={reservation.reservationsId}>
      <div>
      Date: {reservation.date} Reservation Id: {reservation.reservationsId}
      Will Call First Name: {reservation.willCallFirstName} Will Call Last Name: {reservation.willCallLastName}
      Ordered By First Name: {reservation.willCallFirstName} Ordered By Last Name: {reservation.willCallLastName}
      </div>
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      </div>
    )}

    </div>
  )
}

export default EditReservation;
