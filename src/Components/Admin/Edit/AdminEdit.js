import React from 'react'
import '../../../App.css';
import AdminPickupsList from './AdminPickupsList'
import AdminShowList from './AdminShowList'
import AdminEditPanel from './AdminEditPanel'

const AdminEdit = (props) => {
  let { displayAdminPanel, thisShow, thisLocation, searchItems, toggleProperty, filterString, shows, makeSelection, displayList, pickupLocations, pickupParties, theseParties, theseLocations, reservations, thisCapacity, eventId, getReservations, pickupLocationId, thisPickupParty } = props
  
  let thisDate, thisHeadliner, thisLocationName

  const previousProperty = (
    displayList === 'ShowList' ? 'displayAdminPanel' :
    displayList === 'PickupsList' ? 'ShowList' :
    displayList === 'AdminEditPanel' ? 'PickupsList' :
    null
  )

  const displaySearch = (
    displayList === 'AdminEditPanel' ? 
    "none" : 
    ""
  )

  const headerLabel = (displayList) => {
    if (thisShow) {
      thisDate = thisShow.date
      thisHeadliner = thisShow.headliner
    }
    if (thisLocation) thisLocationName = thisLocation.locationName
    if (displayList === 'ShowList') return (
      
      <div>Admin Panel<br/>
      Select a Show<br/>
      </div>)

    else if (displayList === 'PickupsList') return (
      <div>Admin Panel<br/>
      {thisDate} - {thisHeadliner}<br/>
        Select a Pickup Location<br/>
      </div>)
    else if (displayList === 'AdminEditPanel' ) return (
      <div>Admin Panel<br/>
      {thisDate} - {thisHeadliner}<br />
        {city(thisLocationName)} - {shortName(thisLocationName)}<br/>
        Cap: {thisCapacity} / Avail: {thisCapacity - reservations.length} / Sold: {reservations.length}
      </div>)
    else return ''
  }

  const shortName = (locationName) => {
    if (locationName) return locationName = locationName.split('- ')[1]
  }

  const city = (locationName) => {
    if (locationName) return locationName = locationName.split('- ')[0]
  }

  const resetStuff = () => {
    const searchBar = document.getElementById('search')
    const adminList = document.getElementById('adminList')
    searchBar.value = ''
    adminList.scrollTop = 0
  }

  const calcHeightVal = () => {
    let header = document.getElementsByClassName('Header')[0]
    var styles = window.getComputedStyle(header);
    var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

    let totalHeight = Math.ceil(header.offsetHeight + margin)
    const newHeight = window.innerHeight - totalHeight
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
              <button type="button" className="btn btn-outline-light" onClick={e=>{resetStuff(); toggleProperty(previousProperty)}}>Back</button>
            </div>
            <div className="col-9 mb-3" >
              <form className="form-inline float-right">
                <input 
                className={"form-control search-bar"} 
                onChange={searchItems} 
                type="search" 
                placeholder="Search..." 
                aria-label="Search" 
                style={{display: displaySearch}}
                id="search" ></input>
              </form>
            </div>
          </div>
          <ul className="list-group adminlist" id="adminList" style={{height: '100%'}}>
            <div className={displayList === 'ShowList' ? '' : 'hidden'}>
              <AdminShowList
                filterString={filterString}
                makeSelection={makeSelection}
                resetStuff={resetStuff}
                shows={shows}
                toggleProperty={toggleProperty}
              />
            </div>
            <div className={displayList === 'PickupsList' ? '' : 'hidden'}>
              <AdminPickupsList
                filterString={filterString}
                makeSelection={makeSelection}
                theseLocations={theseLocations}
                resetStuff={resetStuff}
              />
            </div>
          </ul>
        </div>
            <div className={displayList === 'AdminEditPanel' ? '' : 'hidden'}>
              <AdminEditPanel
                eventId={eventId}
                displayAdminPanel={displayAdminPanel}
                filterString={filterString}
                getReservations={getReservations}
                displayList={displayList}
                pickupLocations={pickupLocations}
                pickupLocationId={pickupLocationId}
                pickupParties={pickupParties}
                makeSelection={makeSelection}
                reservations={reservations}
                searchItems={searchItems}
                shows={shows}
                thisPickupParty={thisPickupParty}
                theseParties={theseParties}
                theseLocations={theseLocations}
                thisCapacity={thisCapacity}
                thisLocation={thisLocationName}
                thisShow={thisShow}
                thisDate={thisDate}
                toggleProperty={toggleProperty}
              />
            </div>
      </div>
    </div>
  )

}

export default AdminEdit
