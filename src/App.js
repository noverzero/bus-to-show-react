import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ReactGA from 'react-ga';
import { sha256 } from 'js-sha256';

// Pages
import ShopPage from './Pages/ShopPage';
import LayoutPage from './Pages/LayoutPage';
import VerifyPage from './Pages/VerifyPage';
import ResetPage from './Pages/ResetPage';
import {ProductDetail} from './Components/Products/Product'

// Components
import Header from './Components/Header';
import LoginView from './Components/LoginView/LoginView';
import { useStore } from './Store';

ReactGA.initialize('UA-17782248-2');
ReactGA.pageview('/app');

const fetchUrl = `${process.env.REACT_APP_API_URL}`;
const verifyEmailUrl = `${fetchUrl}/users/confirm-email`;

const App = (props) => {
  const {btsUser, setBtsUser, displayLoadingScreen, setDisplayLoadingScreen, headerHidden, setHideHeader} = useStore();

  const [adminView, setAdminView] = useState(false);

  const [assignedParties, setAssignedParties] = useState([]);
  const [displayDetailCartView, setDisplayDetailCartView] = useState(false);
  const [displayEditReservation, setDisplayEditReservation] = useState(false);
  const [displayEditSuccess, setDisplayEditSuccess] = useState(false);
  const [displayExternalShowDetails, setDisplayExternalShowDetails] = useState(false);
  const [displayFuture, setDisplayFuture] = useState(false);
  const [displayLoginView, setDisplayLoginView] = useState(false);
  const [displayPast, setDisplayPast] = useState(false);
  const [displayQuantity, setDisplayQuantity] = useState(false);
  const [displayReservationDetail, setDisplayReservationDetail] = useState(false);
  const [displayReservations, setDisplayReservations] = useState(false);
  const [displayShow, setDisplayShow] = useState(null);
  const [displayShowDetails, setDisplayShowDetails] = useState(null);
  const [displayShowList, setDisplayShowList] = useState(null);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [displayUserReservationSummary, setDisplayUserReservationSummary] = useState(false);
  const [filterString, setFilterString] = useState('')
  

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const [isCalled, setIsCalled] = useState(false);
  const [registerResponse, setRegisterResponse] = useState({});
  const [reservationDetail, setReservationDetail] = useState(null);
  const [reservationEditsToSend, setReservationEditsToSend] = useState([]);
  const [reservationToEditId, setReservationToEditId] = useState(null);
  const [pickupPartyId, setPickupPartyId] = useState(null);
  const [pickupLocations, setPickupLocations] = useState([]);
  const [userReservations, setUserReservations] = useState([]);
  const [userShows, setUserShows] = useState([]);
  const [willCallEdits, setWillCallEdits] = useState({})

  const continueAsGuest = () => {
    setBtsUser(
        {
          isLoggedIn: false,
          userID: '',
          name: '',
          email:'',
          picture:'',
          userDetails: {},
        }
    )
  }

  const expandReservationDetailsClick = (e) =>{
    setDisplayUserReservationSummary(true);
    setReservationDetail(userReservations.find(show => (parseInt(show.eventsId) === parseInt(e.target.id))))
    setDisplayReservationDetail(true)
  }

  const getPickupParties = async (eventId) => {
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

  const getReservations = async () => {
    const userId = btsUser.userDetails.id
    if (userId) {
      const reservations = await fetch(`${fetchUrl}/orders/${userId}`)
      const userReservations = reservations.json()
      setUserReservations(userReservations)
    }
  }

  const handleEditSend= async(newRETS)=>{
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
      toggleReservationView(e)
      if(editReservationResponse.status === 200){
      }
    })
  }

  const logout = () => {
    toggleLoggedIn(false);
    profileClick()
  }

  const onLoad = () => {
    setDisplayLoadingScreen(false);
    setHideHeader(false);
  }

  const profileClick = () => {
    setDisplayLoginView((prevState) => !prevState);

    if (adminView) {
      setAdminView(false);
    }
  };

  
  const requestRegistration = async (request) => {
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
    setRegisterResponse(userObj)
  }
  
  const reservationEditField = (e) => {
    setWillCallEdits({
      ...willCallEdits,
      [e.target.name]: e.target.value,
      id: e.target.id
    })
  }

  const responseLogin = async (loginInfo) => {
    const {email, password} = loginInfo
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
    
    if (userObj && userObj.token) {
      localStorage.setItem('jwt', userObj.token);
      setBtsUser({
        /*
          email: "dustin@undefinedindustries.com",
          id:105,
          isAdmin:true,
          token:"eyJhbGciOiJIUzI,
        */
          isLoggedIn: true,
          userID: userObj.id,
          email:userObj.email,
          userDetails: {
            isAdmin: userObj.isAdmin,
            isStaff: userObj.isStaff || false
          },
          userDetails:userObj
      }); 

      onLoad();
    }

  }

  const showsExpandClick = async (event) => {
    //immediately clear previously selected pickupPartyId from State.
    setPickupPartyId(null);
 
    const clickedShow = userShows.find(show => (parseInt(show.id) === parseInt(event.target.id)))
    if(clickedShow.external){
      setDisplayShowDetails(false);
      setDisplayExternalShowDetails(true);
      setDisplayShowList(false);
      setDisplayShow(clickedShow);
    } else {
      const assignedPickupParties = await getPickupParties(clickedShow.id)
      const currentPickups = assignedPickupParties.map(party => party.pickupLocationId)
      const pickupLocations = pickupLocations.filter(loc => currentPickups.includes(loc.id))

      assignedPickupParties.map(party => pickupLocations.map(location => {
        if (location.id === party.pickupLocationId) {
          party.LocationName = location.locationName
        }
      }))

      //set initial state of show details view
      setDisplayQuantity(false);
      setDisplayDetailCartView(true);
      setDisplaySuccess(false);
      setDisplayShowDetails(true)
      setDisplayExternalShowDetails(false);
      setDisplayShow(clickedShow);
      setAssignedParties(assignedPickupParties);
      setDisplayShowList(false);
      if (document.querySelector('#departureOption')) {
        document.querySelector('#departureOption').value = "Select a Departure Option..."
      }
    }
  }

  const submitReservationForm = (e) => {
    e.preventDefault()
    let newRETS = [ ...reservationEditsToSend ]
    setDisplayEditSuccess(!displayEditSuccess)
    newRETS.push(willCallEdits)
    setReservationEditsToSend(newRETS)
    handleEditSend(newRETS)
  }

  const toggleAdminView = () => {
    setAdminView(!adminView);
  }

  const toggleEditReservation = (e) =>{
    setDisplayEditReservation(!displayEditReservation)
    setReservationToEditId(parseInt(e.target.id))
  }

  const toggleEditSuccess=()=>{
    setDisplayEditSuccess(!displayEditSuccess);
  }
  
  const toggleFuturePast = (e) => {
    if(e.target.id==='future'){
      setDisplayPast(false);
      setDisplayFuture(true);
    } else if(e.target.id==='past'){
      setDisplayPast(true);
      setDisplayFuture(false);
    }
  }

  const toggleLoggedIn = (boolean) => {
    if (boolean === false){
      setBtsUser({
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
        })
        localStorage.setItem('jwt', '')
      }
    }
    
  const toggleRegister = () => {
    setShowRegisterForm(!showRegisterForm);  
  }

  const toggleReservationView = (e) => {
    getReservations();
    setDisplayFuture(true);
    setDisplayPast(false);
    setDisplayUserReservationSummary(true);
    if(!reservationDetail){
      setDisplayReservations(!displayReservations);
    }

    if(e.target.id==='dashboard' || e.target.id==='summary'){
      setDisplayReservationDetail(false);
      setReservationDetail(null);
      setDisplayUserReservationSummary(false);
    }
    if(e.target.id === 'detail' || e.target.id === 'edit'){
      setDisplayReservations(true);
      setDisplayEditReservation(false);
      setDisplayReservationDetail(true);
      setDisplayUserReservationSummary(false);
    }
  }

  const verifyEmail = async (token) => {
    if (isCalled === true) return;
    setIsCalled(true);

    const response = await fetch(`${verifyEmailUrl}/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    const verified = result ? true : false;
    setIsVerified(verified);

  };

  useEffect( () => {
    const checkAuth = async () => {
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
        setBtsUser({
          ...btsUser,
          isLoggedIn: true,
              userID: userObj.id,
              email:userObj.email,
              userDetails: {
                isAdmin: userObj.isAdmin,
                isStaff: userObj.isStaff
              },
              userDetails:userObj
        })
        onLoad()
      } else {
        toggleLoggedIn(false)
        onLoad()
      }
  
    }
    checkAuth()
    const getPickupLocations = async () => {
      const pickups =  await fetch(`${fetchUrl}/pickup_locations`) 
      setPickupLocations(pickups.json())
    } 
    getPickupLocations();
  }, []);

  return (
    <Router>
      <div>
        {!headerHidden ? (
          <Header
            getReservations={getReservations}
            profileClick={profileClick}
            adminView={adminView}
          />
        ) : (
          ''
        )}
        <Routes>
          <Route exact path="/" element={
          <LayoutPage
            btsUser={btsUser}
          />} />
          <Route exact path="/login" element={
            <LoginView
              displayLoadingScreen={displayLoadingScreen}
              displayReservationDetail={displayReservationDetail}
              displayReservations={displayReservations}
              toggleLoggedIn={toggleLoggedIn}
              logout={logout}
              showRegisterForm={showRegisterForm}
              toggleRegister={toggleRegister}
              requestRegistration={requestRegistration}
              registerResponse={registerResponse}
              profileClick={profileClick}
              toggleReservationView={toggleReservationView}
              userReservations={userReservations}
              displayShow={displayShow}
              filterString={filterString}
              showsExpandClick={showsExpandClick}
              responseLogin={responseLogin}
              continueAsGuest={continueAsGuest}
              toggleAdminView={toggleAdminView}
              expandReservationDetailsClick={expandReservationDetailsClick}
              reservationDetail={reservationDetail}
              toggleFuturePast={toggleFuturePast}
              displayFuture={displayFuture}
              displayPast={displayPast}
              displayUserReservationSummary={displayUserReservationSummary}
              toggleEditReservation={toggleEditReservation}
              displayEditReservation={displayEditReservation}
              reservationEditField={reservationEditField}
              submitReservationForm={submitReservationForm}
              reservationToEditId={reservationToEditId}
              displayEditSuccess={displayEditSuccess}
              toggleEditSuccess={toggleEditSuccess}
          />
          } />
          <Route exact path="/shop" element={<ShopPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route
            path="/verify/:token"
            element={(props) => (
              <VerifyPage
                verifyEmail={verifyEmail}
                isVerified={isVerified}
                isCalled={isCalled}
                {...props}
              />
            )}
          />
          <Route
            path="/reset/:token"
            element={(props) => (
              <ResetPage
                verifyEmail={verifyEmail}
                isVerified={isVerified}
                isCalled={isCalled}
                {...props}
              />
            )}
          />
          <Route element={
            <LayoutPage
              displayLoadingScreen={displayLoadingScreen}
              btsUser={btsUser}
           />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
