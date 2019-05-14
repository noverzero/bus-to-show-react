import React from 'react'
import '../../App.css';
import UserCheckin from './userCheckin'
import AdminEdit from './Edit/AdminEdit'

// const fetchUrl = `http://localhost:3000`
// const fetchUrl = `https://bts-test-backend.herokuapp.com`
const fetchUrl = `https://innocuous-junior.herokuapp.com`

class AdminView extends React.Component {
  //child of App.js

  state = {
    displayUserCheckin: false,
    displayList: 'ShowList',
    eventId: null,
    filterString: '',
    pickupLocationId: null,
    pickupLocations: null,
    pickupParties: null,
    reservations: [],
    thisShow: null,
    thisPickup: null,
    theseParties: [],
    theseLocations: []
  }

  componentDidMount = async() => {
    const pickupParties = await this.getPickupParties()


    await this.setState({
      pickupLocations: this.props.pickupLocations,
      pickupParties: pickupParties,
    })
  }
  
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
    let newState = {...this.state}
    newState.filterString = ''
    if (property === 'displayUserCheckin') {
    newState.displayUserCheckin = !newState.displayUserCheckin
    newState.displayList = 'ShowList'
    await this.setState(newState)}
    else if (property === 'displayAdminPanel'){
      newState.displayAdminPanel = true
      await this.setState(newState)
    }
    else {
      newState.displayList = property
      await this.setState(newState)
    }
  }

  makeSelection = async (target, targetId, next) => {
    this.setState({filterString: ''})
    let newState = {...this.state}
    newState[target] = targetId
    newState.filterString = ''
    await this.setState(newState)
    this.toggleProperty(next)
    if (next === 'PickupsList') {
      //targetId === eventId
      this.findShow(targetId)
      this.findParties(targetId)
    }
    else if (next === 'ReservationsList') {
      this.getReservations()
      this.findPickup(targetId)
      this.refreshReservations()
    }
  }

  getReservations = async () => {
    await fetch(`${fetchUrl}/pickup_parties/findId`, {
      method: 'PATCH',
      body: JSON.stringify({
        pickupLocationId: this.state.pickupLocationId,
        eventId: this.state.eventId,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (response) =>  {
      const thisPickupParty = await response.json()
      const findReservations = await fetch(`${fetchUrl}/reservations/findOrders`, {
        method: 'PATCH',
        body: JSON.stringify({
          pickupPartiesId: thisPickupParty.id,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const reservations = await findReservations.json()
      this.setState({
        reservations,
        thisCapacity: thisPickupParty.capacity})
    })
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


  findPickup = (targetId) => {
    let thisPickup = this.state.pickupParties.filter(pickup=>{
      if (pickup.pickupLocationId === targetId) return pickup
      else return null
    })[0]
    let thisLocation = this.state.pickupLocations.filter(location=>
      (location.id === targetId) && location
    )[0]
    this.setState({thisPickup, thisLocation})
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
                thisPickup={this.state.thisPickup}
                theseParties={this.state.theseParties}
                theseLocations={this.state.theseLocations}
                thisCapacity={this.state.thisCapacity}
                toggleCheckedIn={this.toggleCheckedIn}
                toggleProperty={this.toggleProperty}
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
                thisPickup={this.state.thisPickup}
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
