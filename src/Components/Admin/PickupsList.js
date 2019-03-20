import React from 'react'
import '../../App.css';


const PickupsList = (props) => {
  let { pickupLocations, makeSelection, resetStuff } = props

  return (
    <div className='Pickups'>
      {pickupLocations.map(location =>
        <li className="list-group-item admin-list-item" 
            key={location.id} 
            id={location.id}>
          <div className="row" id={location.id}>
            <div className="col-md-10 list-item-font" id={location.id}> 
              <strong style={{fontSize: '18px'}}>{location.locationName}</strong>
              <br />
              {location.streetAddress}
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