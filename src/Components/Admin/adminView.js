import React from 'react'
import '../../App.css';
import UserCheckin from './userCheckin'
import AdminEdit from './Edit/AdminEdit'

 const fetchUrl = `http://localhost:3000`
 //const fetchUrl = `https://bts-test-backend.herokuapp.com`
 //const fetchUrl = `https://innocuous-junior.herokuapp.com`

class AdminView extends React.Component {

  state = {
    cancelPromptId: null,
    displayAdminPanel: false,
    displayAdminReservationsList: false,
    displayUserCheckin: false,
    displayList: 'ShowList',
    displayNameChange: 0,
    displayVerifyNameChangePrompt: 0,
    dropdownTimes: [],
    eventId: null,
    filterString: '',
    newFirst: null,
    newLast: null,
    pickupLocationId: null,
    pickupLocations: null,
    pickupParties: null,
    reservations: [],
    thisShow: null,
    thisPickupParty: null,
    theseParties: [],
    theseLocations: []
  }

  componentDidMount = async() => {
    const pickupParties = await this.getPickupParties()
    const dropdownTimes = await this.populateTimes()
    await this.setState({
      pickupLocations: this.props.pickupLocations,
      pickupParties: pickupParties,
      dropdownTimes: dropdownTimes
    })
    console.log("pickupLocations", this.state.pickupLocations, this.state.dropdownTimes)
  }

// Add Show Feature Functions vvvvvvvv

  addShowClick = event => {
    console.log("addShowClick:: ", event)
    this.toggleProperty("displayAddShowForm")
  }

  populateTimes = () => {
    let hours, minutes, ampm
    let result = []
    let increment = []
    for(let i = 0; i <= 1440; i += 15){
      let time = {}
      increment.push(i)
      hours = Math.floor(i / 60);
      minutes = i % 60;
      if (minutes < 10){
        minutes = '0' + minutes; // adding leading zero
      }
      ampm = hours % 24 < 12 ? 'AM' : 'PM'
      hours = hours % 12
      if (hours === 0){
        hours = 12;
      }
        time.i = i
        time.hours = hours
        time.minutes = minutes
        time.ampm = ampm
        result.push(time)
      }
    
    return result
}

//End Add Show Feature Functions ^^^^^

