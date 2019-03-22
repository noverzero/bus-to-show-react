import React from 'react'
import '../../App.css';
import UserCheckin from './userCheckin'
import PickupsList from './PickupsList';
import ReservationsList from './ReservationsList';


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
  // { shows, pickupLocations, searchItems, userDetails } = this.props

  componentDidMount(){
    console.log('mounted')
    this.setState({pickupLocations: this.props.pickupLocations})
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
    if (next === 'PickupsList') {
      this.findShow(targetId)
    }
    else if (next === 'ReservationsList') {
      this.getReservations()
      this.findPickup(targetId)
      this.refreshReservations()
    }
  }

  getReservations = async () => {
    console.log('getting reservations');
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
      this.setState({
        reservations, 
        thisCapacity: thisPickupParty.capacity})
    })
  }

  refreshReservations = (stop) => {
    if (!stop) {
      console.log('getting')
      let x = 0;
      const reservationsInterval = setInterval(()=>{
        this.getReservations()
        if (++x === 20) {
          console.log('clear')
          clearInterval(reservationsInterval)
        }  
      }, 5000)
      this.setState({reservationsInterval})
    }
    else if (stop && this.state.reservationsInterval) {
      console.log('stopping')
      clearInterval(this.state.reservationsInterval)
    }

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
    let { isStaff, isAdmin, isDriver } = this.props.userDetails

    const calcHeightVal = () => {
      let header = document.getElementsByClassName('Header')[0]
      var styles = window.getComputedStyle(header);
      var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

      let totalHeight = Math.ceil(header.offsetHeight + margin)
      // console.log(totalHeight)
      // console.log(window.innerHeight);
      const newHeight = window.innerHeight - totalHeight
      // console.log(newHeight);
      return `${newHeight}px`
    }

    return(
      <div className="container AdminView" style={{ Height: calcHeightVal() }}>
        {this.state.displayUserCheckin ? 
          <UserCheckin 
            getReservations={this.getReservations}
            thisShow={this.state.thisShow}
            thisPickup={this.state.thisPickup}
            thisCapacity={this.state.thisCapacity}
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
            toggleCheckedIn={this.toggleCheckedIn}
            stopRefreshing={this.refreshReservations} /> 
          : 
          <div className="col mt-2 adminButtons">
            {isAdmin ? 
              <button type="button" className="btn bts-orange-bg btn-lg btn-block my-4" onClick={e=>console.log('also click also')}>Admin Panel</button> 
            : ''}
            {isDriver ? 
              <button type="button" className="btn bts-orange-bg btn-lg btn-block my-4" onClick={e=>console.log('also click')}>Driver Shifts</button> 
            : ''}
            {isStaff ? 
              <button type="button" className="btn bts-orange-bg btn-lg btn-block my-4" onClick={e=>this.toggleProperty('displayUserCheckin')}>Rider Check-In</button> 
            : ''}
          </div>
        }
      </div>
    )
  }
}

export default AdminView