import React from 'react'
import '../../../App.css';


const EditShowPanel = (props) => {
  console.log('ESP PROPS::', props)
  // filterString={filterString}
  // makeSelection={makeSelection}
  // pickupLocations={pickupLocations}
  // pickupParties={pickupParties}
  // theseParties={theseParties}
  // theseLocations={theseLocations}
  // resetStuff={resetStuff}


  const shortName = (locationName) => {
    if (locationName) return locationName = locationName.split('- ')[1]
  }

  const city = (locationName) => {
    if (locationName) return locationName = locationName.split('- ')[0]
  }


  const preservation = async (targetId) => {
    let result = await props.getReservationsThisLocation(targetId)

  }

 // console.log('preservation', preservation())


  return (
    <div className='shows'>
    {props.theseParties.map((party, i) => {
      console.log('props.theseResArray in theseParties.map', props.theseResArray)

      return (
        <li className="list-group-item admin-list-item"
            key={party.id}
            id={party.id}
            style={{  borderRadius: '1px', padding: '.1rem .5rem' }}>
          <div className="row" id={party.id}>
            <div className="col-12">
                <div className="row px-2">
                  <div></div>
                  <div>{props.thisDate} - {props.thisHeadliner}<br />
                    {city(props.thisPickupLocation)} - {shortName(props.thisPickupLocation)}<br/>
                    Available: {props.thisCapacity }
                    Sold: {props.theseResArray[i]}

                  </div>
                  <label htmlFor="available">Available: {party.capacity}</label>
                  <input type="" name="available" className="form-control" id={party.id} aria-describedby="available" placeholder={party.capacity}
                  onChange={(e)=>console.log(e, 'hey I changed quantity available')} />
                  <div>
                  in Cart: {party.inCart}
                  </div>
                  <button name="detail" id={`${party.id}`} className="btn bg-primary text-white" onClick={props.submitEditShowForm}>Submit</button>
                </div>
                <div className="row px-2">
                  Last Bus Departure Time: {party.lastBusDepartureTime}
                  Price: {party.partyPrice}
                  PickupLocationId: {party.pickupLocationId}
                  Updated at: {party.updated_at}
                </div>
            </div>
          </div>
        </li>)
    })}

    </div>
  )
}

export default EditShowPanel;
