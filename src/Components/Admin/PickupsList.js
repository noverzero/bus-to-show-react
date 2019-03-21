import React from 'react'
import '../../App.css';


const PickupsList = (props) => {
  let { pickupLocations, makeSelection, resetStuff } = props

  const shortName = (locationName) => {
    return locationName = locationName.split('- ')[1]
  }
  
  const shortAddress = (streetAddress) => {
    return streetAddress = streetAddress.split(', CO')[0]
  }

  return (
    <div className='Pickups'>
      {pickupLocations.map(location =>
        <li className="list-group-item admin-list-item" 
            key={location.id} 
            id={location.id}>
          <div className="row" id={location.id}>
            <div className="col-md-10 list-item-font" style={{fontSize: '1rem'}} id={location.id}> 
              <strong>{shortName(location.locationName)}</strong>
              <br />
              {shortAddress(location.streetAddress)}
              <br />
            </div>
              <button
                id={location.id}
                onClick={e => { resetStuff(); makeSelection('pickupLocationId', location.id, 'ReservationsList') }}
                type="button"
                className='btn admin-detail-btn my-4 col-md-2'>
                Select
              </button>
          </div>
        </li>)}
    </div>
  )
}

export default PickupsList;