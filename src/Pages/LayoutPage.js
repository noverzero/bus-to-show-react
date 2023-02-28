// Packages
import React, { Component } from 'react'
import Validator from 'validator'
import MediaQuery from 'react-responsive'
import moment from 'moment'
import { sha256 } from 'js-sha256';



// Styling
import '../App.css';

// Components
import AdminView from '../Components/Admin/adminView'
import Aboutus from '../Components/Aboutus/Aboutus'
import Header from '../Components/Header'
import ShowList from '../Components/Shows/ShowList'
import LoginView from '../Components/LoginView/LoginView'
import Loading from '../Components/Loading'
import SponsorBox from '../Components/SponsorBox'
import DetailCartView from '../Components/DetailCartView'
import BannerRotator from '../Components/BannerRotator'
import NavButtons from '../Components/NavButtons'
import ReactGA from 'react-ga';
import env from 'react-dotenv'

ReactGA.initialize('UA-17782248-2');
ReactGA.pageview('/app');

const fetchUrl = `${process.env.REACT_APP_API_URL}`

class LayoutPage extends Component {
  // Please keep sorted alphabetically so we don't duplicate keys :) Thanks!
  state = {
    adminView: false,
    afterDiscountObj: {
      totalSavings: 0,
      discountCodeId: 0,
      totalPriceAfterDiscount: 0
    },
    artistDescription: null,
    artistIcon: false,
    assignedParties: [],
    basePrice: null,
    cartToSend: {
      eventId: null,
      pickupLocationId: null,
      firstName: '',
      lastName: '',
      email: '',
      willCallFirstName: '',
      willCallLastName: '',
      ticketQuantity: 0,
      totalCost: 0,
      discountCode: null,
      userId: null,
    },
    checked: false,
    confirmRemove: false,
    dateIcon: true,
    discountApplied: false,
    displayAboutus: false,
    displayAddBtn: false,
    displayBios: false,
    displayBorder: false,
    displayBus: true,
    displayCart: false,
    displayConfirmRemove: false,
    displayDetailCartView: false,
    displayEditReservation: false,
    displayEditSuccess: false,
    displayExternalShowDetails: false,
    displayFuture: true,
    displayPast: false,
    displayLoadingScreen: true,
    displayLoginView: false,
    displayReservationDetail: false,
    displayShow: null,
    displayShowDetails: false,
    displayShowList: true,
    displayStripe: false,
    displaySuccess: false,
    displayViewCartBtn: false,
    displayWarning: false,
    displayQuantity: false,
    displayReservations: false,
    displayUserReservationSummary: false,
    displayTimes: false,
    facebook: {
      isLoggedIn: false,
      userID: '',
      name: '',
      email:'',
      picture:'',
      userDetails: {},
    },
    filterString: '',
    firstBusLoad: null,
    googleResponse: null,
    inCart: [],
    invalidFields: {},
    partyPrice: 0,
    pickupLocationId: null,
    pickupPartyId: null,
    purchaseFailed: false,
    purchasePending: false,
    purchaseSuccessful: false,
    registerResponse: {},
    reservationDetail: null,
    reservationToEditId: null,
    reservationEditsToSend: [],
    showBios: false,
    showForgotForm: false,
    showRegisterForm: false,
    spotifyResponse: null,
    startTimer: false,
    ticketTimer: null,
    ticketsAvailable: [],
    ticketQuantity: null,
    totalCost: 0,
    userDetails: {},
    userReservations: [],
    validated: false,
    validatedElements: {
      fName: null,
      lName: null,
      email: null,
      wCFName: null,
      wCLName: null
    },
    oldStuff: [],
    willCallEdits: {},
  }

  async componentDidMount() {
    await this.getVerify()
    await this.checkAuth()
 
    const response = await fetch(`${fetchUrl}/events`)
    let allShows = await response.json()

    //filters out expired shows and shows that don't meet criteria, and shows that are denied.
    const dateCheck = (show) => {
      const showDate = Date.parse(show.date)
      const today = new Date()
      const startDate = today.setDate(today.getDate() - 1)
      if (showDate < startDate) {
        return false
      } else {
        return true
      }
    }
    const currentShows = allShows.filter(dateCheck)
    const userShows = currentShows.filter(show => show.meetsCriteria === true && show.isDenied === false).sort((show1, show2) => {
      const a = new Date(show1.date)
      const b = new Date(show2.date)
      return a - b
    })

    allShows = allShows.sort((show1, show2) => {
      const a = new Date(show1.date)
      const b = new Date(show2.date)
      return a - b
    })

    const pickups = await fetch(`${fetchUrl}/pickup_locations`)
    const pickupLocations = await pickups.json()
    this.setState({ pickupLocations, allShows, userShows })
  }

  getVerify = async () => {
    const response = await fetch(`${fetchUrl}/api`)
    const json =  await response.json()
    //document.cookie = `token=; expires=Wed, 21 Oct 2015 07:28:00 GMT`
    document.cookie = `token=${json.token}; secure`
  }

