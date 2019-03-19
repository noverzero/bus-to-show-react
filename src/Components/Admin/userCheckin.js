import React from 'react'
import '../../App.css';
// import MediaQuery from 'react-responsive';
import ShowList from './ShowList'
import PickupsList from './PickupsList'
import ReservationsList from './ReservationsList'

const UserCheckin = (props) => {
  let { thisShow, thisPickup, searchItems, toggleProperty, filterString, shows, makeSelection, displayList, pickupLocations, reservations, toggleCheckedIn } = props
  let thisDate

  const previousProperty = ( 
      displayList === 'ShowList' ? 'displayUserCheckin' : 
      displayList === 'PickupsList' ? 'ShowList' : 
      displayList === 'ReservationsList' ? 'PickupsList' : 
      null)

  const headerLabel = (displayList) => {
    if(thisShow) {
      thisDate = thisShow.date
      thisShow = thisShow.headliner
    }
    if(thisPickup) thisPickup = thisPickup.locationName

    if (displayList === 'ShowList') return 'Select a Show'
    else if (displayList === 'PickupsList') return `${thisDate} ${thisShow}`
    else if (displayList === 'ReservationsList') {
      return (<div>{thisDate} {thisShow}
              <br />
              {thisPickup}
              </div>)
    }
    else return ''
  }

  return (
    
    <div className='ShowList mt-2'>
    <div className='admin-list-header text-center'>{headerLabel(displayList)}</div>
      <div className='container'>
        <div className="list-group">
          <div className="list-group-item show-header">
            <div className="row show-list-flex">
              <div className="col-3 mb-3" >
                <button type="button" className="btn btn-outline-light" onClick={e=>toggleProperty(previousProperty)}>Back</button>
              </div>
              <div className="col-9 mb-3" >
                <form className="form-inline float-right">
                  <input onChange={searchItems} className="form-control search-bar" type="search" placeholder="Search..." aria-label="Search"></input>
                </form>
              </div>
            </div>
            <ul className="list-group">
              <div className={displayList === 'ShowList' ? '' : 'hidden'}>
                <ShowList
                  shows={shows}
                  filterString={filterString}
                  makeSelection={makeSelection}
                  toggleProperty={toggleProperty}
                />
              </div>  
              <div className={displayList === 'PickupsList' ? '' : 'hidden'}>
                <PickupsList
                  filterString={filterString}
                  pickupLocations={pickupLocations}
                  makeSelection={makeSelection}
                />  
              </div>
              <div >
              {displayList === 'ReservationsList' ? 
                <ReservationsList
                reservations={reservations}
                toggleCheckedIn={toggleCheckedIn}
              /> : '' }
              </div>  
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

}

export default UserCheckin