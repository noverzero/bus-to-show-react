import React from 'react'
import '../../../App.css';
import AdminPickupsList from './AdminPickupsList'
import AdminShowList from './AdminShowList'
import AdminEditPanel from './AdminEditPanel'
import AdminReservationsList from './AdminReservationsList'
import AdminAddShowForm from './AdminAddShowForm'


const AdminEdit = (props) => {
  let { cancelPrompt, cancelPromptId, updateReservation, updateReservationName, displayAdminPanel, displayList, editPickupParty, eventId, filterString, getReservations, makeSelection, pickupLocationId, pickupLocations, pickupParties, reservations, searchItems, shows, toggleProperty, theseParties, theseLocations, thisCapacity, thisLocation, thisPickupParty, thisShow } = props

  const newCapacity = React.createRef()
  const newPrice = React.createRef()
  const newLoadTime = React.createRef()
  const newDepartureTime = React.createRef()



  let thisDate, thisHeadliner, thisLocationName

  const previousProperty = (
    displayList === 'ShowList' ? 'displayAdminPanel' :
    displayList === 'PickupsList' ? 'ShowList' :
    displayList === 'AdminEditPanel' ? 'PickupsList' :
    displayList === 'ReservationsList' ? 'AdminEditPanel' :
    displayList === 'displayAddShowForm' ? 'ShowList':
    null
  )
  console.log('previousProperty: ', previousProperty)

  const displaySearch = (
    displayList === 'AdminEditPanel' ?
    "none" :
    ""
  )

  const headerLabel = (displayList) => {
    let activeReservations = reservations.filter(rezzy=>rezzy.status < 3)
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
    else if (displayList === 'AdminEditPanel' || displayList === 'EditReservationsList'  ) return (
      <div>Admin Panel<br/>
      {thisDate} - {thisHeadliner}<br />
        {city(thisLocationName)} - {shortName(thisLocationName)}<br/>
        Cap: {thisCapacity} / Avail: {thisCapacity - activeReservations.length} / Active: {activeReservations.length}
      </div>)
    else if (displayList === 'ReservationsList') return (
      <div>Cancel a Reservation<br/>
      **Please verify email address before canceling a reservation**
      </div>
    )
    else if (displayList === 'displayAddShowForm') return (
      <div>Add a Show<br/>
      **Please verify that show does not already exist before adding it**
      </div>
    )
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

    if(newCapacity.current) newCapacity.current.value = null
    if(newPrice.current) newPrice.current.value = null
    if(newDepartureTime.current) newDepartureTime.current.value = null
    if(newLoadTime.current) newLoadTime.current.value = null
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
            <div className="col-1 mb-3">
              <div
                onClick={props.addShowClick}
              >
                <i className="fas fa-plus-circle"></i>
              </div>
            </div>
            <div className="col-8 mb-3" >
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
            <div className={displayList === 'ReservationsList' ? '' : 'hidden'}>
              <AdminReservationsList
                filterString={filterString}
                reservations={reservations}
                updateReservation={updateReservation}
                updateReservationName={updateReservationName}
                cancelPrompt={cancelPrompt}
                cancelPromptId={cancelPromptId}
                displayNameChange={props.displayNameChange}
                openNameChangeForm={props.openNameChangeForm}
                changeName={props.changeName}
                displayVerifyNameChangePrompt={props.displayVerifyNameChangePrompt}
                toggleVerifyNameChangePrompt={props.toggleVerifyNameChangePrompt}
              />
            </div>
            <div className={displayList === 'displayAddShowForm' ? '' : 'hidden'}>
              <AdminAddShowForm
                pickupLocations={pickupLocations}
                dropdownTimes={props.dropdownTimes}
              />
            </div>
          </ul>
        </div>
            <div className={displayList === 'AdminEditPanel' ? '' : 'hidden'}>
              <AdminEditPanel
                displayAdminPanel={displayAdminPanel}
                displayList={displayList}
                editPickupParty={editPickupParty}
                eventId={eventId}
                filterString={filterString}
                getReservations={getReservations}
                makeSelection={makeSelection}
                newCapacity={newCapacity}
                newPrice={newPrice}
                newLoadTime={newLoadTime}
                newDepartureTime={newDepartureTime}
                pickupLocations={pickupLocations}
                pickupLocationId={pickupLocationId}
                pickupParties={pickupParties}
                reservations={reservations}
                resetStuff={resetStuff}
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