  checkAuth = async () => {
    const jwtToken = localStorage.getItem('jwt')
    if(!jwtToken){
      return
    }
    const response = await fetch(`${fetchUrl}/api/secure`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        withCredentials: true
      }
    )
    const userObj =  await response.json()
    if (userObj && userObj.id){
      this.setState({
        ...this.state,
          facebook: {
            ...this.state.facebook,
            isLoggedIn: true,
            userID: userObj.id,
            email:userObj.email,
            userDetails: {
              isAdmin: userObj.isAdmin,
              isStaff: userObj.isStaff
            },
            userDetails:userObj
  
          }
      })
      this.toggleLoggedIn(true)
      this.onLoad()
    } else {
      this.toggleLoggedIn(false)
      this.onLoad()
    }

  }


  //status: over-ridden by onclick event in the "ride with us button" where called in "loading.js"
  onLoad = () => {

    const newState = { ...this.state }
    newState.displayLoadingScreen = false
    this.setState({ displayLoadingScreen: newState.displayLoadingScreen })
  }

  //status: in progress.  where: called in "loading.js".  why: adding interactive animation so that buses fly away on click.
  handleBus = event => {

    if (event.target.id === 'bus1') {
      const newState = { ...this.state }
      newState.displayBus = !newState.displayBus
      this.setState({ displayBus: newState.displayBus })
    }
  }

  getPickupParties = async (eventId) => {
    const response = await fetch(`${fetchUrl}/pickup_parties/findParties`, {
      method: 'PATCH',
      body: JSON.stringify({ eventId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    let result = await response.json()
    result = result.sort( (a, b) => {
      return a.id - b.id
    })
    return result
  }

  refreshPickupParty = async (pickupId) => {
    const response = await fetch(`${fetchUrl}/pickup_parties/${pickupId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
    return result
  }

  //status: active.  where: called in showDetails.  why:  requires selection of location before corresponding times and quantities are displayed.
  selectPickupLocationId = async (event, timer) => {
    console.log('selectPickupLocationId event.target.value' , event.target.value)
    const newState = { ...this.state }
    const oldPickup = parseInt(newState.pickupPartyId)
    if(!timer){
      this.clearTicketsInCart(oldPickup, newState.ticketQuantity)
      newState.ticketQuantity = 0
      this.ticketTimer(false)
      this.setState({ticketQuantity: newState.ticketQuantity})
    }

    newState.pickupPartyId = parseInt(event.target.value)
    if (event.target.value === "Select a Departure Option..."){
      newState.displayQuantity = false
      newState.ticketsAvailable = null
      newState.ticketQuantity = 0
      newState.displayAddBtn = false

      this.setState({
        displayQuantity: newState.displayQuantity,
        ticketsAvailable: newState.ticketsAvailable,
        ticketQuantity: newState.ticketQuantity,
        displayAddBtn: newState.displayAddBtn,
      })
      return
    }

    if (parseInt(newState.ticketQuantity)) {
      this.clearTicketsInCart(oldPickup, newState.ticketQuantity)
      newState.ticketQuantity = 0
      newState.displayQuantity = false
      newState.displayAddBtn = false
      this.setState({
        ticketQuantity: newState.ticketQuantity,
        displayQuantity: newState.displayQuantity,
        displayAddBtn: newState.displayAddBtn
      })
    }
    else if (parseInt(event.target.value) !== oldPickup) {
      console.log('when does (parseInt(event.target.value) !== newState.pickupPartyId)?')
      newState.ticketQuantity = 0
      newState.displayQuantity = false
      newState.displayAddBtn = false
      this.setState({
        ticketQuantity: newState.ticketQuantity,
        displayQuantity: newState.displayQuantity,
        displayAddBtn: newState.displayAddBtn
      })
    }

    newState.displayQuantity = true

    const statePickupPartyId = parseInt(newState.pickupPartyId)
    const stateEventId = parseInt(newState.displayShow.id)
    const parties = newState.assignedParties
    let matchedParty = await parties.find(party => (parseInt(party.id) === statePickupPartyId) && (parseInt(party.eventId) === stateEventId))
    newState.pickupLocationId = matchedParty.pickupLocationId
    if (matchedParty.firstBusLoadTime) {
      newState.firstBusLoad = moment(matchedParty.firstBusLoadTime, 'LT').format('h:mm A')
    }
    newState.lastDepartureTime = moment(matchedParty.lastBusDepartureTime, 'LT').format('h:mm A')

    let numArray = []

    let matchedPartyPrice = matchedParty.partyPrice
    if (matchedParty) {
      const availableTickets = await this.refreshAvailableTickets(matchedParty.id)
      if (availableTickets < 1) newState.ticketsAvailable = []
      else if (availableTickets >= 1) {
        numArray = [...Array(availableTickets).keys()].map(i => i + 1)
        newState.ticketsAvailable = numArray
      }
    }
    else {
      console.error('Error!! No MatchedParty in selectPickupLocationId')
    }
    this.setState({
      ticketsAvailable: newState.ticketsAvailable,
      partyPrice: matchedPartyPrice,
      pickupLocationId: newState.pickupLocationId,
      pickupPartyId: newState.pickupPartyId,
      firstBusLoad: newState.firstBusLoad,
      lastDepartureTime: newState.lastDepartureTime,
      displayQuantity: newState.displayQuantity,
      displayAddBtn: newState.displayAddBtn
    })
  }

  refreshAvailableTickets = async (pickupPartyId) => {
    const matchedParty = await this.refreshPickupParty(pickupPartyId)
    const currentReservations = await fetch(`${fetchUrl}/reservations/findOrders`, {
      method: 'PATCH',
      body: JSON.stringify({
        pickupPartiesId: pickupPartyId,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const reservations = await currentReservations.json()
    const activeReservations = reservations.filter(rezzie=>rezzie.status < 3 )
    const availableTickets = parseInt(matchedParty.capacity) - parseInt(activeReservations.length) - parseInt(matchedParty.inCart)
      return availableTickets
  }

  selectTicketQuantity = (event) => {
    this.ticketTimer(false)
    const newState = { ...this.state }
    let oldQty = 0
    if (parseInt(newState.ticketQuantity) > 0){
      console.log('newState.ticketQuantity', newState.ticketQuantity)
      oldQty = parseInt(newState.ticketQuantity)
    } else { console.log('newState.ticketQuantity else', newState.ticketQuantity)}
    const pickupPartyId = parseInt(newState.pickupPartyId)

    oldQty > 0 && this.clearTicketsInCart(pickupPartyId, oldQty)
    event.target.value && (newState.displayAddBtn = true)

    const subTotal = (Number(newState.partyPrice) * Number(event.target.value)).toFixed(2)
    const total = ((Number(subTotal) * .1) + Number(subTotal)).toFixed(2)
    newState.ticketQuantity = ~~event.target.value
    newState.totalCost = total
    this.setState({
      displayAddBtn: newState.displayAddBtn,
      ticketQuantity: newState.ticketQuantity,
      totalCost: newState.totalCost
    })
    this.addTicketsInCart(pickupPartyId, newState.ticketQuantity)
     this.ticketTimer(true, 120000, false) // production
    //this.ticketTimer(true, 30000, false) // testing
    window.addEventListener("beforeunload", this.clearCartOnClose)
  }

  updateDiscountCode = event => {
    const newState = { ...this.State }
    newState.discountCode = event.target.value
    this.setState({ discountCode: newState.discountCode })
  }

  getReservations = async () => {
    const userId = this.state.facebook.userDetails.id
    if (userId) {
      const reservations = await fetch(`${fetchUrl}/orders/${userId}`)
      const userReservations = await reservations.json()
      const newState = { ...this.State }
      newState.userReservations = await userReservations
      await this.setState({ userReservations: newState.userReservations })
    }
  }

  expandReservationDetailsClick = (e) =>{
    const newState = { ...this.state }
    newState.displayUserReservationSummary = true
    newState.reservationDetail = newState.userReservations.find(show => (parseInt(show.eventsId) === parseInt(e.target.id)))
    newState.displayReservationDetail = true

    this.setState({
      displayUserReservationSummary: newState.displayUserReservationSummary,
      reservationDetail: newState.reservationDetail,
      displayReservationDetail: newState.displayReservationDetail
    })
  }

  findDiscountCode = async () => {
    const discountCode = this.state.discountCode
    const ticketQuantity = this.state.ticketQuantity
    const eventId = this.state.displayShow.id
    const totalPrice = this.state.totalCost
    const response = await fetch(`${fetchUrl}/discount_codes`, {
        method: 'PATCH',
        body: JSON.stringify({
          discountCode: discountCode,
          ticketQuantity: ticketQuantity,
          totalPrice: totalPrice,
          eventId: eventId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    const json = await response.json()
    console.log('discount response ===> ', json)
    if(json.length){
      if(json[0].type === 420){
        console.log( 'ok lets party!')
      } else {
        console.log('no response')
        return
      }
      //we have a valid afterDiscountObj, let's apply it!
      const newState = {...this.state}
      newState.totalCost = Number(json[0].totalPriceAfterDiscount).toFixed(2)
      newState.afterDiscountObj = json[0]
      newState.afterDiscountObj.totalPriceAfterDiscount = Number(json[0].totalPriceAfterDiscount.toFixed(2))
      newState.discountApplied = true
      this.setState({
        totalCost: newState.totalCost,
        afterDiscountObj: newState.afterDiscountObj,
        discountApplied: newState.discountApplied
      })
      console.log('this.state.discountApplied =>', this.state.discountApplied)
    }

  }

  // Header Functions
  userDashboard = () => {
    const newState = { ...this.state }
    newState.displayReservations = !this.state.displayReservations
    this.setState({ displayReservations: newState.displayReservations })
  }

  returnHome = () => {
    const newState = { ...this.state }
    newState.displayReservations = false
    this.setState({ displayReservations: newState.displayReservations })
  }

  searchShows = event => {
    const newState = { ...this.state }
    newState.filterString = event.target.value
    this.setState({ filterString: newState.filterString })
  }

  toggleReservationView = (e) => {
    const newState = { ...this.state }
    this.getReservations()
    newState.displayFuture = true
    newState.displayPast = false
    newState.displayUserReservationSummary = true
    if(!newState.reservationDetail){
      newState.displayReservations = !newState.displayReservations
    }
    if(e.target.id==='dashboard' || e.target.id==='summary'){
      newState.displayReservationDetail = false
      newState.reservationDetail = null
      newState.displayUserReservationSummary = false
    }
    if(e.target.id === 'detail' || e.target.id === 'edit'){
      newState.displayReservations = true
      newState.displayEditReservation = false
      newState.displayReservationDetail = true
      newState.displayUserReservationSummary = false
    }
    this.setState({
      displayReservations: newState.displayReservations,
      reservationDetail: newState.reservationDetail,
      displayUserReservationSummary: newState.displayUserReservationSummary,
      displayReservationDetail: newState.displayReservationDetail,
      displayFuture: newState.displayFuture,
      displayPast:newState.displayPast,
      displayEditReservation: newState.displayEditReservation
    })
  }



  toggleFuturePast = (e) => {
    const newState = { ...this.state }
    if(e.target.id==='future'){
      newState.displayPast = false
      newState.displayFuture = true
    } else if(e.target.id==='past'){
      newState.displayPast = true
      newState.displayFuture = false
    }
      this.setState({
        displayPast: newState.displayPast,
        displayFuture: newState.displayFuture
      } )
  }

  toggleEditReservation = (e) =>{
    const newState = { ...this.state }
    newState.displayEditReservation = !newState.displayEditReservation
    newState.reservationToEditId = parseInt(e.target.id)
    this.setState({
      displayEditReservation: newState.displayEditReservation,
      reservationToEditId: newState.reservationToEditId
    })
  }

  reservationEditField = (e) => {
      this.setState({
        ...this.state,
          willCallEdits: {
          ...this.state.willCallEdits,
          [e.target.name]: e.target.value,
          id: e.target.id
        }
    })
  }

  submitReservationForm = (e) => {
    e.preventDefault()
    let newRETS = [ ...this.state.reservationEditsToSend ]
    let newDisplayEditSuccess = this.state.displayEditSuccess
    newDisplayEditSuccess = !newDisplayEditSuccess
    newRETS.push(this.state.willCallEdits)
    this.setState({
      reservationEditsToSend: newRETS,
      displayEditSuccess:newDisplayEditSuccess
    })
    this.handleEditSend(newRETS)
  }

  handleEditSend= async(newRETS)=>{
    newRETS.map(async(reservation)=>{
      const editReservationResponse = await fetch(`${fetchUrl}/reservations`, {
        method: 'PATCH',
        body: JSON.stringify({
          id: parseInt(reservation.id),
          willCallFirstName: reservation.willCallFirstName,
          willCallLastName: reservation.willCallLastName,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .catch()
      // const json = await editReservationResponse.json()
      const e = {target: {id: "edit"}}
      await this.toggleReservationView(e)
      if(editReservationResponse.status === 200){
      }
    })
}

  toggleEditSuccess=()=>{
    let newStateDisplayEditSuccess = {...this.state.displayEditSuccess}
    newStateDisplayEditSuccess=!newStateDisplayEditSuccess
    this.setState({displayEditSuccess: newStateDisplayEditSuccess})
  }

  toggleLoggedIn = (boolean) => {
    console.log('toggleLoggedIn clicked ---' , boolean);
    if (boolean === false){
      this.setState({
        ...this.state,
        facebook: {
          isLoggedIn: false,
          userID: '',
          name: '',
          email:'',
          picture:'',
          userDetails: {
            isAdmin: false,
            isStaff: false,
            isDriver: false,
          },
        }
      })
      localStorage.setItem('jwt', '')
    } else {
      this.setState({
        ...this.state,
          facebook: {
          ...this.state.facebook,
          isLoggedIn: boolean,
        }
      })
    }
  }

  profileClick = () => {
    const newState = { ...this.state }
    newState.displayLoginView = !newState.displayLoginView

    if (newState.adminView) {
      newState.adminView = !newState.adminView
      this.setState({
        adminView: newState.adminView
      })
    }
    else {
      this.setState({
        displayLoginView: newState.displayLoginView
      })
    }
  }

  continueAsGuest = () => {
    this.setState({
      ...this.state,
        facebook: {
          isLoggedIn: false,
          userID: '',
          name: '',
          email:'',
          picture:'',
          userDetails: {},
        }
    })
  }

  responseLogin = async (response) => {
    console.log('responseLogin response ====== ', response)
    const {email, password} = response
    const hashedPassword = sha256(password);
    
    const usersInfo = await fetch(`${fetchUrl}/users/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        password: hashedPassword
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const userObj = await usersInfo.json()
    console.log('login response from API === ', userObj)

    // email: "dustin@undefinedindustries.com"
    // id: 844
    // isAdmin: true
    // token: "eyJhb"
    if (userObj && userObj.token) {
      localStorage.setItem('jwt', userObj.token)          
      this.setState({
        ...this.state,
          facebook: {
            ...this.state.facebook,
            isLoggedIn: true,
            userID: userObj.id,
            email:userObj.email,
            userDetails: {
              isAdmin: userObj.isAdmin,
              isStaff: userObj.isStaff
            },
            userDetails:userObj
  
          }
      })
      this.toggleLoggedIn(true)
      this.onLoad()
    }

  }

  requestRegistration = async (request) => {
    console.log('request details ---- >>>> ', request)
    const password = sha256(request.password)
    const usersInfo = await fetch(`${fetchUrl}/users`, {
      method: 'POST',
      body: JSON.stringify({
          firstName: request.firstName,
          lastName: request.lastName,
          email: request.email,
          hshPwd: password
      }),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    const userObj = await usersInfo.json()
    console.log('registration response ====== >> >>> ', userObj)
    const newState = {... this.state}
    newState.registerResponse = userObj
    this.setState({registerResponse: newState.registerResponse})

    //{message: 'account already exists', code: '202', email: 'dustin@undefinedindustries.com'}

  }


  responseFacebook = async (response) => {
    console.log('facebook response ====> ', response)
    this.setState({
      ...this.state,
        facebook: {
          ...this.state.facebook,
          userID: response.id,
          name: response.name,
          email:response.email,
          picture:response.picture.data.url
        }
    })
    this.toggleLoggedIn(true)
    this.onLoad()
    const usersInfo = await fetch(`${fetchUrl}/users`, {
      method: 'POST',
      body: JSON.stringify({
          firstName: response.name.split(" ")[0],
          lastName: response.name.split(" ")[1],
          email: response.email,
      }),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    const userObj = await usersInfo.json()
    const newState = { ...this.State }
    newState.userDetails = userObj
    this.setState({
      ...this.state,
      facebook: {
        ...this.state.facebook,
        userDetails: newState.userDetails
      }
    })
  }

  responseGoogle = response => {
    const newState = { ...this.state }
    newState.googleResponse = response.profileObj
    newState.displayLoginView = false
    this.setState({ googleResponse: newState.googleResponse, displayLoginView: newState.displayLoginView })
  }

  responseSpotify = response => {
    const newState = { ...this.state }
    newState.spotifyResponse = response
    newState.displayLoginView = false
    this.setState({ googleResponse: newState.googleResponse, displayLoginView: newState.displayLoginView })
  }

  logout = () => {
    this.toggleLoggedIn(false);
    this.profileClick()
  }

  toggleRegister = () => {
    console.log('toggleRegister hit & showRegisterForm ====> ', this.state.showRegisterForm)
    const newState = { ...this.state }
    newState.showRegisterForm = !newState.showRegisterForm;
    this.setState({showRegisterForm: newState.showRegisterForm})
    console.log('toggleRegister hit & showRegisterForm AFTER ====> ', this.state.showRegisterForm)

  }

  toggleForgot = () => {
    const showForgotForm = !this.state.showForgotForm
    this.setState({showForgotForm: showForgotForm})
  }

  // Tab Functions
  tabClicked = event => {
    const newState = { ...this.state }
    if (event.target.id === 'cart-tab' && newState.inCart.length > 0) {
      newState.displayCart = true
    }
    if (event.target.innerHTML === 'Details' && newState.inCart.length === 0) {
      newState.displayCart = false
    }
    if (!newState.inCart.length > 0 && event.target.id === 'showDetails-tab') {
      newState.displayCart = false
    }
    if (newState.inCart.length > 0 && event.target.id === 'showDetails-tab') {
      newState.displayWarning = true
    }

    newState.displaySuccess = false
    this.setState({
      displaySuccess: newState.displaySuccess,
      displayCart: newState.displayCart,
      displayWarning: newState.displayWarning
    })
  }

  backToCalendar = event => {
    const newState = { ...this.state }
    if (parseInt(newState.ticketQuantity)) {
      let oldPickup = parseInt(newState.pickupPartyId)
      this.clearTicketsInCart(oldPickup, newState.ticketQuantity)
      newState.ticketQuantity = null
      newState.displayQuantity = false
      newState.displayAddBtn = false
      this.ticketTimer(false)
      this.setState({
        ticketQuantity: newState.ticketQuantity,
        displayQuantity: newState.displayQuantity,
        displayAddBtn: newState.displayAddBtn
      })
    }
    newState.displayExternalShowDetails = false
    newState.displayDetailCartView = false
    newState.displayShow = null
    newState.displaySuccess = false
    newState.displayShowList = true
    newState.displayShowDetails = false
    newState.displayCart = false
    this.setState({
      displayExternalShowDetails: newState.displayExternalShowDetails,
      displayDetailCartView: newState.displayDetailCartView,
      displayShow: newState.displayShow,
      displaySuccess: newState.displaySuccess,
      displayShowList: newState.displayShowList,
      displayShowDetails: newState.displayShowDetails,
      displayCart: newState.displayCart
    })
  }
  // Show Functions
  showsExpandClick = async (event) => {
    const newState = { ...this.state }
    //immediately clear previously selected pickupPartyId from State.
    newState.pickupPartyId = null
    this.setState({
      pickupPartyId: newState.pickupPartyId
    })
    const clickedShow = newState.userShows.find(show => (parseInt(show.id) === parseInt(event.target.id)))
    if(clickedShow.external){
      newState.displayShowDetails = false
      newState.displayExternalShowDetails = true
      newState.displayShowList = false
      newState.displayShow = clickedShow
      this.setState({
        displayShowDetails: newState.displayShowDetails,
        displayExternalShowDetails: newState.displayExternalShowDetails,
        displayShow: newState.displayShow,
        displayShowList: newState.displayShowList
      })


    } else {
      const assignedPickupParties = await this.getPickupParties(clickedShow.id)
      const currentPickups = assignedPickupParties.map(party => party.pickupLocationId)
      const pickupLocations = newState.pickupLocations.filter(loc => currentPickups.includes(loc.id))

      await assignedPickupParties.map(party => pickupLocations.map(location => {
        if (location.id === party.pickupLocationId) {
          party.LocationName = location.locationName
        }
      }))
      //set initial state of show details view
      newState.displayQuantity = false
      newState.displayDetailCartView = true
      newState.displaySuccess = false
      newState.displayShowDetails = true
      newState.displayExternalShowDetails = false
      newState.displayShow = clickedShow
      newState.assignedParties = assignedPickupParties
      newState.displayShowList = false
      this.setState({
        displayQuantity: newState.displayQuantity,
        displayExternalShowDetails: newState.displayExternalShowDetails,
        displayDetailCartView: newState.displayDetailCartView,
        displaySuccess: newState.displaySuccess,
        displayShow: newState.displayShow,
        assignedParties: newState.assignedParties,
        displayShowList: newState.displayShowList
      })
      if (document.querySelector('#departureOption')) {
        document.querySelector('#departureOption').value = "Select a Departure Option..."
      }
    }
  }

  returnToShows = () => {
    const newState = { ...this.state }
    newState.displayShow = null
    newState.displaySuccess = false
    newState.displayShowList = true
    newState.displayShowDetails = false
    newState.displayCart = false
    this.setState({
      displayShow: newState.displayShow,
      displaySuccess: newState.displaySuccess,
      displayShowList: newState.displayShowList,
      displayShowDetails: newState.displayShowDetails,
      displayCart: newState.displayCart
    })
  }

  handleWarning = () => {
    const newState = { ...this.state }
    newState.displayWarning = true
    this.setState({ displayWarning: newState.displayWarning })
  }

  addToCart = async () => {
    this.ticketTimer(false)
    const newState = { ...this.state }
    const pickupLocation = newState.pickupLocations.filter(location => parseInt(location.id) === parseInt(this.state.pickupLocationId))[0]
    const basePrice = Number(pickupLocation.basePrice)
    const ticketQuantity = parseInt(this.state.ticketQuantity)
    const totalSavings = parseInt(this.state.afterDiscountObj.totalSavings)
    const processingFee = Number((basePrice * ticketQuantity) * (0.1))
    //const cost = ((this.state.totalCost * ticketQuantity) - totalSavings + processingFee)
    const cost = this.state.totalCost
    const sPickupId = parseInt(this.state.pickupLocationId)
    const sEventId = parseInt(this.state.displayShow.id)
    const pickupParty = this.state.assignedParties.find(party => party.pickupLocationId === sPickupId && party.eventId === sEventId)
    const firstBusLoad = pickupParty.firstBusLoadTime
    const lastDepartureTime = moment(pickupParty.lastBusDepartureTime, 'hhmm').format('h:mm')

    newState.purchaseSuccessful = false
    //newState.totalCost =
    newState.cartToSend.eventId = null
    newState.cartToSend.pickupLocationId = null
    newState.cartToSend.firstName = ''
    newState.cartToSend.lastName = ''
    newState.cartToSend.email = ''
    newState.cartToSend.willCallFirstName = ''
    newState.cartToSend.willCallLastName = ''
    newState.cartToSend.ticketQuantity = 0
    newState.cartToSend.totalCost = 0
    newState.cartToSend.discountCode = null
    newState.cartToSend.userId = newState.facebook.userDetails.id
    newState.validatedElements = {
      firstName: null,
      lastName: null,
      email: null,
      orderedByPhone: null,
      wcFirstName: null,
      wcLastName: null
    }

    this.setState({
      purchaseSuccessful: newState.purchaseSuccessful,
      cartToSend: newState.cartToSend,
      validatedElements: newState.validatedElements
    })

    this.setState({ lastDepartureTime, firstBusLoad })

    if (newState.inCart.length === 0) {
      newState.inCart.push(newState.displayShow)
      newState.displaySuccess = true
      newState.displayCart = true
      newState.displayShowDetails = false
      newState.displayShowList = false
    }
    else {
      newState.displayWarning = true
    }
    newState.startTimer = true
    this.setState(newState)
     this.ticketTimer(true, 360000, true) // production
    //this.ticketTimer(true, 30000, true) // testing
  }

// functions to handle setting and clearing of timer and incart qtys
  ticketTimer = (timerOn, time, addedToCart) => {
    let newState = {...this.state}
    const pickupPartyId = parseInt(newState.pickupPartyId)
    let event = { target: { value: pickupPartyId } }
    if (timerOn) {
      console.log('ticketTimer a', timerOn, time, addedToCart )
      const newTicketTimer = addedToCart ?
          setTimeout(() => {
            console.log('ticketTimer b', timerOn, time, addedToCart )
            this.confirmedRemove()
          }, time)
        :
          setTimeout(() => {
            //this.confirmedRemove();
            console.log('ticketTimer c', timerOn, time, addedToCart )
            this.selectPickupLocationId(event, true)
          }, time)

      newState.ticketTimer = newTicketTimer
      this.setState({ ticketTimer: newState.ticketTimer })
    }
    else {
      console.log('ticketTimer d', timerOn, time, addedToCart )
      clearTimeout(this.state.ticketTimer)
      newState.ticketTimer = null
      this.setState({ ticketTimer: newState.ticketTimer })
    }
  }

  addTicketsInCart = async (pickupPartyId, ticketQty) => {
    console.log('addTicketsInCart fired')
    if (pickupPartyId && ticketQty){
      let timeStamp = new Date()
      console.log('timeStamp', timeStamp)
      await fetch(`${fetchUrl}/pickup_parties/${pickupPartyId}/cartQty`, {
        method: 'PATCH',
        body: JSON.stringify({
          inCart: ticketQty,
          updated_at: timeStamp
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }

  clearTicketsInCart = async (pickupPartyId, ticketQty) => {
    //let newState = {...this.state}
    if (pickupPartyId && ticketQty){
      console.log('clearing ticketQty', ticketQty)
      let timeStamp = new Date()
      await fetch(`${fetchUrl}/pickup_parties/${pickupPartyId}/cartQty`, {
        method: 'PATCH',
        body: JSON.stringify({
          inCart: parseInt(ticketQty) * -1,
          updated_at: timeStamp
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    // newState.ticketQuantity = 0
    // this.ticketTimer(false)
    // this.setState({ticketQuantity: newState.ticketQuantity})
    return
  }

  clearCartOnClose = (ev) => {
    const pickupPartyId = parseInt(this.state.pickupPartyId)
    const ticketQty = parseInt(this.state.ticketQuantity)
    ev.preventDefault();
    this.clearTicketsInCart(pickupPartyId, ticketQty)
    return ev.returnValue = 'Leaving the page will clear your cart, continue?';
  }

  viewCart = () => {
    const newState = { ...this.state }
    newState.displayCart = true
    this.setState({ displayCart: newState.displayCart })
  }

  // Cart Functions
  handleCheck = () => {
    const newState = { ...this.state }
    newState.checked = true
    this.setState({ checked: newState.checked })
  }

  purchase = async (err) => {
    console.log('purchase fired!')
    this.ticketTimer(false)
    if (err) {
      console.log('purchase error', err)
      await this.ticketTimer(false)
       await this.ticketTimer(true, 360000, true) // production
       //await this.ticketTimer(true, 30000, true) //testing
      return this.setState({purchaseFailed: true})
    }
    const cartObj = this.state.cartToSend
    cartObj.discountCode = this.state.afterDiscountObj.id
    cartObj.userId = this.state.facebook.userDetails.id
    const response = await fetch(`${fetchUrl}/orders`, {
      method: 'POST',
      body: JSON.stringify(cartObj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    await this.clearTicketsInCart(json.pickupPartiesId, cartObj.ticketQuantity)
    this.setState({ purchaseSuccessful: true, purchasePending: false, inCart: [], ticketQuantity: null, discountApplied: false, afterDiscountObj: {discountCodeId: null, totalSavings: 0} })
    window.removeEventListener("beforeunload", this.clearCartOnClose)
  }

  comp = async (details) => {
    this.ticketTimer(false)
    const cartObj = this.state.cartToSend
    cartObj.userId = this.state.facebook.userDetails.id
    cartObj.discountCode = this.state.afterDiscountObj.id
    const response = await fetch(`${fetchUrl}/orders`, {
      method: 'POST',
      body: JSON.stringify(cartObj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    await this.clearTicketsInCart(json.pickupPartiesId, cartObj.ticketQuantity)
    this.setState({ purchaseSuccessful: true, purchaseFailed: false, purchasePending: false, displayQuantity: false, inCart: [], ticketQuantity: null, discountApplied: false, afterDiscountObj: {discountCodeId: null, totalSavings: 0} })
    window.removeEventListener("beforeunload", this.clearCartOnClose)
  }

  updatePurchaseField = event => {
    const newState = { ...this.state }
    const updateField = event.target.id
    const value = event.target.value
    const newValidElems = newState.validatedElements
    const invalidFields = newState.invalidFields
    let discountCode = ''

    const phoneNumber = (inputtxt) => {
      var phoneno = /^\(?[(]([0-9]{3})\)?[) ]([0-9]{3})[-]([0-9]{4})$/
      if(inputtxt.match(phoneno)) return true
      else if (inputtxt.length > 12 || inputtxt.length < 12 ) return false
      else return false
    }

    switch (updateField){
      case 'email':
        if (Validator.isEmail(value) && !Validator.isEmpty(value)) {
          newValidElems.email = value
          invalidFields.invalidEmail = false
        } else {
          newValidElems.email = null
        }
        break;
      case 'firstName':
        if (Validator.isAlpha(value) && !Validator.isEmpty(value)) {
          newValidElems.firstName = value
          invalidFields.invalidFirstName = false
        } else {
          newValidElems.firstName = null
        }break;
      case 'lastName':
        if (Validator.isAlpha(value) && !Validator.isEmpty(value)) {
          newValidElems.lastName = value
          invalidFields.invalidLastName = false
        } else {
          newValidElems.lastName = null
        }
        break;
      case 'willCallFirstName':
        if (Validator.isAlpha(value)) {
          newValidElems.wcFirstName = value
        } else {
          newValidElems.wcFirstName = null
        }
        break;
      case 'willCallLastName':
        if (Validator.isAlpha(value)) {
          newValidElems.wcLastName = value
        } else {
          newValidElems.wcLastName = null
        }
        break;
      case 'orderedByPhone':
        if (phoneNumber(value) && !Validator.isEmpty(value)) {
          newValidElems.orderedByPhone = value
          invalidFields.invalidPhone = false
        } else {
          newValidElems.orderedByPhone = null
        }
        break;
      case 'discountCode':
        discountCode = value
        break;
      default:
        return 'Please input valid items';
    }

    // // Populates cartToSend
    if (newValidElems.firstName
    && newValidElems.lastName
    && newValidElems.email
    && newValidElems.orderedByPhone) {
      newState.validated = true
      newState.cartToSend = {
        firstName: newValidElems.firstName,
        lastName: newValidElems.lastName,
        email: newValidElems.email,
        orderedByPhone: newValidElems.orderedByPhone,
        eventId: this.state.inCart[0].id,
        ticketQuantity: parseInt(this.state.ticketQuantity),
        pickupLocationId: parseInt(this.state.pickupLocationId),
        totalCost: Number(this.state.totalCost),
        discountCode,
        userId: newState.facebook.userDetails.userId,
        willCallFirstName: (newValidElems.wcFirstName || newValidElems.firstName),
        willCallLastName: (newValidElems.wcLastName || newValidElems.lastName)
      }
      this.setState({
        invalidFields,
        validatedElements: newValidElems,
        cartToSend: newState.cartToSend,
        validated: newState.validated
      })
    }
    else if (!newValidElems.firstName ||
            !newValidElems.lastName ||
            !newValidElems.email ||
            !newValidElems.orderedByPhone) {
        newState.validated = false
        this.setState({
          validated : newState.validated,
          validatedElements: newValidElems
        })
      }
  }

  invalidOnSubmit = (e) => {
    let validElems = {...this.state.validatedElements}
    let invalidFields = {...this.state.invalidFields}

    invalidFields.invalidFirstName = validElems.firstName ? false : true
    invalidFields.invalidLastName = validElems.lastName ? false : true
    invalidFields.invalidEmail = validElems.email ? false : true
    invalidFields.invalidPhone = validElems.orderedByPhone ? false : true

    this.setState({ invalidFields })
  }

  removeFromCart = () => {
    const newState = { ...this.state }
    newState.purchaseSuccessful = false
    newState.displayWarning = false
    newState.displayConfirmRemove = true

    this.setState({
      displayConfirmRemove: newState.displayConfirmRemove,
      displayWarning: newState.displayWarning,
      purchaseSuccessful: newState.purchaseSuccessful,
    })
    window.removeEventListener("beforeunload", this.clearCartOnClose)
  }

  confirmedRemove = () => {
    const newState = { ...this.state }

    const pickupPartyId = parseInt(newState.pickupPartyId)
    const ticketQty = parseInt(newState.ticketQuantity)
    this.clearTicketsInCart(pickupPartyId, ticketQty)
    this.ticketTimer(false)

    newState.inCart = []
    newState.displaySuccess = false
    newState.displayConfirmRemove = false
    newState.displayWarning = false
    newState.displayQuantity = false
    newState.displayAddBtn = false
    newState.startTimer = false
    newState.ticketQuantity = 0
    newState.pickupLocationId = null
    newState.validated = false
    newState.purchasePending = false

    this.setState({
      validated: newState.validated,
      inCart: newState.inCart,
      displaySuccess: newState.displaySuccess,
      displayConfirmRemove: newState.displayConfirmRemove,
      displayWarning: newState.displayWarning,
      displayQuantity: newState.displayQuantity,
      displayAddBtn: newState.displayAddBtn,
      startTimer: newState.startTimer,
      ticketQuantity: newState.ticketQuantity,
      purchasePending: newState.purchasePending

    })
    window.removeEventListener("beforeunload", this.clearCartOnClose)

  }

  closeAlert = () => {
    const newState = { ...this.state }
    newState.displayConfirmRemove = false
    newState.displayWarning = false
    this.setState({ displayConfirmRemove: newState.displayConfirmRemove, displayWarning: newState.displayWarning })
  }

  sortByArtist = () => {
    let newState = this.state.userShows.sort((show1, show2) => {
      let a = show1.headliner.toLowerCase().split(" ").join("")
      let b = show2.headliner.toLowerCase().split(" ").join("")
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    })
    this.setState({ shows: newState, artistIcon: true, dateIcon: false })
  }

  sortByDate = () => {
    let newState = this.state.userShows.sort((show1, show2) => {
      let a = new Date(show1.date)
      let b = new Date(show2.date)
      return a - b
    })
    this.setState({ shows: newState, artistIcon: false, dateIcon: true })
  }

  makePurchase = event => {
    event.preventDefault()
    const newState = { ...this.state }

    newState.displayQuantity = false
    newState.displayAddBtn = false
    newState.purchasePending = true
    newState.purchaseFailed = false
    newState.discountApplied = false
    newState.afterDiscountObj= {discountCodeId: null, totalSavings: 0}

    this.setState({
      purchaseFailed: newState.purchaseFailed,
      purchasePending: newState.purchasePending,
      displayQuantity: newState.displayQuantity,
      displayAddBtn: newState.displayAddBtn,
      discountApplied: newState.discountApplied,
      afterDiscountObj: newState.afterDiscountObj
    })
  }

  dismissBios = () => {
    this.setState({ showBios: false })
  }

  readBios = () => {
    this.setState({ displayBios: true })
  }

  hideAboutus = () => {
    this.setState({ displayAboutus: false })
  }

  showAboutus = () => {
    this.setState({ displayAboutus: true })
  }

  getEventbriteData = async (continuationString, val, previousFuelDataArr) => {
    // const response = await fetch(`https://www.eventbriteapi.com/v3/users/me/owned_events/?token=ZMYGPTW7S63LDOZCWVUM&order_by=start_desc&page=${val}&expand=ticket_classes${continuationString}`)
    const response = await fetch(`https://www.eventbriteapi.com/v3/users/me/owned_events/?${continuationString}token=ZMYGPTW7S63LDOZCWVUM&order_by=start_desc&expand=ticket_classes`)

    const fuelData = await response.json()
    const continuation = await fuelData.pagination.continuation
    const fuelDataArr = await fuelData.events
    const newFuelDataArr = await previousFuelDataArr.concat(fuelDataArr).flat()
    continuationString = await `continuation=${continuation}&`

    if(fuelData.pagination.has_more_items && val <5 ){
      return await this.getEventbriteData(continuationString, val+=1, newFuelDataArr)
    } else {
      return newFuelDataArr
    }
  }

  toggleAdminView = () => {
    let adminView = this.state.adminView
    adminView = !adminView
    this.setState({ adminView })
  }

  getHeadliners = async () => {
    await this.getEventbriteData('', 1, [])
    .then((eventsArr)=> {
    let newEventsArr = []
    for(let ii = 0; ii < eventsArr.length; ii++){
      newEventsArr[ii] = {}
      let ticketClasses = []
      ticketClasses = eventsArr[ii].ticket_classes

        let eventTotal = 0
        let departures = {}
        if (ticketClasses){
          for(let jj = 0; jj < ticketClasses.length; jj++){
            eventTotal += ticketClasses[jj].quantity_sold
            departures[ticketClasses[jj].name] = ticketClasses[jj].quantity_sold
          }
        }
      newEventsArr[ii].headliner = eventsArr[ii].name.text.substring((0), eventsArr[ii].name.text.indexOf("*")-1)
      newEventsArr[ii].date = eventsArr[ii].start.local.substring(0, 10)
      newEventsArr[ii].venue =  eventsArr[ii].name.text.substring((eventsArr[ii].name.text.lastIndexOf("*")+5), eventsArr[ii].name.text.lastIndexOf("(")-1)
      newEventsArr[ii].totalSales = eventTotal
      newEventsArr[ii].departures = departures
    }
    const newState = { ...this.state }
    newState.oldStuff = newEventsArr
    this.setState({oldStuff: newState.oldStuff})
    return newEventsArr
  })
  }

  postOldData = async () => {
    const newEventsArr = this.state.oldStuff
  }

  toggleAdminView = () => {
    let adminView = this.state.adminView
    adminView = !adminView
    this.setState({ adminView })
  }
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <div>
            {this.state.displayLoadingScreen && !this.state.facebook.isLoggedIn ?
              <Loading
                onLoad={this.onLoad}
                handleBus={this.handleBus} />
                :
              <div>
              <Header
                getReservations={this.getReservations}
                googleResponse={this.state.googleResponse}
                facebook={this.state.facebook}
                profileClick={this.profileClick}
                logout={this.logout}
                spotifyResponse={this.state.spotifyResponse}
                userDashboard={this.userDashboard}
                adminView={this.state.adminView}
                />

                {this.state.adminView ?
                  <AdminView
                    pickupLocations={this.state.pickupLocations}
                    searchShows={this.searchShows}
                    shows={this.state.allShows}
                    showsExpandClick={this.showsExpandClick}
                    userDetails={this.state.facebook.userDetails}
                  />
                  :
                  this.state.displayLoginView ?
                  <LoginView
                  displayReservationDetail={this.state.displayReservationDetail}
                  displayReservations={this.state.displayReservations}
                  responseGoogle={this.responseGoogle}
                  responseSpotify={this.responseSpotify}
                  toggleLoggedIn={this.toggleLoggedIn}
                  logout={this.logout}
                  showRegisterForm={this.state.showRegisterForm}
                  toggleRegister={this.toggleRegister}
                  requestRegistration={this.requestRegistration}
                  registerResponse={this.state.registerResponse}
                  showForgotForm={this.state.showForgotForm}
                  toggleForgot={this.toggleForgot}
                  userDetails={this.state.userDetails}
                  profileClick={this.profileClick}
                  toggleReservationView={this.toggleReservationView}
                  userReservations={this.state.userReservations}
                  addBorder={this.addBorder}
                  displayShow={this.state.displayShow}
                  filterString={this.state.filterString}
                  showsExpandClick={this.showsExpandClick}
                  responseFacebook={this.responseFacebook}
                  responseLogin={this.responseLogin}
                  continueAsGuest={this.continueAsGuest}
                  facebook={this.state.facebook}
                  toggleAdminView={this.toggleAdminView}
                  expandReservationDetailsClick={this.expandReservationDetailsClick}
                  reservationDetail={this.state.reservationDetail}
                  toggleFuturePast={this.toggleFuturePast}
                  displayFuture={this.state.displayFuture}
                  displayPast={this.state.displayPast}
                  getEventDetails={this.getEventDetails}
                  displayUserReservationSummary={this.state.displayUserReservationSummary}
                  toggleEditReservation={this.toggleEditReservation}
                  displayEditReservation={this.state.displayEditReservation}
                  reservationEditField={this.reservationEditField}
                  submitReservationForm={this.submitReservationForm}
                  reservationToEditId={this.state.reservationToEditId}
                  displayEditSuccess={this.state.displayEditSuccess}
                  toggleEditSuccess={this.toggleEditSuccess}
                />
                  :
                  this.state.displayAboutus ?
                  <Aboutus
                    dismissBios={this.dismissBios}
                    readBios={this.readBios}
                    displayBios={this.state.displayBios}
                    hideAboutus={this.hideAboutus}
                  />
                  :
                  this.state.userShows ?
                    <React.Fragment>
                      <div className='content-section pt-4'>
                        <div className='col-md-6 float-right'>
                        {this.state.displayShow ? '' :
                          <BannerRotator displayShow={this.state.displayShow} />}
                        {this.state.displayCart || this.state.displayShow || this.state.displayExternalShowDetails ?
                          <div>
                          <DetailCartView
                            addToCart={this.addToCart}
                            afterDiscountObj={this.state.afterDiscountObj}
                            assignedParties={this.state.assignedParties}
                            backToCalendar={this.backToCalendar}
                            cartToSend={this.state.cartToSend}
                            checked={this.state.checked}
                            closeAlert={this.closeAlert}
                            comp={this.comp}
                            confirmedRemove={this.confirmedRemove}
                            discountApplied={this.state.discountApplied}
                            displayAddBtn={this.state.displayAddBtn}
                            displayBorder={this.state.displayBorder}
                            displayCart={this.state.displayCart}
                            displayConfirmRemove={this.state.displayConfirmRemove}
                            displayExternalShowDetails={this.state.displayExternalShowDetails}
                            displayQuantity={this.state.displayQuantity}
                            displayShow={this.state.displayShow}
                            displaySuccess={this.state.displaySuccess}
                            displayViewCartBtn={this.state.displayViewCartBtn}
                            displayWarning={this.state.displayWarning}
                            filterString={this.state.filterString}
                            findDiscountCode={this.findDiscountCode}
                            firstBusLoad={this.state.firstBusLoad}
                            getPickupParty={this.getPickupParty}
                            handleCheck={this.handleCheck}
                            invalidFields={this.state.invalidFields}
                            invalidOnSubmit={this.invalidOnSubmit}
                            inCart={this.state.inCart}
                            lastDepartureTime={this.state.lastDepartureTime}
                            makePurchase={this.makePurchase}
                            pickupLocations={this.state.pickupLocations}
                            pickupLocationId={this.state.pickupLocationId}
                            pickupPartyId={this.state.pickupPartyId}
                            pickupParties={this.state.pickupParties}
                            purchase={this.purchase}
                            purchaseClick={this.purchaseClick}
                            purchaseFailed={this.state.purchaseFailed}
                            purchasePending={this.state.purchasePending}
                            purchaseSuccessful={this.state.purchaseSuccessful}
                            removeFromCart={this.removeFromCart}
                            returnToShows={this.returnToShows}
                            selectPickupLocationId={this.selectPickupLocationId}
                            selectTicketQuantity={this.selectTicketQuantity}
                            shows={this.state.userShows}
                            showsExpandClick={this.showsExpandClick}
                            showsInCart={this.state.inCart}
                            startTimer={this.state.startTimer}
                            tabClicked={this.tabClicked}
                            ticketsAvailable={this.state.ticketsAvailable}
                            ticketTimer={this.ticketTimer}
                            ticketQuantity={this.state.ticketQuantity}
                            timeLeftInCart={this.state.timeLeftInCart}
                            totalCost={this.state.totalCost}
                            updateDiscountCode={this.updateDiscountCode}
                            updatePurchaseField={this.updatePurchaseField}
                            validated={this.state.validated}
                            validatedElements={this.state.validatedElements}
                          />
                          </div>
                          :
                          <div>
                            <SponsorBox
                              showAboutus={this.showAboutus}
                              displayAboutus={this.state.displayAboutus}
                            />
                          <NavButtons/>

                          </div>
                            
                            }
                      </div>
                        <MediaQuery maxWidth={799}>
                        <div className='col-md-6 float-left'>
                        {this.state.displayExternalShowDetails || this.state.displayDetailCartView ?
                          ""
                        :
                        <ShowList
                          addBorder={this.addBorder}
                          confirmedRemove={this.confirmedRemove}
                          displayShow={this.state.displayShow}
                          filterString={this.state.filterString}
                          handleWarning={this.handleWarning}
                          inCart={this.state.inCart}
                          searchShows={this.searchShows}
                          shows={this.state.userShows}
                          showsExpandClick={this.showsExpandClick}
                          sortByArtist={this.sortByArtist}
                          sortByDate={this.sortByDate}
                          sortedByArtist={this.state.artistIcon}
                          sortedByDate={this.state.dateIcon}
                          tabClicked={this.tabClicked}
                          ticketsAvailable={this.state.ticketsAvailable} />
                      }
                        </div>
                      </MediaQuery>
                      <MediaQuery minWidth={800}>
                        <ShowList
                          addBorder={this.addBorder}
                          confirmedRemove={this.confirmedRemove}
                          displayShow={this.state.displayShow}
                          filterString={this.state.filterString}
                          handleWarning={this.handleWarning}
                          inCart={this.state.inCart}
                          searchShows={this.searchShows}
                          shows={this.state.userShows}
                          showsExpandClick={this.showsExpandClick}
                          sortByArtist={this.sortByArtist}
                          sortByDate={this.sortByDate}
                          sortedByArtist={this.state.artistIcon}
                          sortedByDate={this.state.dateIcon}
                          tabClicked={this.tabClicked}
                          ticketsAvailable={this.state.ticketsAvailable} />
                      </MediaQuery>

                    </div>
                  </React.Fragment>
                  :
                <Loading
                  responseFacebook={this.responseFacebook}
                />
              }
            </div>
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default LayoutPage;
