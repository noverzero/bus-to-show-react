import React from 'react'
import '../../App.css';
import UserCheckin from './userCheckin'
import PickupsList from './PickupsList';


class AdminView extends React.Component {
  
  state = {
    displayUserCheckin: false,
    displayList: 'ShowList',
    eventId: null,
    filterString: '',
    pickupLocationId: null,
    pickupLocations: null,
    reservations: [],
    thisShow: null,
    thisPickup: null

  }
  // { shows, pickupLocations, searchItems } = this.props
  componentDidMount(){
    let pickupLocations = this.props.pickupLocations.map(location => {
      location.locationName = location.locationName.split('- ')[1]
      location.streetAddress = location.streetAddress.split(', CO')[0]
      return location
    })
    
    this.setState({pickupLocations})
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
    if (next === 'PickupsList') this.findShow(targetId)
    else if (next === 'ReservationsList') this.getReservations(); this.findPickup(targetId)
  }

  getReservations = async () => {
    await fetch(`http://${process.env.REACT_APP_API_URL}/pickup_parties/findId`, {
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
      const findReservations = await fetch(`http://${process.env.REACT_APP_API_URL}/reservations/findOrders`, {
        method: 'PATCH',
        body: JSON.stringify({
          pickupPartiesId: thisPickupParty.id,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const reservations = await findReservations.json()
      this.setState({reservations})
    })
    if (this.state.displayList === "ReservationsList") setTimeout(this.getReservations, 30000)
  }

  toggleCheckedIn = async (isCheckedIn, reservation) => {
    let newStatus = isCheckedIn ? 2 : 1
    await fetch(`http://${process.env.REACT_APP_API_URL}/reservations/${reservation.id}`, {
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

  findPickup = (targetId) => {
    let thisPickup = this.props.pickupLocations.filter(pickup=>{
      if (pickup.id === targetId) return pickup
      else return null
    })[0]
    this.setState({thisPickup})
  }

  render (){

    return(
      <div className="container AdminView">
        {this.state.displayUserCheckin ? 
          <UserCheckin 
            thisShow={this.state.thisShow}
            thisPickup={this.state.thisPickup}
            eventId={this.state.eventId}  
            filterString={this.state.filterString}
            toggleProperty={this.toggleProperty}
            makeSelection={this.makeSelection}
            displayList={this.state.displayList}
            displayUserCheckin={this.state.displayUserCheckin}
            pickupLocations={this.state.pickupLocations}
            pickupLocationId={this.state.pickupLocationId}
            reservations={this.state.reservations}
            shows={this.props.shows}
            searchItems={this.searchItems} 
            toggleCheckedIn={this.toggleCheckedIn} /> 
          : 
          <div className="col mt-2 adminButtons">
            <button type="button" className="btn bts-orange-bg btn-lg btn-block" onClick={e=>this.toggleProperty('displayUserCheckin')}>Rider Check-In</button>
            <button type="button" className="btn bts-orange-bg btn-lg btn-block" onClick={e=>console.log('also click', this.state)}>Admin Options</button>
          </div>
        }
      </div>
    )
  }
}

export default AdminView