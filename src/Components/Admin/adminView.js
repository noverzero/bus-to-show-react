import React from 'react'
import '../../App.css';
import UserCheckin from './userCheckin'
import AdminEdit from './Edit/AdminEdit'

 //const fetchUrl = `http://localhost:3000`
 //const fetchUrl = `https://bts-test-backend.herokuapp.com`
 const fetchUrl = `https://innocuous-junior.herokuapp.com`

 const d = new Date()
 const year = d.getFullYear().toString()

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
    showToAdd: {
      id: 0,
      date:{
        year: year,
        month: '01',
        day: '01'
      },
      venue: 'Red Rocks Amphitheatre',
      showStartTime: '00:00:00',
      locations: [],
      departureTimes: {},
      locationPrices: {}
    },
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
    console.log("addShowClick:: ")
    this.toggleProperty("displayAddShowForm")
  }

  populateTimes = () => {
    let hours, minutes, ampm
    let result = []
    let increment = []
    for(let i = 0; i <= 1425; i += 15){
      let time = {}
      increment.push(i)
      hours = Math.floor(i / 60);
      minutes = i % 60;
      if (minutes < 10){
        minutes = '0' + minutes; // adding leading zero
      }
      // ampm = hours % 24 < 12 ? 'AM' : 'PM'
      // hours = hours % 12
      // if (hours === 0){
      //   hours = 12;
      // }
        time.i = i
        time.hours = hours
        time.minutes = minutes
        //time.ampm = ampm
        result.push(time)
      }
    
    return result
  }

  handleAddShowChange =(event, location)=>{
    console.log('handle change inside add show form', event.target.id, event.target.value)
    let newState = { ...this.state }
    let newValue
    switch (event.target.id) {
      case "year":
        newValue = event.target.value
        event.target.value = newValue
        newState.showToAdd.date.year = newValue
        console.log("year newValue: ", newValue)
        break;
      case "month":
        newValue = event.target.value
        event.target.value = newValue
        newState.showToAdd.date.month = newValue
        console.log("month newValue: ", newValue)
        break;
      case "day":
        newValue = event.target.value
        event.target.value = newValue
        newState.showToAdd.date.day = newValue
        console.log("day newValue: ", newValue)
        break;
      case "headliner":
        newValue = event.target.value
        event.target.value = newValue
        newState.showToAdd.headliner = newValue
        console.log("headliner newValue: ", newValue)
        break;
      case "support1":
        newValue = event.target.value
        event.target.value = newValue
        newState.showToAdd.support1 = newValue
        console.log("support1 newValue: ", newValue)
        break;
      case "support2":
        newValue = event.target.value
        event.target.value = newValue
        newState.showToAdd.support2 = newValue
        console.log("support2 newValue: ", newValue)
        break;
      case "support3":
        newValue = event.target.value
        event.target.value = newValue
        newState.showToAdd.support3 = newValue
        console.log("support3 newValue: ", newValue)
        break;
      case "headlinerBio":
        newValue = event.target.value
        event.target.value = newValue
        newState.showToAdd.headlinerBio = newValue
        console.log("headlinerBio newValue: ", newValue)
        break;
      case "headlinerImgLink":
        newValue = event.target.value
        event.target.value = newValue
        newState.showToAdd.headlinerImgLink = newValue
        console.log("headlinerImgLink newValue: ", newValue)
        break;
      case "venue":
        newValue = event.target.value
        event.target.value = newValue
        newState.showToAdd.venue = newValue
        console.log("venue newValue: ", newValue)
        break;
      case "showStartTime":
        newValue = event.target.value
        event.target.value = newValue
        newState.showToAdd.showStartTime = `${newValue}:00`
        console.log("showStartTime newValue: ", newValue)
        break;
      case `checkBox${location.id}`:
        newValue = location.id
        if(newState.showToAdd.locations.includes(newValue)){
          const result = newState.showToAdd.locations.filter((location) => location !== newValue)
          newState.showToAdd.locations = result
          console.log('genius! ', result)
        } else {
          newState.showToAdd.locations.push(newValue)
        }
        break;
      case `departureTime${location.id}`:
        newValue = event.target.value
        event.target.value = newValue
        newState.showToAdd.departureTimes[location.id] = `${newValue}:00`
        console.log(`departureTime${location.id} newValue: `, newValue)
        break;
      case `price${location.id}`:
        newValue = event.target.value
        event.target.value = newValue
        newState.showToAdd.locationPrices[location.id] = newValue
        console.log(`price${location.id} newValue`, newValue)
        break;
      default:
        break;
    }
    this.setState({showToAdd: newState.showToAdd})
    console.log('this.state.showToAdd', this.state.showToAdd)
    
  }

  handleAddShowSubmit = async (e) => {
    console.log('handleAddShowSubmit clicked', e)
    //Validate Form
    //Check DB to see if show exists at Venue on Date
        //if yes, warn before allowing or prevent with alternative suggestion
        //if no, continue
    //Post Show
    await this.postShow(this.state.showToAdd)
    console.log('this.state.showToAdd.id: ', this.state.showToAdd.id)
    //Post pickup Parties
    await this.postPickupParties(this.state.showToAdd)
    this.resetAfterAddShow()
    
  }

  resetAfterAddShow = async () => {
    let newState = {...this.state}
    newState.showToAdd = {
      id: 0,
      date:{
        year: year,
        month: '01',
        day: '01'
      },
      venue: 'Red Rocks Amphitheatre',
      showStartTime: '00:00:00',
      locations: [],
      departureTimes: {},
      locationPrices: {}
    }
    newState.displayList = 'ShowList'
    this.setState({
      displayList: newState.displayList,
      showToAdd: newState.showToAdd
    })
  }

  postPickupParties = async (showToAdd) => {
    const locations = showToAdd.locations
    await locations.forEach(async location => {
      const party = {
        eventId: showToAdd.id,
        pickupLocationId: location,
        lastBusDepartureTime: showToAdd.departureTimes[location],
        firstBusLoadTime: '',
        partyPrice: showToAdd.locationPrices[location]
      }
      const response = await fetch(`${fetchUrl}/pickup_parties`, {
        method: 'POST',
        body: JSON.stringify(party),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      console.log('response from postPickupParties', json)
      return json
    })

  }

  postShow = async (showToAdd) => {
    const newState = { ...this.state }
    let show = {
      date: `${showToAdd.date.month}/${showToAdd.date.day}/${showToAdd.date.year}`,
      startTime: showToAdd.showStartTime,
      venue: showToAdd.venue,
      headliner: showToAdd.headliner,
      support1: showToAdd.support1,
      support2: showToAdd.support2, 
      support3: showToAdd.support3, 
      headlinerImgLink: showToAdd.headlinerImgLink,
      headlinerBio: showToAdd.headlinerBio, 
      external: showToAdd.external
    } 

    const response = await fetch(`${fetchUrl}/events`, {
    method: 'POST',
    body: JSON.stringify(show),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()
  console.log('response from postShow', json)
  newState.showToAdd.id = json.id
  this.setState({showToAdd: newState.showToAdd})
  return json
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
              handleAddShowChange={this.handleAddShowChange}
              handleAddShowSubmit={this.handleAddShowSubmit}
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
            {isStaff || isAdmin &&
              <button type="button" className="btn bts-orange-bg btn-lg btn-block my-4" onClick={e=>this.toggleProperty('displayUserCheckin')}>Rider Check-In</button>
            }
          </div>
      }
      </div>
    )
  }
}

export default AdminView
