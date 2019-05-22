import React from 'react'
import '../../../App.css';

const AdminEditPanel = (props) => {
  let { thisShow, thisDate, thisLocation, searchItems, toggleProperty, filterString, shows, makeSelection, displayList, pickupLocations, pickupParties, theseParties, theseLocations, reservations, thisCapacity, thisPickupParty, getReservations, pickupLocationId, findPickup, thisPickup } = props

  const shortName = (locationName) => {
    if (locationName) return locationName = locationName.split('- ')[1]
  }

  const city = (locationName) => {
    if (locationName) return locationName = locationName.split('- ')[0]
  }
      return (
        <div className="adminEditPanel">
        {thisPickupParty &&
          <li className="list-group-item admin-list-item"
          key={thisPickupParty.id}
          id={thisPickupParty.id}>
            <div className="row">
              <div className="col-12">
                  <div className="row px-2">
                    <div>{thisDate} - {thisShow}<br />
                      {city(thisLocation)} - {shortName(thisLocation)}<br/>
                      Capacity: {thisCapacity}
                    </div>
                    {/* <label htmlFor="available">Available: {thisPickup.capacity}</label>
                    <input type="" name="available" className="form-control" id={thisPickup.id} aria-describedby="available" placeholder={thisPickup.capacity}
                    onChange={(e)=>console.log(e, 'hey I changed quantity available')} />
                    <div>
                    in Cart: {thisPickup.inCart}
                    </div>
                    <button name="detail" id={`${thisPickup.id}`} className="btn bg-primary text-white" onClick={submitEditShowForm}>Submit</button>
                  </div>
                  <div className="row px-2">
                    Last Bus Departure Time: {thisPickup.lastBusDepartureTime}
                    Price: {thisPickup.partyPrice}
                    PickupLocationId: {thisPickup.pickupLocationId}
                    Updated at: {thisPickup.updated_at} */}
                  </div>
              </div>
            </div>
          </li>
        }
        </div>    
  )
}

export default AdminEditPanel;
