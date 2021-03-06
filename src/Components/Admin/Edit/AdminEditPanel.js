import React from 'react'
import '../../../App.css';

const AdminEditPanel = (props) => {
  let { editPickupParty, thisShow, thisDate, thisLocation, resetStuff, makeSelection, thisPickupParty, pickupLocationId, newCapacity, newPrice, newLoadTime, newDepartureTime } = props

  const shortName = (locationName) => {
    if (locationName) return locationName = locationName.split('- ')[1]
  }

  const city = (locationName) => {
    if (locationName) return locationName = locationName.split('- ')[0]
  }

  const updatePickupPartyValue = (e, pickupPartyId, ref) => {
    const field = ref.current.id
    const newValue = ref.current.value
    ref.current.value = null
    editPickupParty(pickupPartyId, field, newValue)
  }

  const handleChange =(event)=>{
    let newValue
    switch (event.target.id) {
      case "partyPrice":
        newValue = event.target.value.replace(/[^0-9.]/g, '')
        event.target.value = newValue
        break;
      case "firstBusLoadTime":
        newValue = event.target.value.replace(/[^0-9:]/g, '')
        event.target.value = newValue
        break;
      case "lastBusDepartureTime":
        newValue = event.target.value.replace(/[^0-9:]/g, '')
        event.target.value = newValue
        break;
      default:
        break;
    }
  }

  return (
    <div className="adminEditPanel">
    {thisPickupParty &&
      <li className="list-group-item admin-list-item"
      key={thisPickupParty.id}
      id={thisPickupParty.id}>
        <div className="row">
          <div className="col-12">
            <div><strong>Edit Pickup Party</strong><br />
              {thisDate} - {thisShow.headliner}<br />
              {city(thisLocation)} - {shortName(thisLocation)}
            </div>
          </div>
        </div>
          <div className="row py-2">
            <div className="col-6">
            Capacity:
            </div>
            <div className="col-6 px-0">
              <input
                style={{width:"4em"}}
                className="mx-2"
                type="number"
                id="capacity"
                ref={newCapacity}
                placeholder={thisPickupParty.capacity}
                onChange={e=>handleChange(e)}/>
              <button
                type="button"
                className="btn btn-success mx-1 px-0"
                id="capacity"
                onClick={e=>updatePickupPartyValue(e, thisPickupParty.id, newCapacity)}>
                Update
              </button>
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">
            Price:
            </div>
            <div className="col-6 px-0">
              $<input
                style={{width:"4em"}}
                className="mr-2"
                type="text"
                id="partyPrice"
                ref={newPrice}
                placeholder={thisPickupParty.partyPrice}
                onChange={e=>handleChange(e)}/>
              <button
                type="button"
                className="btn btn-success mx-1 px-0"
                id="price"
                onClick={e=>updatePickupPartyValue(e, thisPickupParty.id, newPrice)}>
                Update
              </button>
            </div>
          </div>
          <div className="row pb-2">
          Load and Departure times in 24-hour format
          </div>
          <div className="row pb-2">
            <div className="col-6 pt-2">
            Load Time:
            </div>
            <div className="col-6 px-0">
              <input
                style={{width:"4em"}}
                className="mx-2"
                type="text"
                id="firstBusLoadTime"
                ref={newLoadTime}
                placeholder={thisPickupParty.firstBusLoadTime || 'n/a'}
                onChange={e=>handleChange(e)}/>
              <button
                type="button"
                className="btn btn-success mx-1 px-0"
                id="newLoadTime"
                onClick={e=>updatePickupPartyValue(e, thisPickupParty.id, newLoadTime)}>
                Update
              </button>
            </div>
          </div>
          <div className="row py-2">
            <div className="col-6">
            Departure Time:
            </div>
            <div className="col-6 px-0">
              <input
                style={{width:"4em"}}
                className="mx-2"
                type="text"
                id="lastBusDepartureTime"
                ref={newDepartureTime}
                placeholder={thisPickupParty.lastBusDepartureTime}
                onChange={e=>handleChange(e)}/>
              <button
                type="button"
                className="btn btn-success mx-1 px-0"
                id="newDepartTime"
                onClick={e=>updatePickupPartyValue(e, thisPickupParty.id, newDepartureTime)}>
                Update
              </button>
            </div>
          </div>
        <div className="row">
          <button type="button" className="btn bts-orange-bg btn-lg btn-block my-4" onClick={e=>{resetStuff(); makeSelection('pickupLocationId', pickupLocationId, 'ReservationsList')}}>Edit a Reservation</button>
        </div>
      </li>
      }
    </div>

  )
}

export default AdminEditPanel;
