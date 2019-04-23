import React from 'react'
import '../../App.css';
import ShowList from './ShowList'
import PickupsList from './PickupsList'
import ReservationsList from './ReservationsList'

const UserCheckin = (props) => {
  let { thisShow, thisPickup, searchItems, toggleProperty, filterString,
      shows, makeSelection, displayList, pickupLocations, reservations,
      toggleCheckedIn, thisCapacity, stopRefreshing } = props
      
  let thisDate

  const previousProperty = (
      displayList === 'ShowList' ? 'displayUserCheckin' :
      displayList === 'PickupsList' ? 'ShowList' :
      displayList === 'ReservationsList' ? 'PickupsList' :
      null)

  const shortName = (locationName) => {
    if (locationName) return locationName = locationName.split('- ')[1]
  }

  const city = (locationName) => {
    if (locationName) return locationName = locationName.split('- ')[0]
  }
  const headerLabel = (displayList) => {
    if(thisShow) {
      thisDate = thisShow.date
      thisShow = thisShow.headliner
    }
    if(thisPickup) thisPickup = thisPickup.locationName
    if (displayList === 'ShowList') return (
      <div>Select a Show<br/>
      </div>)

    else if (displayList === 'PickupsList') return (
      <div>{thisDate} - {thisShow}<br/>
        Select a Pickup Location<br/>

      </div>)
    else if (displayList === 'ReservationsList' ) return (
      <div>{thisDate} - {thisShow}<br />
        {city(thisPickup)} - {shortName(thisPickup)}<br/>
        Cap: {thisCapacity + reservations.length} / Avail: {thisCapacity} / Sold: {reservations.length}
      </div>)
    else return ''
  }

  const resetStuff = () => {
    const searchBar = document.getElementById('search')
    const adminList = document.getElementById('adminList')
    searchBar.value = ''
    adminList.scrollTop = 0
    // reservations = ''
  }

  const calcHeightVal = () => {
    let header = document.getElementsByClassName('Header')[0]
    var styles = window.getComputedStyle(header);
    var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

    let totalHeight = Math.ceil(header.offsetHeight + margin)
    console.log(totalHeight)
    console.log(window.innerHeight);
    const newHeight = window.innerHeight - totalHeight
    console.log(newHeight);
    return `${newHeight}px`

  }

  return (

    <div className='ShowList mt-2' style={{ maxHeight: '100%'}}>
    <div className='admin-list-header text-center ml-n1 mr-n1'>
      {headerLabel(displayList)}
    </div>
      <div className="list-group mr-n1 ml-n1">
        <div className="list-group-item show-header" style={{ maxHeight: calcHeightVal()}}>
          <div className="row show-list-flex">
            <div className="col-3 mb-3" >
              <button type="button" className="btn btn-outline-light" onClick={e=>{resetStuff(); toggleProperty(previousProperty); stopRefreshing(true)}}>Back</button>
            </div>
            <div className="col-9 mb-3" >
              <form className="form-inline float-right">
                <input onChange={searchItems} className="form-control search-bar" type="search" placeholder="Search..." aria-label="Search" id="search"></input>
              </form>
            </div>
          </div>
          <ul className="list-group adminlist" id="adminList" style={{height: '100%'}}>
            <div className={displayList === 'ShowList' ? '' : 'hidden'}>
              <ShowList
                filterString={filterString}
                makeSelection={makeSelection}
                resetStuff={resetStuff}
                shows={shows}
                toggleProperty={toggleProperty}
              />
            </div>
            <div className={displayList === 'PickupsList' ? '' : 'hidden'}>
              <PickupsList
                filterString={filterString}
                makeSelection={makeSelection}
                pickupLocations={pickupLocations}
                resetStuff={resetStuff}
              />
            </div>
            <div>
            {displayList === 'ReservationsList' &&
              <ReservationsList
                filterString={filterString}
                reservations={reservations}
                toggleCheckedIn={toggleCheckedIn}
              />
            }
            </div>
          </ul>
        </div>
      </div>
    </div>
  )

}

export default UserCheckin
