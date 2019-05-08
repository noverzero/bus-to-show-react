import React from 'react'
import '../../App.css';


const PickupsList = (props) => {
  let { pickupLocations, pickupParties, makeSelection, theseParties, theseLocations, resetStuff, filterString } = props
  const shortName = (locationName) => {
    return locationName = locationName.split('- ')[1]
  }

  const city = (locationName) => {
    if (locationName) return locationName = locationName.split('- ')[0]
  }

  const shortAddress = (streetAddress) => {
    return streetAddress = streetAddress.split(', CO')[0]
  }

  filterString = filterString.toLowerCase()
  let filterPickups = theseLocations.filter(pickup => pickup.locationName.toLowerCase().includes(filterString) || pickup.streetAddress.toLowerCase().includes(filterString))

  return (
    <div className='Pickups'>
      {filterPickups.length > 0 ?

        filterPickups.map(location =>
        <li className="list-group-item admin-list-item"
            key={location.id}
            id={location.id}>
          <div className="row" id={location.id}>
            <div className="col-md-10 list-item-font" style={{fontSize: '1rem'}} id={location.id}>
              <strong>{city(location.locationName)} - {shortName(location.locationName)}</strong>
              <br />
              {shortAddress(location.streetAddress)}
              <br />
            </div>
              <button
                id={location.id}
                onClick={e => { resetStuff(); makeSelection('pickupLocationId', location.id, 'ReservationsList') }}
                type="button"
                className='btn admin-detail-btn my-2 col-md-2'>
                Select
              </button>
          </div>
        </li>)
        : 'Pickup locations not found'}
    </div>
  )
}

export default PickupsList;