  getPickupParties = async () => {
    const response = await fetch(`${fetchUrl}/pickup_parties`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
  return result
  }

  getPickupLocations = async () => {
    console.log("getPickupLocations is firing")
  }
  searchItems = event => {
    const newState = { ...this.state }
    newState.filterString = event.target.value
    this.setState({ filterString: newState.filterString })
  }

  toggleProperty = async (property) => {
    console.log("toggleProperty fired", property)
    const newState = {...this.state}
    newState.filterString = ''
    if (property === 'displayUserCheckin') {
    newState.displayUserCheckin = !newState.displayUserCheckin
    newState.displayList = 'ShowList'
    await this.setState(newState)}
    else if (property === 'displayAdminPanel'){
      newState.showsWithResAndCap = await this.getReservationCountsForAllShows()
      newState.displayAdminPanel = !newState.displayAdminPanel
      newState.displayList = 'ShowList'
      await this.setState(newState)
    }
    else if(property === 'displayAddShowForm'){
      newState.displayList = 'displayAddShowForm'
      console.log("displayAddShowForm")
      await this.setState(newState)

    }
    else {
      newState.displayList = property
      await this.setState(newState)
    }
  }

  makeSelection = async (target, targetId, next) => {
    this.setState({filterString: ''})
    const newState = {...this.state}
    newState[target] = targetId
    newState.filterString = ''
    await this.setState(newState)
    this.toggleProperty(next)
    if (next === 'PickupsList') {
      this.findShow(targetId)
      this.findParties(targetId)
    }
    else if (next === 'ReservationsList') {
      this.getReservations()
      this.findPickup(targetId)
      !this.state.displayAdminPanel && this.refreshReservations()
    }
    else if (next === 'AdminEditPanel') {
      this.getReservations()
      this.findPickup(targetId)
    }
  }

  getPickupParty = async () => {
    console.log('getPickupParty')
    const response = await fetch(`${fetchUrl}/pickup_parties/findId`, {
      method: 'PATCH',
      body: JSON.stringify({
        pickupLocationId: this.state.pickupLocationId,
        eventId: this.state.eventId,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const fetchedParty = await response.json()
    return fetchedParty
  }

  fetchReservationsForOneEvent = async(pickupPartyId)=>{
    console.log('fetchReservationsForOneEvent')
    const response = await fetch(`${fetchUrl}/reservations/findOrders`, {
      method: 'PATCH',
      body: JSON.stringify({
        pickupPartiesId: pickupPartyId,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
    return result
  }

  getAllReservations = async()=>{
    const response = await fetch(`${fetchUrl}/reservations/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
    return result
  }

  getReservations = async () => {
    console.log('getting reservations');
    const thisPickupParty = await this.getPickupParty()
    const reservations = await this.fetchReservationsForOneEvent(thisPickupParty.id)
    this.setState({
      reservations,
      thisPickupParty,
      thisCapacity: thisPickupParty.capacity})
    console.log('reservations set');
  }

  refreshReservations = (stop) => {
    if (!stop) {
      let x = 0;
      const reservationsInterval = setInterval(()=>{
        this.getReservations()
        if (++x === 40) {
          clearInterval(reservationsInterval)
        }
      }, 30000)
      this.setState({reservationsInterval})
    }
    else if (stop && this.state.reservationsInterval) {
      clearInterval(this.state.reservationsInterval)
    }

  }

  toggleCheckedIn = async (isCheckedIn, reservation) => {
    let newStatus = isCheckedIn ? 2 : 1
    await fetch(`${fetchUrl}/reservations/${reservation.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: newStatus,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    this.getReservations()
  }

  findShow = (targetId) => {
    let thisShow = this.props.shows.filter(show=>{
      if (show.id === targetId) return show
      else return null
    })[0]
    this.setState({thisShow})
  }

  findParties = (targetId) => {
    this.setState({
      theseParties: [],
      theseLocations: []
    })
    const newState = { ...this.state }
    //find and set to state the parties that match the event Id
    newState.theseParties = newState.pickupParties.filter(party =>party.eventId === targetId )

    this.setState({
      theseParties: newState.theseParties
    })
    //find and set to state the pickup Location Object for ONLY the locations that correspond to this Event (aka theseParties).
    this.state.pickupLocations.forEach(location =>{
      newState.theseParties.forEach(party =>{
        if(location.id === party.pickupLocationId){
          newState.theseLocations.push(location)
        }
      })
    })
    this.setState({
      theseLocations: newState.theseLocations
    })
  }

  findPickup = async (targetId) => {
    let thisPickupParty = await this.getPickupParty()
    let thisLocation = this.state.pickupLocations.filter(location=>
      (location.id === targetId) && location
    )[0]
    this.setState({thisPickupParty, thisLocation})
  }

  getReservationCountsForAllShows = async () => {
    console.log('getting all reservations');
    let showsArr = this.props.shows.map(show=>{
      const pickupParties = this.state.pickupParties.filter(pickupParty=>{
        return pickupParty.eventId === show.id
      })
      return {id: show.id, date: show.date, headliner: show.headliner, venue: show.venue, pickupParties}
    })
    const allReservationsPromise = await this.getAllReservations()
    let allReservations = await allReservationsPromise
    let activeReservations = allReservations.filter(rezzy=>rezzy.status < 3)
    let activeReservationIds = activeReservations.map(rezzy=>rezzy.pickupPartiesId)
    showsArr = showsArr.map(show=>{
      let reservationsCount = show.pickupParties.map(party=>{
        const reservationsForOne = activeReservationIds.filter(rezzy=>{
          return rezzy === party.id
        })
        return reservationsForOne.length
      })
      reservationsCount = reservationsCount.length > 0 ?
        reservationsCount.reduce((sum, current)=>{
          return sum + current
        })
      :
        0
      let totalCapacity = show.pickupParties.map(party=>party.capacity)
      totalCapacity = totalCapacity.length > 0 ?
        totalCapacity.reduce((sum, cur)=>{return sum + cur})
      :
        0
      return {...show, reservations: reservationsCount, totalCapacity}
    })
    return showsArr
  }

  editPickupParty = async (pickupPartyId, field, value) => {
    console.log('editPickupParty value ' , value)
    if (!pickupPartyId || !field || !value) {
      return null
    }
    else {
      value = (field === 'partyPrice' || field === 'capacity' ? ~~value : value)
      const newState = {...this.state}
      const currentPickupParty = newState.thisPickupParty
      currentPickupParty[field] = value
      const newBody = {[field]: value}
      console.log('body in patch and typeof', newBody, typeof newBody[field]);
      const response = await fetch(`${fetchUrl}/pickup_parties/${pickupPartyId}`, {
        method: 'PATCH',
        body: JSON.stringify(newBody),
        headers: {
            'Content-Type': 'application/json'
          }
        })
      const partyResponse = await response.json()
      newState.thisPickupParty = partyResponse
      newState.thisCapacity = partyResponse.capacity
      this.setState({
        thisPickupParty: newState.thisPickupParty,
        thisCapacity: newState.thisCapacity
      })
      // return partyResponse
    }
  }

  openNameChangeForm = (e, reservationId) =>{
    console.log('openNameChangeForm e.target', e.target)
    const newState = {...this.state}
    newState.displayNameChange = reservationId
    newState.newFirst = ''
    newState.newLast = ''
    this.setState({
      displayNameChange: newState.displayNameChange,
      newFirst: newState.newFirst,
      newLast: newState.newLast
    })
  }

newName = (id, first, last) => {
  this.reservationId = id
  this.firstName = first
  this.lastName = last
 }


 changeName = (event, reservationId)=>{
    let newValue
    let newState = {...this.state}
    let newNewFirst = newState.newFirst
    let newNewLast = newState.newLast


    switch (event.target.id) {
      case "willCallFirstName":
        newValue = event.target.value.replace('', '')
        event.target.value = newValue
        console.log('willCallFirstName', newValue)
        newNewFirst = newValue
        this.setState({
          newFirst: newNewFirst
        })

        break;
      case "willCallLastName":
        newValue = event.target.value.replace('', '')
        event.target.value = newValue
        console.log('willCallLastName', newValue)
        newNewLast = newValue
        this.setState({
          newLast: newNewLast
        })
        break;
      case "orderedByEmail":
        newValue = event.target.value.replace(/[^A-Za-z:]/g, '')
        event.target.value = newValue
        break;
      default:
        break;
    }
    console.log('newValue in changeName::: ', newValue, 'newNewFirst', this.state.newFirst, 'newNewLast', this.state.newLast)
  }

  updateReservationName = async (reservationId) => {
      const newState = {...this.state}
      newState.displayNameChange = 0
      this.setState({displayNameChange: newState.displayNameChange})

      const newBody = {}
      if (this.state.newFirst){
        newBody.willCallFirstName = this.state.newFirst
      }
      if (this.state.newLast){
        newBody.willCallLastName = this.state.newLast
      }
      console.log('body in patch and typeof', newBody, typeof newBody);
      await fetch(`${fetchUrl}/reservations/${reservationId}`, {
        method: 'PATCH',
        body: JSON.stringify(newBody),
        headers: {
            'Content-Type': 'application/json'
          }
        })
      this.getReservations()
  }

  toggleVerifyNameChangePrompt = (reservationId) => {
    const newState = {...this.state}
    newState.displayVerifyNameChangePrompt = reservationId
    this.setState({displayVerifyNameChangePrompt: newState.displayVerifyNameChangePrompt})

  }

  updateReservation = async (reservation, status) => {
    status = ~~status
    this.cancelPrompt(reservation.id, false)
    await fetch(`${fetchUrl}/reservations/${reservation.id}`, {
      method: 'PATCH',
      body: JSON.stringify({status}),
      headers: {
          'Content-Type': 'application/json'
        }
      })
    this.getReservations()
  }

  cancelPrompt = async(reservationId, prompt) => {
    console.log('cancelPrompt', prompt)
    prompt && await this.setState({cancelPromptId: reservationId})
    !prompt && await this.setState({cancelPromptId: null})
  }

  render (){
    let { isStaff, isAdmin, isDriver } = this.props.userDetails
    return(
      <div className="container AdminView" style={{ Height: '100%' }}>
        {this.state.displayAdminPanel || this.state.displayUserCheckin
        ?
          <div>
            {this.state.displayAdminPanel &&
              <AdminEdit
              addShowClick={this.addShowClick}
              updateReservation={this.updateReservation}
              cancelPrompt={this.cancelPrompt}
              cancelPromptId={this.state.cancelPromptId}
              changeName={this.changeName}
              displayAdminPanel={this.state.displayAdminPanel}
              displayAdminReservationsList={this.state.displayAdminReservationsList}
              displayNameChange={this.state.displayNameChange}
              displayVerifyNameChangePrompt={this.state.displayVerifyNameChangePrompt}
              dropdownTimes={this.state.dropdownTimes}
              openNameChangeForm={this.openNameChangeForm}
              eventId={this.state.eventId}
              editPickupParty={this.editPickupParty}
              updateReservationName={this.updateReservationName}
              filterString={this.state.filterString}
              getPickupParty={this.getPickupParty}
              getReservations={this.getReservations}
              displayList={this.state.displayList}
              pickupLocations={this.state.pickupLocations}
              pickupLocationId={this.state.pickupLocationId}
              pickupParties={this.state.pickupParties}
              makeSelection={this.makeSelection}
              newWillCallFirst={this.state.newWillCallFirst}
              newWillCallLast={this.state.newWillCallLast}
              reservations={this.state.reservations}
              searchItems={this.searchItems}
              shows={this.state.showsWithResAndCap}
              thisCapacity={this.state.thisCapacity}
              thisShow={this.state.thisShow}
              thisPickupParty={this.state.thisPickupParty}
              theseParties={this.state.theseParties}
              theseLocations={this.state.theseLocations}
              thisLocation={this.state.thisLocation}
              toggleProperty={this.toggleProperty}
              toggleVerifyNameChangePrompt={this.toggleVerifyNameChangePrompt}
              />
            }
            {this.state.displayUserCheckin &&
              <UserCheckin
                eventId={this.state.eventId}
                filterString={this.state.filterString}
                getReservations={this.getReservations}
                displayList={this.state.displayList}
                displayUserCheckin={this.state.displayUserCheckin}
                pickupLocations={this.state.pickupLocations}
                pickupLocationId={this.state.pickupLocationId}
                pickupParties={this.state.pickupParties}
                makeSelection={this.makeSelection}
                reservations={this.state.reservations}
                searchItems={this.searchItems}
                shows={this.props.shows}
                stopRefreshing={this.refreshReservations}
                thisShow={this.state.thisShow}
                thisPickup={this.state.thisPickupParty}
                theseParties={this.state.theseParties}
                theseLocations={this.state.theseLocations}
                thisCapacity={this.state.thisCapacity}
                thisLocation={this.state.thisLocation}
                toggleCheckedIn={this.toggleCheckedIn}
                toggleProperty={this.toggleProperty}
              />
            }
        </div>
      :
          <div className="col mt-2 adminButtons">
            {isAdmin &&
              <button type="button" className="btn bts-orange-bg btn-lg btn-block my-4" onClick={e=>this.toggleProperty('displayAdminPanel')}>Admin Panel</button>
            }
            {isDriver &&
              <button type="button" className="btn bts-orange-bg btn-lg btn-block my-4" onClick={e=>console.log('also click')}>Driver Shifts</button>
            }
            {isStaff &&
              <button type="button" className="btn bts-orange-bg btn-lg btn-block my-4" onClick={e=>this.toggleProperty('displayUserCheckin')}>Rider Check-In</button>
            }
          </div>
      }
      </div>
    )
  }
}

export default AdminView
